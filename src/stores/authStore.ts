import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
  CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
  CUSTOMER_CREATE_MUTATION,
  CUSTOMER_QUERY,
  CUSTOMER_RECOVER_MUTATION,
  storefrontApiRequest,
  type ShopifyCustomer,
  type ShopifyUserError,
} from "@/lib/shopify";

interface AuthStore {
  accessToken: string | null;
  expiresAt: string | null;
  customer: ShopifyCustomer | null;
  isLoading: boolean;
  isHydrating: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptsMarketing?: boolean;
  }) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  recoverPassword: (email: string) => Promise<{ ok: boolean; error?: string }>;
  refreshCustomer: () => Promise<void>;
}

function firstError(errors: ShopifyUserError[] | undefined): string | undefined {
  if (!errors || errors.length === 0) return undefined;
  return errors[0].message;
}

function isTokenValid(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() > Date.now() + 60_000; // 1 min buffer
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresAt: null,
      customer: null,
      isLoading: false,
      isHydrating: false,

      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const data = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
            input: { email: email.trim(), password },
          });
          const payload = data?.data?.customerAccessTokenCreate;
          const err = firstError(payload?.customerUserErrors);
          if (err || !payload?.customerAccessToken) {
            return { ok: false, error: err ?? "Could not sign in." };
          }
          set({
            accessToken: payload.customerAccessToken.accessToken,
            expiresAt: payload.customerAccessToken.expiresAt,
          });
          await get().refreshCustomer();
          return { ok: true };
        } catch (e) {
          console.error("signIn", e);
          return { ok: false, error: "Network error. Please try again." };
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async ({ firstName, lastName, email, password, acceptsMarketing }) => {
        set({ isLoading: true });
        try {
          const data = await storefrontApiRequest(CUSTOMER_CREATE_MUTATION, {
            input: {
              firstName,
              lastName,
              email: email.trim(),
              password,
              acceptsMarketing: !!acceptsMarketing,
            },
          });
          const payload = data?.data?.customerCreate;
          const err = firstError(payload?.customerUserErrors);
          if (err) return { ok: false, error: err };
          // Auto sign-in after successful create
          set({ isLoading: false });
          return await get().signIn(email, password);
        } catch (e) {
          console.error("signUp", e);
          set({ isLoading: false });
          return { ok: false, error: "Network error. Please try again." };
        }
      },

      signOut: async () => {
        const { accessToken } = get();
        if (accessToken) {
          try {
            await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION, {
              customerAccessToken: accessToken,
            });
          } catch (e) {
            console.error("signOut", e);
          }
        }
        set({ accessToken: null, expiresAt: null, customer: null });
      },

      recoverPassword: async (email) => {
        try {
          const data = await storefrontApiRequest(CUSTOMER_RECOVER_MUTATION, {
            email: email.trim(),
          });
          const err = firstError(data?.data?.customerRecover?.customerUserErrors);
          if (err) return { ok: false, error: err };
          return { ok: true };
        } catch (e) {
          console.error("recoverPassword", e);
          return { ok: false, error: "Network error. Please try again." };
        }
      },

      refreshCustomer: async () => {
        const { accessToken, expiresAt } = get();
        if (!accessToken) return;
        if (!isTokenValid(expiresAt)) {
          set({ accessToken: null, expiresAt: null, customer: null });
          return;
        }
        set({ isHydrating: true });
        try {
          const data = await storefrontApiRequest(CUSTOMER_QUERY, {
            customerAccessToken: accessToken,
          });
          const customer = data?.data?.customer as ShopifyCustomer | null;
          if (!customer) {
            // Token rejected
            set({ accessToken: null, expiresAt: null, customer: null });
            return;
          }
          set({ customer });
        } catch (e) {
          console.error("refreshCustomer", e);
        } finally {
          set({ isHydrating: false });
        }
      },
    }),
    {
      name: "tintelle-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        expiresAt: state.expiresAt,
        customer: state.customer,
      }),
    },
  ),
);

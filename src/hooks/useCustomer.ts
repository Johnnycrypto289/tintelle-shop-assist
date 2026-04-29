import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

/**
 * Hook to access auth state and refresh the customer once on mount
 * if a token exists. Use in Header, Account, and any auth-aware page.
 */
export function useCustomer() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const customer = useAuthStore((s) => s.customer);
  const isHydrating = useAuthStore((s) => s.isHydrating);
  const refreshCustomer = useAuthStore((s) => s.refreshCustomer);

  useEffect(() => {
    if (accessToken && !customer) {
      refreshCustomer();
    }
  }, [accessToken, customer, refreshCustomer]);

  return {
    isSignedIn: !!accessToken && !!customer,
    customer,
    isHydrating,
  };
}

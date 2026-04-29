// Guest order lookup via Shopify Admin API.
// Looks up an order by name (e.g. "1001" or "#1001") + email,
// returns sanitized status, line items, and tracking info.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SHOP_DOMAIN = "41vquf-k2.myshopify.com";
const ADMIN_API_VERSION = "2025-07";
const ADMIN_URL = `https://${SHOP_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`;

const ORDER_QUERY = `
  query LookupOrder($query: String!) {
    orders(first: 1, query: $query) {
      edges {
        node {
          id
          name
          processedAt
          email
          displayFinancialStatus
          displayFulfillmentStatus
          statusPageUrl
          totalPriceSet { shopMoney { amount currencyCode } }
          shippingAddress {
            firstName lastName address1 address2 city province country zip
          }
          lineItems(first: 25) {
            edges {
              node {
                title
                quantity
                originalUnitPriceSet { shopMoney { amount currencyCode } }
                image { url altText }
              }
            }
          }
          fulfillments(first: 10) {
            id
            status
            createdAt
            updatedAt
            trackingInfo { number url company }
            events(first: 25, sortKey: HAPPENED_AT, reverse: false) {
              edges {
                node { status happenedAt message }
              }
            }
          }
        }
      }
    }
  }
`;

interface LookupBody {
  orderNumber?: string;
  email?: string;
}

const normalizeOrderNumber = (n: string) => n.trim().replace(/^#/, "");
const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ADMIN_TOKEN = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!ADMIN_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration: missing Shopify admin token." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = (await req.json()) as LookupBody;
    const orderNumber = body.orderNumber ? normalizeOrderNumber(body.orderNumber) : "";
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!orderNumber || !email || !isEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Provide a valid order number and email." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (orderNumber.length > 20 || email.length > 254) {
      return new Response(
        JSON.stringify({ error: "Input too long." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Shopify search syntax: name + email
    const searchQuery = `name:${orderNumber} email:${email}`;

    const shopifyRes = await fetch(ADMIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_TOKEN,
      },
      body: JSON.stringify({ query: ORDER_QUERY, variables: { query: searchQuery } }),
    });

    if (!shopifyRes.ok) {
      const text = await shopifyRes.text();
      console.error("Shopify Admin API error", shopifyRes.status, text);
      return new Response(
        JSON.stringify({ error: "Could not reach order system. Try again shortly." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const json = await shopifyRes.json();
    if (json.errors) {
      console.error("Shopify GraphQL errors", json.errors);
      return new Response(
        JSON.stringify({ error: "Order lookup failed." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const node = json.data?.orders?.edges?.[0]?.node;
    if (!node) {
      // Generic message — never confirm whether email exists in our system.
      return new Response(
        JSON.stringify({ error: "We couldn't find an order matching that number and email." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Double-check email matches (defense in depth).
    if ((node.email ?? "").toLowerCase() !== email) {
      return new Response(
        JSON.stringify({ error: "We couldn't find an order matching that number and email." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize: strip the customer email + only return what the page needs.
    const sanitized = {
      name: node.name,
      processedAt: node.processedAt,
      financialStatus: node.displayFinancialStatus,
      fulfillmentStatus: node.displayFulfillmentStatus,
      statusUrl: node.statusPageUrl,
      total: node.totalPriceSet?.shopMoney ?? null,
      shippingAddress: node.shippingAddress
        ? {
            firstName: node.shippingAddress.firstName,
            lastName: node.shippingAddress.lastName,
            address1: node.shippingAddress.address1,
            address2: node.shippingAddress.address2,
            city: node.shippingAddress.city,
            province: node.shippingAddress.province,
            country: node.shippingAddress.country,
            zip: node.shippingAddress.zip,
          }
        : null,
      lineItems: (node.lineItems?.edges ?? []).map((e: any) => ({
        title: e.node.title,
        quantity: e.node.quantity,
        price: e.node.originalUnitPriceSet?.shopMoney ?? null,
        image: e.node.image ?? null,
      })),
      fulfillments: (node.fulfillments ?? []).map((f: any) => ({
        status: f.status,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
        trackingInfo: f.trackingInfo ?? [],
        events: (f.events?.edges ?? []).map((ev: any) => ({
          status: ev.node.status,
          happenedAt: ev.node.happenedAt,
          message: ev.node.message,
        })),
      })),
    };

    return new Response(JSON.stringify({ order: sanitized }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("lookup-order error", err);
    return new Response(JSON.stringify({ error: "Unexpected error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

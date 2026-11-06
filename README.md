# Greenery Veracious — Online Store

React + Vite starter for Greenery Veracious, Durban, South Africa.

## Run locally

```bash
npm install
npm run dev
```

## Deploy free on Cloudflare Pages

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Select `JoshKing15/greenery-veracious-store`.
3. Framework: Vite; build command `npm run build`; output directory `dist`.
4. Deploy. Cloudflare provides a `*.pages.dev` URL.

## Before taking orders

- The price is R150 per bottle; delivery is additional and quoted individually.
- The storefront opens a WhatsApp enquiry with quantity, subtotal, and a prompt for the customer’s suburb or postcode. Update `WHATSAPP_URL` in `src/main.jsx` if the business number changes.
- Card payments are **not active**. Only use a verified provider-hosted payment flow; never add secret keys to the client.
- Confirm bottle size, complete ingredient list, directions, delivery terms and returns/privacy policies before launch.
- The storefront includes the current multipurpose oil photos in `public/`.
- Avoid unsubstantiated medical claims about skin conditions.

This is a static storefront with a direct WhatsApp enquiry flow.

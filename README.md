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
- Add the verified business WhatsApp number to `WHATSAPP` in `src/main.jsx` (international digits, no +).
- Card payments are **not active**. Only use a verified provider-hosted payment flow; never add secret keys to the client.
- Confirm bottle size, complete ingredient list, directions, delivery terms and returns/privacy policies before launch.
- Add the provided images to `public/` with filenames: `founder-product.png`, `current-bottles.png`, `bottles-closeup.png`, `product-in-hand.png`, `brand-logo.png`.
- Avoid unsubstantiated medical claims about skin conditions.

This is a static storefront with a client-side shopping bag and WhatsApp enquiry flow, not a payment backend or order database.

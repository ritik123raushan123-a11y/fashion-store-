# StyleNest Phase 4

Fashion e-commerce starter: Women, Men, Boys and Shoes. UPI-only checkout; COD is disabled.

## Run
1. Install Node.js 18+
2. `npm install`
3. `ADMIN_KEY=your-secret npm start` (Windows PowerShell: `$env:ADMIN_KEY='your-secret'; npm start`)
4. Open `http://localhost:3000`
5. Admin: `http://localhost:3000/admin.html`

## Phase 4
- Customer signup/login with server-side hashed passwords and sessions
- Customer order history and order tracking
- Product detail view + Buy Now
- Wishlist persistence
- Catalog loads from `/api/products`, so admin-added products appear without editing JS
- Admin can update order status/payment verification
- MongoDB support with JSON fallback
- COD disabled

## Important payment note
The uploaded PhonePe/UPI QR is a static QR. This version records an order as `Payment verification pending`; it does NOT falsely claim that payment was automatically verified. For automatic verification, connect a merchant payment gateway/UPI provider and implement server-side webhook/signature verification.

## Real products
Do not treat generated demo catalog entries as real inventory. For genuine products, import a supplier/manufacturer catalog, authorized marketplace feed, or your own inventory data into the admin/API.


### Saree Edit expansion
Added 160 additional Saree products across silk, organza, georgette, chiffon, cotton, linen, ready-to-wear, festive, wedding, handloom and regional-style collections.


## Marketplace-inspired collections
Added original StyleNest collection labels inspired by broad fashion categories commonly surfaced by Flipkart and Meesho (e.g. sarees, kurtis, lehengas, western wear, ethnic wear, sneakers, kids footwear). Product data and images remain StyleNest demo catalog data; no Flipkart/Meesho listings or copyrighted assets were copied.


## 20K kids/girls expansion
- Girls/Women catalog expanded to 10,000 products.
- Boys catalog expanded to 10,000 products.
- Every catalog product is configured with a 50% discount and the storefront badge shows `50% OFF`.
- Added Girls Mega Collection and Boys Mega Collection filters.
- Product images remain StyleNest demo imagery; this does not copy third-party marketplace listings or copyrighted product photos.

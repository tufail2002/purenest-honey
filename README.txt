PURENEST HONEY WEBSITE
=======================

1. PROJECT STRUCTURE

honey-business-website/
├── index.html
├── style.css
├── script.js
└── README.txt

2. QUICK START ON UBUNTU / LINUX

Open Terminal and enter:

cd ~/Downloads
unzip honey-business-website.zip
cd honey-business-website

If Python is installed, run:

python3 -m http.server 8000

Then open:

http://localhost:8000

Why use a local server?
The website currently works as a front-end project, and using a local HTTP server gives you a more realistic development environment than opening index.html directly. Browser storage behavior for file:// URLs can vary, so serving it over HTTP is preferable.

3. CHECK YOUR PYTHON INSTALLATION

python3 --version

If Python is missing on Ubuntu:

sudo apt update
sudo apt install python3

4. VS CODE

Open the folder:

code .

Then edit:
- index.html = page structure/content
- style.css = design/responsive layout
- script.js = products/cart/payment UI

5. WHAT IS INCLUDED

Home page:
- Premium hero section
- Shop Honey CTA
- Our Story CTA
- trust points

About Us:
- business story section
- statistics
- premium visual

Services:
- natural sourcing
- quality focus
- careful packing
- customer support

Products:
- 4 sample honey products
- product cards
- prices
- Add to cart

Shopping cart:
- slide-out cart
- quantity +/-
- remove item
- total calculation
- cart is persisted with localStorage

Payment UI:
- UPI
- Card
- Net Banking
- Cash on Delivery

IMPORTANT:
The payment choices are UI only. They do NOT process real money.

6. TO ACCEPT REAL PAYMENTS

You need a backend and a payment provider.

Recommended architecture:

Browser
   ↓
Your backend
   ↓
Payment gateway
   ↓
Payment gateway webhook
   ↓
Your database
   ↓
Order confirmation

Do NOT put payment secret keys inside script.js or any browser JavaScript.

For a production Indian e-commerce site, use a proper payment provider and server-side order creation/payment verification.

7. REAL PRODUCT IMAGES

The current website intentionally uses CSS-generated honey jars so the project works immediately without missing image files.

For real products, create:

images/
├── wildflower-honey.jpg
├── forest-honey.jpg
├── acacia-honey.jpg
└── kashmir-blossom.jpg

Then replace the .jar visual with an <img> element in index.html.

8. CHANGE BUSINESS DETAILS

Search index.html for:
- PureNest
- +91 98765 43210
- hello@purenesthoney.com
- Your Business Address
- Instagram
- Facebook
- YouTube
- WhatsApp number

Replace them with your actual business information.

9. CHANGE PRODUCTS

Open script.js and edit:

const products = [
  ...
];

Each product has:
id
name
size
price
tag
desc

10. WHATSAPP

The floating WhatsApp button currently uses:

https://wa.me/919876543210

Replace the number with your business WhatsApp number in international format without +, spaces or dashes.

Example:
919876543210

11. SOCIAL MEDIA

Replace the sample links in index.html with the real profile URLs.

12. PRODUCTION DEPLOYMENT

After testing locally, you can deploy the front-end to a static hosting service.

For a real store, however, you will also need:
- domain
- HTTPS
- backend/API
- database
- real payment gateway
- order management
- inventory management
- shipping integration
- transactional email/SMS/WhatsApp
- privacy policy
- terms and conditions
- refund/cancellation policy
- secure admin area

13. RECOMMENDED NEXT VERSION

For a serious honey business, build:

Frontend:
HTML + CSS + JavaScript

Backend:
Flask / FastAPI / Node.js

Database:
PostgreSQL

Authentication:
Admin login

Admin dashboard:
- Add/edit/delete products
- Update prices
- Manage inventory
- View orders
- Change order status

Payment:
Server-side payment gateway integration

Orders:
Customer details + address + payment status + shipping status

14. IMPORTANT SECURITY RULES

Never:
- store payment secret keys in JavaScript
- trust the price sent by the browser
- mark an order as paid just because the user reached the success page
- store card numbers yourself

The server should calculate the final order amount from trusted product data and verify payment using the payment provider.

15. STOP THE LOCAL SERVER

In Terminal press:

Ctrl + C

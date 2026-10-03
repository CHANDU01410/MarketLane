# MarketLane

MarketLane is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js). It provides a complete online shopping experience with product browsing, real-time cart state management, Razorpay payment processing, transactional email notifications, and an administrative control panel for managing products, orders, users, and store metrics.

## Live Demo

- **Production URL:** [https://marketlane-backend-yfbg.onrender.com](https://marketlane-backend-yfbg.onrender.com)
- **GitHub Repository:** [https://github.com/CHANDU01410/MarketLane](https://github.com/CHANDU01410/MarketLane)

---

## Features

### Authentication & Authorization
- User registration with password hashing via `bcryptjs`.
- Email verification requirement before initial login.
- JWT-based authentication with protected route middleware.
- Role-based access control distinguishing standard customers from administrators (`role: 'user'` vs `role: 'admin'`).
- Local storage session persistence for authenticated user profile data.

### Email Verification
- 32-byte cryptographic random hex token generation upon signup.
- 10-minute token expiration timestamp stored in the user record.
- Verification link dispatch through Nodemailer (Gmail SMTP).
- Endpoint to resend verification emails for unverified accounts.
- Automated email confirmation sent upon successful verification.

### Products & Catalog
- Product catalog browsing with category filtering and keyword search (name, description, category).
- Dedicated product detail view displaying stock availability, pricing, description, and item imagery.
- Featured products showcase on the homepage.
- Database seeder script (`seedProducts.js`) with preconfigured catalog data.

### Shopping Cart
- Client-side cart state management using Redux Toolkit (`@reduxjs/toolkit`).
- Persistent cart state saved to browser `localStorage`.
- Add items, adjust quantities, remove specific items, or clear cart.
- Dynamic order summary calculation (subtotal and total).

### Checkout & Payments
- Multi-field shipping address form (full name, street, city, postal code, country).
- Razorpay test-mode integration handling INR order creation and frontend checkout modal launch.
- Backend cryptographic signature verification using HMAC SHA256.
- Graceful test fallback bypass mode if payment gateway credentials are not configured in a development environment.

### Order Management
- Order creation tied to verified customer accounts.
- Order confirmation emails sent automatically upon order placement.
- Customer order history view in user profile with delivery address and itemized breakdowns.
- Administrative order management with real-time fulfillment status updating.

### Admin Functionality
- **Dashboard:** Key store analytics including total revenue, order count, registered user count, and catalog count.
- **Product Management:** Add new products with file upload to Cloudinary CDN, edit product details and images, and delete products.
- **Order Management:** View all customer orders, filter by status, search by order ID or user name, and update status.
- **User Directory:** View all registered accounts, user roles, verification statuses, and join dates.

---

## Tech Stack

### Frontend
- **Library:** React 19 (`react`, `react-dom`)
- **Routing:** React Router DOM v7 (`react-router-dom`)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`), React Redux (`react-redux`)
- **Context API:** Authentication context (`authContext.jsx`)
- **Styling:** Modular Vanilla CSS (`global.css`, `navbar.css`, `product.css`, `cart.css`, `auth.css`, `admin.css`)
- **Payment SDK:** Razorpay Checkout script (`https://checkout.razorpay.com/v1/checkout.js`)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Authentication:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs`
- **File Upload:** Multer (multipart form-data handling)
- **Email Service:** Nodemailer
- **Payment Processing:** Razorpay Node.js SDK
- **Utilities:** `cors`, `dotenv`, Node.js built-in `crypto`

### Database
- **Database:** MongoDB
- **ODM:** Mongoose (v9)

### Third-Party Services
- **Cloudinary:** Cloud storage and CDN delivery for product images.
- **Razorpay:** Payment gateway integration (configured in Test Mode).
- **Gmail SMTP (Nodemailer):** Delivery of verification links and order receipts.

### Deployment & Hosting
- **Platform:** Render (Web Service)
- **Architecture:** Express backend serves both the REST API and the production React build.

---

## Project Structure

```
MarketLane/
├── package.json                    # Root scripts for multi-package workflows
├── .gitignore                      # Git ignore rules
│
├── backend/                        # Express API & Server
│   ├── config/
│   │   ├── cloudinary.js           # Cloudinary SDK credentials configuration
│   │   └── db.js                   # Mongoose MongoDB connection handler
│   ├── controllers/
│   │   ├── analyticsController.js  # Revenue, user, order, and product counters
│   │   ├── authController.js       # Signup, login, verification, user listing
│   │   ├── orderController.js      # Order creation, user orders, admin status update
│   │   ├── paymentController.js    # Razorpay order generation & HMAC verification
│   │   └── productController.js    # Product CRUD & Cloudinary asset upload
│   ├── middleware/
│   │   ├── adminMiddleware.js      # Checks if req.user.role === 'admin'
│   │   └── authMiddleware.js       # Validates Bearer JWT in Authorization header
│   ├── model/
│   │   ├── order.js                # Order schema, address, items, and status enum
│   │   ├── product.js              # Product schema, price, stock, and image array
│   │   └── user.js                 # User schema, password hash, role, verification fields
│   ├── routes/
│   │   ├── analyticsRoutes.js      # GET /api/analytics
│   │   ├── authRoutes.js           # /api/auth endpoints
│   │   ├── orderRoutes.js          # /api/orders endpoints
│   │   ├── paymentRoutes.js        # /api/payment endpoints
│   │   └── productRoutes.js        # /api/products endpoints
│   ├── utils/
│   │   ├── sendEmail.js            # Nodemailer transport and email sender
│   │   └── verifyEmail.js          # Verification token generator & link dispatcher
│   ├── .env.example                # Template for backend environment variables
│   ├── index.js                    # Express app entrypoint, middleware, static build serving
│   ├── package.json                # Backend dependencies and scripts
│   └── seedProducts.js             # Initial database catalog seeder script
│
└── frontend/                       # React Single Page Application
    ├── public/
    │   ├── index.html              # HTML template with Razorpay checkout script
    │   ├── MarketLane.png          # MarketLane brand mark
    │   └── dp.jpeg                 # Profile avatar asset
    ├── src/
    │   ├── admin/                  # Administrative views
    │   │   ├── AddProduct.jsx      # Product creation with Cloudinary image upload
    │   │   ├── AdminDashboard.jsx  # Metrics overview and portal navigation
    │   │   ├── AdminNav.jsx        # Admin tabbed sub-navigation bar
    │   │   ├── AdminOrders.jsx     # Order listing, search, and status modifier
    │   │   ├── AdminProducts.jsx   # Product table with edit and delete actions
    │   │   ├── AdminUsers.jsx      # Registered user directory with search
    │   │   └── EditProduct.jsx     # Product update form with image replacement
    │   ├── components/             # Reusable UI components
    │   │   ├── Footer.jsx          # Site footer with platform links
    │   │   ├── Navbar.jsx          # Top navigation, role badges, and cart counter
    │   │   └── ProductCard.jsx     # Product display card with Add to Cart trigger
    │   ├── context/
    │   │   └── authContext.jsx     # Global authentication state and localStorage sync
    │   ├── pages/                  # Customer-facing views
    │   │   ├── About.jsx           # Store background and values
    │   │   ├── Cart.jsx            # Cart item list and quantity adjustment
    │   │   ├── Checkout.jsx        # Shipping details, Razorpay modal, order submit
    │   │   ├── Disclaimer.jsx      # Platform disclaimers
    │   │   ├── Home.jsx            # Hero section and featured items
    │   │   ├── Login.jsx           # Account sign-in form
    │   │   ├── OrderSuccess.jsx    # Order completion confirmation screen
    │   │   ├── ProductDetail.jsx   # Detailed item information and cart actions
    │   │   ├── Profile.jsx         # User details and personal order history
    │   │   ├── Register.jsx        # Registration form with email verification alert
    │   │   ├── ReturnPolicy.jsx    # Store return guidelines
    │   │   └── Shop.jsx            # Searchable and categorizable catalog
    │   ├── redux/                  # Redux Toolkit state
    │   │   ├── cartSlice.js        # Cart items reducer and localStorage sync
    │   │   └── store.js            # Redux store configuration
    │   ├── styles/                 # Application stylesheets
    │   │   ├── admin.css           # Admin workspace styles
    │   │   ├── auth.css            # Login, register, and profile styles
    │   │   ├── cart.css            # Cart and checkout styles
    │   │   ├── global.css          # Design tokens, variables, typography, reset
    │   │   ├── navbar.css          # Header and navigation bar styles
    │   │   └── product.css         # Product cards, grids, and detail styles
    │   ├── App.jsx                 # Route definitions and application layout
    │   └── index.js                # React root mount and Redux/Auth providers
    ├── .env.production             # Frontend production API URL configuration
    └── package.json                # Frontend dependencies and scripts
```

---

## Authentication Flow

```
1. Registration (POST /api/auth/register)
   └── Validates email uniqueness
   └── Hashes password with bcryptjs (10 salt rounds)
   └── Generates 32-byte hex verification token (expires in 10 minutes)
   └── Sends email verification link via Nodemailer
   └── Saves user with isVerified: false

2. Email Verification (GET /api/auth/verify-email/:token)
   └── Finds user by token where token expiry > Date.now()
   └── Sets isVerified: true, clears token & expiry
   └── Sends email confirmation receipt

3. Login (POST /api/auth/login)
   └── Verifies user credentials using bcrypt.compare()
   └── Confirms user.isVerified === true (returns 403 if unverified)
   └── Signs JWT token with { id: user._id } (expires in 30 days)
   └── Returns user object (_id, name, email, role, token)

4. Client Session
   └── Stores credentials in localStorage under 'userInfo'
   └── Populates React AuthContext

5. Protected Requests
   └── Client sends Authorization header: Bearer <token>
   └── Backend 'protect' middleware decodes token and sets req.user
   └── Backend 'admin' middleware verifies req.user.role === 'admin'
```

---

## Email Verification

The email verification flow is designed to ensure accounts are tied to valid email addresses before granting access:

1. **Token Generation:** When a user registers, `utils/verifyEmail.js` generates a random 32-byte hex token using Node's `crypto` module.
2. **Expiration Window:** The expiration is set to 10 minutes (`Date.now() + 10 * 60 * 1000`) and stored directly in the `User` document.
3. **Verification Link Construction:** The link points to `${BACKEND_URL}/api/auth/verify-email/${token}`. On production, `BACKEND_URL` is set to the Render production domain.
4. **Verification Handler:** When the user clicks the link, `GET /api/auth/verify-email/:token` validates that the token exists and has not expired. Upon success, `isVerified` is toggled to `true`, the token fields are removed, and a confirmation email is dispatched.
5. **Resend Capability:** Unverified users can trigger `POST /api/auth/verify-email` with their email address to generate a fresh token and receive a new verification email.

---

## Payment Flow

MarketLane integrates Razorpay in **Test Mode** for order transactions:

1. **Initialize Payment:** On `/checkout`, the user enters their shipping address and clicks "Pay Now".
2. **Create Razorpay Order:** The frontend sends a `POST /api/payment/order` request with the cart total amount. The backend uses the `razorpay` Node SDK to create an order:
   - Currency: `INR`
   - Amount: Converted to paise (`amount * 100`)
   - Receipt: Random 10-byte hex string
3. **Launch Checkout Modal:** The backend returns the Razorpay order ID. The frontend instantiates the Razorpay modal (`new window.Razorpay(options)`) with the key ID, customer prefilled data, and order ID.
4. **Verify Signature:** When payment succeeds in the modal, Razorpay returns `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature`. The frontend submits these to `POST /api/payment/verify`. The backend computes an HMAC SHA256 digest using `RAZORPAY_KEY_SECRET` and confirms that the generated signature matches.
5. **Save Order:** Once verified, the frontend sends a `POST /api/orders` request with the item list, total amount, shipping address, and the `paymentId`.
6. **Fallback Bypass Mode:** If Razorpay backend environment variables are unconfigured during local student evaluation, the frontend provides an optional test bypass prompt to simulate order placement without throwing unhandled exceptions.

---

## Order Flow

```
Cart (Redux) ──> Checkout Address ──> Razorpay Gateway ──> Verify Signature
                                                                  │
                                                                  ▼
Database Order Record <── Send Order Email <── POST /api/orders
         │
         ├── User views in Profile (/profile via GET /api/orders/myorders)
         └── Admin manages in Dashboard (/admin/orders via PUT /api/orders/:id/status)
```

### Order Statuses
The `Order` model enforces an explicit status enumeration:
- `Pending` (Default state upon creation)
- `Processing`
- `Shipped`
- `Delivered`
- `Cancelled`

Administrators can update this status at any time from the Admin Orders panel, which persists immediately to MongoDB.

---

## API Endpoints

### System Health
| Method | Endpoint | Auth | Admin | Description |
|--------|----------|:----:|:-----:|-------------|
| `GET` | `/api/health` | No | No | Health check verifying that the backend server is operational. |

### Authentication (`/api/auth`)
| Method | Endpoint | Auth | Admin | Description |
|--------|----------|:----:|:-----:|-------------|
| `POST` | `/api/auth/register` | No | No | Register new account, hash password, and send verification email. |
| `POST` | `/api/auth/login` | No | No | Authenticate credentials, check email verification, and return JWT. |
| `POST` | `/api/auth/verify-email` | No | No | Resend an email verification link to an unverified user. |
| `GET` | `/api/auth/verify-email/:token` | No | No | Verify account email address using token parameter. |
| `GET` | `/api/auth/users` | Yes | Yes | List all registered users in the database (excluding password hashes). |

### Products (`/api/products`)
| Method | Endpoint | Auth | Admin | Description |
|--------|----------|:----:|:-----:|-------------|
| `GET` | `/api/products` | No | No | Retrieve list of all products in catalog. |
| `GET` | `/api/products/:id` | No | No | Retrieve single product details by MongoDB ObjectId. |
| `POST` | `/api/products` | Yes | Yes | Upload image to Cloudinary and create new product. |
| `PUT` | `/api/products/:id` | Yes | Yes | Update product details and optionally replace image on Cloudinary. |
| `DELETE` | `/api/products/:id` | Yes | Yes | Delete product record from database. |

### Orders (`/api/orders`)
| Method | Endpoint | Auth | Admin | Description |
|--------|----------|:----:|:-----:|-------------|
| `POST` | `/api/orders` | Yes | No | Create and save an order, then send confirmation email to customer. |
| `GET` | `/api/orders/myorders` | Yes | No | Retrieve all orders belonging to the currently authenticated user. |
| `GET` | `/api/orders` | Yes | Yes | Retrieve all orders across all users with populated user details. |
| `PUT` | `/api/orders/:id/status` | Yes | Yes | Update fulfillment status of an order (`Pending`, `Processing`, etc.). |

### Payments (`/api/payment`)
| Method | Endpoint | Auth | Admin | Description |
|--------|----------|:----:|:-----:|-------------|
| `POST` | `/api/payment/order` | No | No | Generate Razorpay order ID for specified INR amount. |
| `POST` | `/api/payment/verify` | No | No | Verify Razorpay payment signature using HMAC SHA256. |

### Analytics (`/api/analytics`)
| Method | Endpoint | Auth | Admin | Description |
|--------|----------|:----:|:-----:|-------------|
| `GET` | `/api/analytics` | Yes | Yes | Retrieve total orders, total catalog items, total users, and total revenue. |

---

## Environment Variables

Create a `.env` file inside the `backend` directory based on the following template:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/marketlane-mern
JWT_SECRET=your_jwt_secret_key_here
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# Nodemailer / Gmail SMTP Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Cloudinary Media Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_SECRET=your_cloudinary_api_secret

# Razorpay Payment Gateway (Test Mode)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Render Production Configuration
When deploying on Render, configure the following environment variables in the Render dashboard:
- `NODE_ENV=production`
- `MONGO_URI` (MongoDB Atlas connection string)
- `JWT_SECRET` (Secure random secret key)
- `BACKEND_URL=https://marketlane-backend-yfbg.onrender.com`
- `FRONTEND_URL=https://marketlane-backend-yfbg.onrender.com`
- `EMAIL_USER` and `EMAIL_PASS` (Gmail account and application password)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_CLOUD_SECRET`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

> **Note on `PORT`:** Do not manually set `PORT` in the Render environment variables dashboard. Render automatically provides and injects the `PORT` variable dynamically at runtime, which `backend/index.js` listens on (`process.env.PORT || 5000`).

---

## Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB running locally or a MongoDB Atlas URI
- npm package manager

### 1. Clone the Repository
```bash
git clone https://github.com/CHANDU01410/MarketLane.git
cd MarketLane
```

### 2. Install Dependencies
You can install dependencies across the root, backend, and frontend with a single command:
```bash
npm run install-all
```
*Or install them individually:*
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3. Configure Backend Environment
Create `backend/.env`:
```bash
cp backend/.env.example backend/.env
```
Update `backend/.env` with your MongoDB URI, JWT secret, Gmail credentials, and API keys.

### 4. Optional: Seed the Catalog
Populate the database with sample products:
```bash
cd backend
node seedProducts.js
cd ..
```

### 5. Run the Application in Development Mode
From the root directory, run both frontend and backend concurrently:
```bash
npm run dev
```
- Frontend client: [http://localhost:3000](http://localhost:3000)
- Backend server: [http://localhost:5000](http://localhost:5000)

*Alternatively, run each in separate terminals:*
```bash
# Terminal 1 - Backend API
npm run dev:server

# Terminal 2 - Frontend Client
npm run dev:client
```

---

## Production Deployment

MarketLane is deployed as a single Render Web Service configured with the following settings:

- **Root Directory:** `backend/`
- **Build Command:**
  ```bash
  npm install && cd ../frontend && npm install && npm run build
  ```
- **Start Command:**
  ```bash
  node index.js
  ```
- **Unified Serving:** In production (`NODE_ENV=production`), Express statically serves the `frontend/build` folder (`path.join(__dirname, "../frontend/build")`) and routes any non-API request back to `frontend/build/index.html` via client-side routing.
- **Production URL:** [https://marketlane-backend-yfbg.onrender.com](https://marketlane-backend-yfbg.onrender.com)

---

## Security

Security features implemented in the application include:
- **Password Hashing:** Passwords are never stored in plain text; they are hashed using `bcryptjs` with 10 salt rounds prior to persistence.
- **JWT Authentication:** Stateless authentication utilizing signed JSON Web Tokens passed in HTTP Bearer headers.
- **Route Authorization Middleware:** Express route middleware (`protect`) enforces valid token presence and populates user context excluding password hashes (`select('-password')`).
- **Role Verification:** Critical endpoints (product mutation, admin order updates, user listings, analytics) require verified administrator privileges (`role === 'admin'`).
- **Email Verification Guard:** Unverified accounts are barred from obtaining authentication tokens during login until email confirmation is completed.
- **HMAC Payment Signature Verification:** Razorpay payment responses are cryptographically validated on the server using Node's HMAC SHA256 before orders are committed.
- **Secret Isolation:** API keys, database credentials, and token secrets are managed exclusively through environment variables.

---

## Screenshots

> Screenshots can be added here.

---

## Future Improvements

Features and enhancements planned for future iterations:
- Persistent customer wishlist system.
- Customer product review and star-rating submission interface.
- Advanced catalog filters (price range slider, brand filtering, sorting by price/rating).
- Discount coupon code engine at checkout.
- Server-side pagination for product catalogs and administrative order/user tables.
- Automated refund and return request management workflow.
- Light/Dark theme toggle preference.

---

## Author

**Chandu**  
- GitHub: [https://github.com/CHANDU01410](https://github.com/CHANDU01410)
- Repository: [https://github.com/CHANDU01410/MarketLane](https://github.com/CHANDU01410/MarketLane)

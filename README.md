# E-Rent — Real Estate Platform

A modern, multi-page real estate web application built with **React 18** and **Vite**. E-Rent provides property listings, blog content, project showcases, and user account features across seven distinct homepage layouts.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages and Routes](#pages-and-routes)
- [Architecture](#architecture)
  - [Data Flow](#data-flow)
  - [State Management](#state-management)
  - [Styling](#styling)
- [Backend API](#backend-api)
- [External Integrations](#external-integrations)
- [Available Scripts](#available-scripts)

---

## Features

- **7 Homepage Variants** — Different layouts and content arrangements for the landing page
- **Property Listings** — Grid and sidebar views with filtering by status, type, location, and sorting
- **Property Details** — Individual property pages with amenities, gallery, floor plans, and contact info
- **Blog System** — Blog listing and detail pages with sidebar, comments, and navigation
- **Project Showcase** — Project listing and detail pages
- **User Accounts** — Login, registration, and account dashboard with profile, address, favorites, and payment tabs
- **Shopping Cart & Checkout** — Cart management and checkout flow
- **Contact Form** — Functional contact form powered by EmailJS
- **Map Location View** — Map-based property browsing
- **Add Listing** — Property submission form with image upload
- **Responsive Design** — Mobile menu, off-canvas navigation, and responsive grid layout
- **SEO Support** — Dynamic page titles via React Helmet Async
- **Scroll Restoration** — Automatic scroll position management on navigation

---

## Tech Stack

| Category       | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| Framework      | React 18                                                      |
| Build Tool     | Vite 5                                                        |
| Routing        | React Router DOM v6                                           |
| Forms          | Formik + Yup                                                  |
| Styling        | SCSS, Bootstrap (grid/utilities), Font Awesome, Line Awesome  |
| Notifications  | React Toastify                                                |
| Carousels      | React Slick                                                   |
| Lightbox       | React Image Lightbox                                          |
| Counters       | React CountUp + React Visibility Sensor                       |
| Tabs           | React Tabs                                                    |
| Email          | EmailJS                                                       |
| SEO            | React Helmet Async                                            |

---

## Getting Started

### Prerequisites

- **Node.js** >= 16
- **npm** (comes with Node.js)

### Installation

```bash
git clone https://github.com/Mrsolution07/E-rent.git
cd E-rent
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Outputs optimized static files to the `dist/` directory.

### Preview Build

```bash
npm run preview
```

Serves the production build locally for testing.

---

## Project Structure

```
E-rent/
├── public/
│   ├── _redirects                  # Netlify deploy redirects
│   └── assets/
│       ├── css/                    # Bootstrap, Font Awesome, Line Awesome, main.css
│       ├── fonts/                  # Line Awesome webfonts
│       ├── images/
│       │   ├── icons/              # SVG icons (amenities, services, counters)
│       │   ├── logo/               # Favicon, logo, white logo
│       │   ├── shapes/             # Decorative background shapes
│       │   └── thumbs/             # Content images (properties, blogs, team)
│       ├── sass/                   # SCSS source files for main.css
│       └── webfonts/               # Font Awesome webfonts
│
├── src/
│   ├── main.jsx                    # App entry point, context providers
│   ├── App.jsx                     # Router setup, route definitions
│   ├── App.css                     # App-level styles
│   ├── index.scss                  # Global SCSS imports
│   │
│   ├── pages/                      # Page-level components (one per route)
│   │   ├── HomeOne.jsx … HomeSeven.jsx
│   │   ├── Property.jsx, PropertySidebar.jsx, PropertyDetails.jsx
│   │   ├── BlogClassic.jsx, BlogDetails.jsx
│   │   ├── Project.jsx, ProjectDetails.jsx
│   │   ├── AboutUs.jsx, Contact.jsx, FaqPage.jsx
│   │   ├── Login.jsx, Register.jsx, Account.jsx
│   │   ├── Cart.jsx, Checkout.jsx
│   │   ├── AddListing.jsx, MapLocation.jsx
│   │   └── NotFound.jsx
│   │
│   ├── components/                 # Section-level components
│   │   ├── Banner.jsx … BannerThree.jsx
│   │   ├── Property.jsx … PropertyFilterForm.jsx
│   │   ├── Blog.jsx … BlogDetailsSection.jsx
│   │   ├── About.jsx … AboutThree.jsx
│   │   ├── Counter.jsx … CounterFour.jsx
│   │   ├── Testimonial.jsx, TestimonialThree.jsx
│   │   ├── AccountSection.jsx, Account*Tab.jsx
│   │   ├── LoginSection.jsx, LoginRegister.jsx
│   │   ├── ContactUsSection.jsx
│   │   └── items/                  # Individual item components
│   │       ├── PropertyItem.jsx, PropertyTypeItem.jsx
│   │       ├── BlogItem.jsx … BlogClassicItem.jsx
│   │       ├── CounterItem.jsx … CounterFourItem.jsx
│   │       ├── TestimonialItem.jsx, TeamItem.jsx
│   │       ├── PortfolioItem.jsx, FaqItem.jsx
│   │       └── …
│   │
│   ├── common/                     # Shared/reusable UI components
│   │   ├── Header.jsx, TopHeader.jsx
│   │   ├── Footer.jsx, FooterTwo.jsx
│   │   ├── footer/                 # Footer sub-components
│   │   ├── MobileMenu.jsx, NavMenu.jsx, OffCanvas.jsx
│   │   ├── Breadcrumb.jsx, PageTitle.jsx, ScrollToTop.jsx
│   │   ├── Pagination.jsx, Filter.jsx, SearchBox.jsx
│   │   ├── Logo.jsx, LogoWhite.jsx, SocialList.jsx
│   │   └── …
│   │
│   ├── contextApi/                 # React Context providers
│   │   ├── PropertyFilterContext.jsx
│   │   ├── MobileMenuContext.jsx
│   │   ├── OffCanvasContext.jsx
│   │   └── ScrollHideContext.jsx
│   │
│   ├── data/                       # Static data (properties, blogs, menus, etc.)
│   │   ├── CommonData/CommonData.jsx
│   │   ├── HomeOneData/HomeOneData.jsx
│   │   ├── HomeTwoData/HomeTwoData.jsx
│   │   ├── HomeThreeData/HomeThreeData.jsx
│   │   └── OthersPageData/OthersPageData.jsx
│   │
│   └── utility/
│       └── Utility.jsx             # Helper functions (slug, date, etc.)
│
├── server/                         # Backend API (Express + MySQL)
│   ├── index.js                    # API entry point
│   ├── db.js                       # MySQL connection pool
│   ├── schema.sql                  # Database schema
│   ├── .env.example                # Environment template
│   └── package.json
│
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies and scripts
└── .gitignore
```

---

## Pages and Routes

| Route                | Page Component   | Description                                      |
| -------------------- | ---------------- | ------------------------------------------------ |
| `/`                  | HomeOne          | Default homepage with banner, properties, blog   |
| `/home-two`          | HomeTwo          | Alternate layout with services and floor plans   |
| `/home-three`        | HomeThree        | Third homepage variant                           |
| `/home-four`         | HomeFour         | Fourth homepage variant                          |
| `/home-five`         | HomeFive         | Fifth homepage variant                           |
| `/home-six`          | HomeSix          | Sixth homepage variant                           |
| `/home-seven`        | HomeSeven        | Seventh homepage variant                         |
| `/property`          | Property         | Property grid with top filter bar                |
| `/property-sidebar`  | PropertySidebar  | Property list with sidebar filters               |
| `/property/:title`   | PropertyDetails  | Single property detail page                      |
| `/add-new-listing`   | AddListing       | Submit a new property listing                    |
| `/map-location`      | MapLocation      | Map-based property view                          |
| `/about-us`          | AboutUs          | About page with team and property types          |
| `/faq`               | FaqPage          | Frequently asked questions                       |
| `/project`           | Project          | Project showcase listing                         |
| `/project/:title`    | ProjectDetails   | Single project detail page                       |
| `/blog`              | BlogClassic      | Blog listing with sidebar                        |
| `/blog/:title`       | BlogDetails      | Single blog post with comments                   |
| `/contact`           | Contact          | Contact form, map embed, and info                |
| `/login`             | Login            | User login form                                  |
| `/register`          | Register         | User registration form                           |
| `/account`           | Account          | User dashboard with tabbed sections              |
| `/cart`              | Cart             | Shopping cart                                    |
| `/checkout`          | Checkout         | Checkout flow                                    |
| `*`                  | NotFound         | 404 error page                                   |

---

## Architecture

### Data Flow

The application uses **static data files** as its primary data source. Properties, blogs, team members, and other content are defined in JavaScript files under `src/data/`. An optional **backend API** (`server/`) provides REST endpoints for properties when MySQL is configured.

```
Data Files (HomeOneData, CommonData, OthersPageData)
    │
    ▼
Page Components ──→ Section Components ──→ Item Components
    │
    ├── PropertyFilterContext ──→ PropertyItem (show/hide based on filters)
    │
    ├── React Router location.state ──→ Detail pages (property, blog, project)
    │
    └── Formik + Yup ──→ Form handling (login, register, newsletter, checkout)
```

- **Property listings**: Data from `HomeOneData.properties` flows into `PropertyPageSection`, which renders `PropertyItem` components filtered via `PropertyFilterContext`.
- **Detail pages**: When a user clicks a property or blog card, the item data is passed via React Router's `location.state` to the detail page.
- **Forms**: Login, registration, newsletter, and checkout forms use Formik for state management and Yup for validation. Form submissions show toast notifications but do not persist data.

### State Management

The app uses **React Context** for cross-component state, with four providers initialized in `main.jsx`:

| Context                  | Purpose                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `PropertyFilterContext`  | Stores active filters (status, type, location, sort order) |
| `MobileMenuContext`      | Toggles mobile navigation menu visibility                  |
| `OffCanvasContext`       | Toggles off-canvas side panel visibility                   |
| `ScrollHideContext`      | Manages body scroll lock when modals/menus are open        |

All other state is managed locally with `useState` within individual components.

### Styling

The app uses a **multi-layer styling approach**:

1. **Bootstrap** — Grid system and utility classes (`container`, `row`, `col-*`, `d-flex`, etc.) loaded from `public/assets/css/bootstrap.min.css`
2. **Custom SCSS** — BEM-style class names (e.g., `.property-item__title`) compiled from `public/assets/sass/` into `main.css`
3. **Icon Fonts** — Font Awesome and Line Awesome for icons
4. **Component CSS** — `App.css` and `index.scss` for app-level overrides
5. **Third-party CSS** — React Toastify and React Image Lightbox styles

---

## Backend API

The `server/` folder contains an Express API with MySQL for properties and contact form handling.

### Setup

1. **Install server dependencies:**
   ```bash
   cd server && npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```

3. **Create the database:**
   ```bash
   mysql -u root -p < schema.sql
   ```

4. **Start the server:**
   ```bash
   npm run dev   # Development (with --watch)
   npm start     # Production
   ```

The API runs at `http://localhost:3001`. During frontend development, Vite proxies `/api` requests to the server.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/db-check` | Database connection status |
| GET | `/api/properties` | List all properties |
| GET | `/api/properties/:id` | Get single property (includes images) |
| POST | `/api/properties` | Create property |
| POST | `/api/contact` | Contact form (saves to `contacts` table) |
| POST | `/api/register` | User registration |
| POST | `/api/login` | User login |
| GET | `/api/blog` | List blog posts |
| GET | `/api/blog/:slug` | Get blog post by slug |
| GET | `/api/testimonials` | List testimonials |
| GET | `/api/favorites/:userId` | Get user's favorite properties |
| POST | `/api/favorites` | Add favorite (`user_id`, `property_id`) |
| DELETE | `/api/favorites/:userId/:propertyId` | Remove favorite |

---

## External Integrations

### EmailJS (Contact Form)

The contact form on the `/contact` page sends emails via [EmailJS](https://www.emailjs.com/):

- **Service ID**: `service_5opdqb8`
- **Template ID**: `template_tel2xio`
- **Public Key**: `TkEXMnREcdrQyndFz`

To use your own EmailJS account, update these values in `src/components/ContactUsSection.jsx`.

### Google Maps

The contact page embeds a Google Maps iframe for location display.

---

## Available Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start frontend dev server (Vite)                  |
| `npm run build`    | Build frontend for production                    |
| `npm run lint`     | Run ESLint on `.js` and `.jsx` files             |
| `npm run preview`  | Preview the production build locally             |

**Backend** (from `server/` directory):
| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start API with hot reload                        |
| `npm start`        | Start API (production)                          |

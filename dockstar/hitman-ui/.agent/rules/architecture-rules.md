# Architecture Overview

## 1. High-Level Architecture

The system follows a **Single Page Application (SPA) model with Server-Side Rendering (SSR)**.

### Core Components

- **Frontend (hitman-ui)**: Next.js application hosting the Editor, Dashboard, and Public Pages.
- **Proxy Service**: A middleware layer that handles Authentication and Organization management. It acts as the gateway for most REST API calls.
- **Hitman API**: The core backend service (accessed via Proxy) that handles business logic, CRUD operations, and permission checks.
- **Real-Time Service (RTLayer)**: A WebSocket-based service for real-time collaboration (RTC) and state synchronization (page creation, deletion).

---

## 2. Technology Stack

### Core Framework

- **Next.js (App Router)**: Uses modern Next.js 16+ patterns with server and client components.

### Editor

- **Editor**: Using Tiptap editor for rich text editor. Imported from titpap core library.
- **Collab**: **Y.js** and **Hocuspocus** (Used a seperate service for real-time collaboration(DOC-RTC) and state synchronization of yjs providers).
- **Distribution**: The core editor components are bundled via scripts (`public/scriptProd.js`, `public/scriptdev.js`) to be embedded in other platforms, allowing the DocStar editor to be used as a standalone component.

---

## 3. Key Workflows

### Authentication & Proxy

- **Login**: Handled by an external Proxy Service script (`proxy-auth.js`).
- **Flow**:
  1.  User logs in via the Proxy UI.
  2.  Proxy redirects to login page of `hitman-ui` with a `proxy_auth_token`.
  3.  UI store's proxy auth token and use it for all requests to internal APIs + use for direct proxy api calls (eg get userDetails getorgdetails etc).
- **SSO**:
  1. Handled by `src/app/(other)/sso/auth/page.js`.
  2. Receives `auth_token`, calls `get-sso-token`, and populates Redux/local storage.

### Public Page Rendering

- **Route**: `src/app/p/[...slug]`
- **Strategy**: **Server-Side Rendering (SSR)**.

- **Landing Page**:
  - **Trigger Logic**: `src/utils/landingPageUtils.js`. Activates if `visibleComponents.homepage` is true and URL matches collection root.
  - **Rendering Component**: `src/components/publicPage/collectionLandingPage.jsx`.
  - **SSR Fetched**: Fetches "Featured Pages" (first 3 top-level pages with images) server-side.
  - **Content**: Renders Hero Title, Search Bar, Featured Cards, and "Browse by topic" (Top-level pages).

### Chatbot Integration

- **Script**: `src/components/ChatbotScript/ChatbotScript.js`.
- we have seperate chatbot for internal , public. and invite page seperated by bridgeName in senddatatochatbot function.
  - we use variable to send contex to AI

### Theming

- **Dark Mode**:
  - Detected via `window.matchMedia` in `src/components/theme/ThemeInitializer.jsx`.
  - Applies `data-theme="dark/light"` to `<html>`.
  - Public pages force **light mode** (`isOnPublishedPage()` check) to ensure consistency with user-defined collection themes.
- **Collection Theme**:
  - Stored in `collection.docProperties`.
  - Applied dynamically via inline styles (CSS Variables) in Public Pages (`--default-text-color`, `--default-background-color`).
  - **Theme**: Background color, text color, and border radius are managed via CSS variables.

### Collection Types

- **`collection.type`** defines the purpose and behavior of a collection. Possible values:
  - `blog` — Collection serves as a blog.
  - `doc` — Collection serves as documentation.
  - `embed` — Collection is used for embedding.
  - `api` — Collection serves API documentation (includes endpoints alongside pages).
- **Impact**: Features like archived endpoints, API method badges, and endpoint-specific UI are only shown when `collection.type === 'api'`.

### Parent-Child Hierarchy

- **Data Structure**: Normalized "Flat Tree" in Redux (`pages` assignment).
  - Each Page Object: `{ id, parentId, child: [id1, id2], ... }`.
- **State Management**:
  - **Redux**: `pagesReducer` handles updates. Adding a page updates the new page's entry AND the parent's `child` array.
  - **Recursion**: UI components (Sidebar) recursively traverse the `child` array to render nested folders/pages.

### URL Redirection

- **Purpose**: To prevent broken links (404s) and preserve SEO ranking when pages are renamed, moved, or deleted.
- **Mechanism**:
  - **Data**: Mappings between `oldUrl` (slug) and `targetPageId` are stored via the backend API (`/urlMappings`).
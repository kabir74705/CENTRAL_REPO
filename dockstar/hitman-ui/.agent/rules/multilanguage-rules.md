# Multi-Language Feature Implementation

This document outlines how the multi-language feature works, including URL structures, language extraction, and data fetching.

## 1. URL Structures

We support two primary URL structures for language content:

1.  **Query Parameter (Standard)**: Used typically for `localhost` or `app.domain.com/p/...`
    - `https://app.domain.com/p/getting-started?lang=hi`
2.  **Path Prefix (Custom Domains)**: Used for custom domains to clearly separate languages.
    - `https://docs.example.com/hi/getting-started` (Loads Hindi)
    - `https://docs.example.com/getting-started` (Loads default/English)

## 2. Language Extraction & Logic

The application extracts the language from the URL in two key places:

### A. Server-Side Extraction (`src/app/p/[...slug]/page.jsx`)

When a request comes in:

1.  **Check URLs Params**: Is `lang` in query params? (`?lang=hi`)
2.  **Check Path Slug**: Is the _first segment_ of the path a 2-letter code? (e.g., `/hi/...`)
3.  **Extraction**: If a code is found in the path:
    - It is extracted as `lang`.
    - It is **removed** from the `slug` used to fetch data (so `/hi/slug` requests data for `/slug`).

### B. Layout Handling (`src/app/layout.jsx`)

To ensure global components (like Sidebar) work correctly:

1.  It checks if the path starts with a 2-letter code (for custom domains).
2.  It extracts this as `lang` and passes it to the `Sidebar`.
3.  It **removes** the language prefix from the `pathname` passed to children to prevent double-prefixing in generated links.

## 3. Data Fetching & Content Mapping

**The Singularity Problem**: URLs use codes (`hi`), but the database often stores full names (`Hindi`).

**Solution**:

- **`src/components/common/utility.js`**: Contains `languageOptions` mapping codes to names (e.g., `{ code: 'hi', name: 'Hindi' }`).
- **`renderPageContent.jsx`**:
  - Uses a helper `getNormalizedLangName(code)` to convert `hi` -> `Hindi`.
  - Uses this normalized name to find the correct content in the `additionalContent` array from the API.

## 4. Client-Side State & Navigation

- **Initialization**: `renderPageContent.jsx` initializes state using the prop-drilled `lang` from the server (ensuring SSR works).
- **Hydration**: `useEffect` hooks also use the normalized language logic to ensure the client doesn't revert to English.
- **Sidebar**: Uses `useSearchParams` to detect the current language and appends `?lang=` or uses the appropriate prefix for navigation links, ensuring the user stays in their selected language.

## Summary Checklist for New Languages

1.  Add the language to `languageOptions` in `src/components/common/utility.js`.
2.  Ensure the database content uses the `name` defined in that option.
3.  The system automatically handles the URL mapping (`code` <-> `name`).
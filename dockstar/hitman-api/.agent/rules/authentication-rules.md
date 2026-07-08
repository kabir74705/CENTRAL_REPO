# Authentication & Context Rules

- **Source of Truth (CRITICAL):** 
  - ALWAYS use `req.profile` to identify User and Organization. Access details via `req.profile.user.id` and `req.profile.company.id`.
  - DO NOT rely on `req.body` for `userId` or `orgId`.
- **Proxy Authentication:** 
  - Frontend calls Proxy, Proxy forwards valid requests here with a JWT in `Authorization` header (validated via `TOKEN_SECRET_KEY`) and `proxy_auth_token` header.
  - **Auto-Switch:** If `req.params.orgId` differs from the token's company ID, `switchCompany` is called.
- **Custom API Tokens:** For external devs. Header: `Authorization: Bearer hm_<token>`. Managed in `apiTokenController.ts` and validated via `apiTokenService`.
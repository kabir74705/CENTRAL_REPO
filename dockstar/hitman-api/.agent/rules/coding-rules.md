# Coding Rules

- **Error Handling:** All controllers must use the global `errorHandler`. Use `sendAlertToslack` for critical failures.
- **Database Operations:** 
  - Always import models via `const models = require("../models");`.
  - Use `executeRawQuery` helper if raw queries are necessary.
  - Pass the `transaction` object to all service calls in transactional flows.
- **Logging:** Any Create/Update/Delete operation MUST create a log entry using the log model.
- **Naming Convention:** Use **camelCase** for files and functions.
- **Documentation:** If you add a new architectural feature, update `.agent/rules/architecture-rules.md`.
- **Temporary Files:** Whenever you create a temporary file to test something, use `trial` in the filename (e.g., `trial_redis.ts` instead of `test_redis.ts`), because `test*` is added to `.gitignore` and you will be prohibited from modifying it.
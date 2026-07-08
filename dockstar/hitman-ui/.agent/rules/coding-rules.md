## AI Coding Best Practices (Frontend)

1. Use component structure:
   - Split UI into small reusable components.
2. Follow React/Next best practices.
3. **Utility Functions**:
   - Use `src/utils/` for general helper functions.
   - Use `src/components/common/utility.js` for component-level or legacy common utilities.
   - Use `src/lib/utils.ts` for Tailwind/Radix UI merges and standard TS utilities.
   - If a utility is not present, create it in the appropriate folder rather than duplicating logic.
4. Check is there a component already exists for the feature you are trying to implement.
5. **Asset Imports**: When fixing asset issues (e.g. SVGs), prefer changing code usage (e.g. `<img src={svg} />`) over changing build config. Simplest solution first.
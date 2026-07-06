// GitHub Copilot (VS Code) MCP config for code-review-graph
// Copilot reads MCP servers from .vscode/mcp.json at the repo root.

export default {
  // Where to place this file inside the cloned repo
  path: ".vscode/mcp.json",

  // Content to write at that path
  format: {
    servers: {
      "code-review-graph": {
        type: "stdio",
        command: "code-review-graph",
        args: ["serve"]
      }
    }
  }
};

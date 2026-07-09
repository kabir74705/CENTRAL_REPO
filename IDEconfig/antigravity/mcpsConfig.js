// Antigravity MCP config for code-review-graph
// Antigravity reads MCP servers from .agents/mcp_config.json at the repo root.

export default {
  // Where to place this file inside the cloned repo
  path: ".gemini/config/mcp.json",

  // Content to write at that path
  format: {
    mcpServers: {
      "code-review-graph": {
        command: "code-review-graph",
        args: ["serve"],
        type: "stdio"
      }
    }
  }
};

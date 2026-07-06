// Claude Code MCP config for code-review-graph
// Claude Code reads MCP servers from .mcp.json at the repo root.

export default {
  // Where to place this file inside the cloned repo
  path: ".mcp.json",

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

interface MCPToolResult {
  url: string;
  [key: string]: any;
}

interface Window {
  use_mcp_tool: (
    serverName: string,
    toolName: string,
    args: {
      base64Data: string;
      filename: string;
      [key: string]: any;
    }
  ) => Promise<MCPToolResult>;
}

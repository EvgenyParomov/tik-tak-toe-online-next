import { NextRequest } from "next/server";

export const sseStream = (req: NextRequest) => {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const write = (data: unknown) =>
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

  const addCloseListener = (onDisconnet: () => void) =>
    void req.signal.addEventListener("abort", () => {
      onDisconnet();
    });

  const response = new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });

  const close = () => {
    writer.close();
  };

  return {
    response,
    write,
    close,
    addCloseListener,
  };
};

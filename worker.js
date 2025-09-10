// worker.js
// Minimal image beacon Worker
// URL format: /signal/<payload>.gif

const GIF_1X1 = Uint8Array.from([
  71,73,70,56,57,97,1,0,1,0,128,0,0,0,0,0,
  255,255,255,33,249,4,1,0,0,1,0,44,0,0,0,
  0,1,0,1,0,0,2,2,68,1,0,59
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const m = url.pathname.match(/^\/signal\/([^/]+)\.gif$/i);

    if (m) {
      const payload = decodeURIComponent(m[1]);

      // Forward notification (example: ntfy topic, replace YOUR_TOPIC)
      await fetch("https://ntfy.sh/signal-test123", {
        method: "POST",
        body: `signal: ${payload} @ ${new Date().toISOString()}`
      });

      return new Response(GIF_1X1, {
        headers: {
          "content-type": "image/gif",
          "cache-control": "no-store"
        }
      });
    }

    return new Response("OK");
  }
};

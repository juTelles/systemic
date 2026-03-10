import { createApp } from "./src/index.js";

const PORT = process.env.PORT || 3001;

const app = createApp();

app.listen(PORT, () => {
  console.log(`[server] listening on :${PORT}`);
});

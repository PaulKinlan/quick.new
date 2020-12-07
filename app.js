// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
import express from "express";

import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(join(__dirname,"build", "client"), { maxAge: '1h'}));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/:actions/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/:actions/sw.js", (request, response) => {
  response.sendFile(__dirname + "/build/client/sw.js");
});

app.get("/:actions/launch", (request, response) => {
  response.redirect(request.query.url);
});

// send the default array of dreams to the webpage
app.get("/:actions/manifest.json", (request, response) => {
  // express helps us take JS objects and send them as JSON
  let buff = Buffer.from(request.params.actions, "base64");
  let actions = JSON.parse(buff.toString("ascii"));

  const shortcuts = actions.map(({ name, url }) => {
    return {
      name,
      url: `/${request.params.actions}/launch?url=${url}`,
      icons: [
        {
          src: "ic_launcher-96.png",
          sizes: "96x96",
          purpose: "any",
          type: "image/png",
        },
      ],
    };
  });

  response.json({
    name: "shortcut.cool",
    short_name: "shortcut.cool",
    background_color: "#E91E63",
    theme_color: "#E91E63",
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/images/ic_launcher.png",
        type: "image/png",
        purpose: "maskable",
      },
      {
        sizes: "512x512",
        src: "/images/web_hi_res_512.png",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: shortcuts,
    start_url: `/${request.params.actions}/`,
  });
});

// listen for requests :)
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running at on ${port}`);
});

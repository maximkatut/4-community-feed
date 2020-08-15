import path from "path";
import fs from "fs";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";

import App from "../src/containers/App";

const PORT = 8080;
const app = express();

app.use(express.static("./build"));

const helmet = Helmet.renderStatic();

app.get("/*", (req, res) => {
  const context = {};

  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve("./build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("something went wrong", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    data = data.replace(
      '<meta name="helmet"/>',
      `${helmet.title.toString()}${helmet.meta.toString()}`
    );

    return res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`SSR: http://localhost:${PORT}`);
});

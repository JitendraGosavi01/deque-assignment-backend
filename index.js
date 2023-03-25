import express from "express";
import cors from "cors";
const port = process.env.PORT || 3001;
import searchRoute from "./src/api/v1/route/searchRoute.js";
const app = express();

app.use(cors());

app.use("/api/v1/search", searchRoute);

app.listen(port, () => {
  console.log("server started on port", port);
});

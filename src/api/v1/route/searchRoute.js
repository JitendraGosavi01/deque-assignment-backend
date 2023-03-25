import express from "express";
import SearchController from "../controller/SearchController.js";
const searchRoute = express.Router();

searchRoute.get("/", (req, res, next) =>
  SearchController.getSearchData(req, res, next)
);

export default searchRoute;

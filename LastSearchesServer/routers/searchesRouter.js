const express = require("express");
const mongoose = require("mongoose");
const searchesBLL = require("../BLL/searchesBLL");
const VALIDATION_ERROR_CODE = require("../globals").VALIDATION_ERROR_CODE;
const CONNECTED_MONGOOSE_CODE = require("../globals").CONNECTED_MONGOOSE_CODE;
const router = express.Router();

router.get("/hello", async (req, res) => {
  try {
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/lastSearch", async (req, res) => {
  try {
    const searchObj = req.body;
    await searchesBLL.addLastSearch(searchObj);
    res.status(201).send();
  } catch (error) {
    if (error.name == VALIDATION_ERROR_CODE)
      res.status(400).send(error.message);

    res.status(500).send(error.message);
  }
});

router.get("/health", async (req, res) => {
  try {
    const db = mongoose.connection;
    if (db.readyState === CONNECTED_MONGOOSE_CODE) {
      res.status(200).send();
    } else {
      res.status(500).send("Your connection to DB is not OK");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/lastSearches", async (req, res) => {
  try {
    const filters = req.query;
    const result = await searchesBLL.getLastSearchesByUserId(filters);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/mostPopular", async (req, res) => {
  try {
    const { limit } = req.query;
    if (!limit) res.status(400).send("Please set a limit");
    const result = await searchesBLL.getMostPopularSearches(limit);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

const mongoose = require("mongoose");

const searchesSchema = new mongoose.Schema(
  {
    searchPharse: { type: String, required: true },
    userId: { type: Number, required: true },
    searchedAt: { type: Date, required: true, default: Date.now },
  },
  { versionKey: false }
);

const Search = mongoose.model("search", searchesSchema);

module.exports = Search;

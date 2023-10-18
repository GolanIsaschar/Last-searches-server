const Search = require("../models/searchesModel");

const addLastSearch = async (searchObj) => {
  const search = new Search(searchObj);
  await search.save();
};

const getLastSearchesByUserId = async (filters) => {
  const { userId, limit } = filters;
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const lastSearchesFromLastTwoWeeks = await Search.find({
    userId,
    searchedAt: { $gt: twoWeeksAgo },
  })
    .sort({ searchedAt: -1 })
    .limit(limit);

  const lastSearchesPharseArray = lastSearchesFromLastTwoWeeks.map(
    (search) => search.searchPharse
  );
  return lastSearchesPharseArray;
};

const getMostPopularSearches = async (limit) => {
  const oneWeeksAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const lastSearchesFromLastWeek = await Search.find({
    searchedAt: { $gt: oneWeeksAgo },
  });

  const lastSearchDic = {};

  lastSearchesFromLastWeek.forEach((search) => {
    let lastSearchObj = {};

    if (lastSearchDic[search.searchPharse]) {
      lastSearchDic[search.searchPharse].hits++;
    } else {
      lastSearchObj.searchPharse = search.searchPharse;
      lastSearchObj.hits = 1;
      lastSearchDic[search.searchPharse] = lastSearchObj;
    }
  });

  const lastSearchArray = Object.values(lastSearchDic);
  lastSearchArray.sort((a, b) => (a.hits > b.hits ? -1 : 1));
  const limitedLastSearchArray = lastSearchArray.slice(0, limit);

  return limitedLastSearchArray;
};

module.exports = {
  addLastSearch,
  getLastSearchesByUserId,
  getMostPopularSearches,
};

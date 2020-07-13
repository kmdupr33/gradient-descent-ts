const csv = require("async-csv");
const fs = require("fs").promises;

const getData = async () => {
  const csvString = await fs.readFile("./video-game-sales.csv");
  const rows = await csv.parse(csvString);
  return rows
    .slice(1)
    .map((row) => ({
      criticScore: parseInt(row[10]),
      globalSales: parseFloat(row[9]),
    }))
    .filter(({ criticScore, globalSales }) => criticScore && globalSales)
    .filter(({ globalSales }) => globalSales < 10);
};

module.exports = { getData };

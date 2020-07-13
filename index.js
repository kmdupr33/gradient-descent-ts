const { getData } = require("./getData");

const makeModel = (data, learningRate, iterations) => {
  let m = 0;
  let b = 0;
  for (let i = 0; i < iterations; i++) {
    const mGrad =
      data.reduce(
        (acc, { criticScore, globalSales }) =>
          acc + (m * criticScore + b - globalSales) * criticScore,
        0
      ) / data.length;
    const bGrad =
      data.reduce(
        (acc, { criticScore, globalSales }) =>
          acc + (m * criticScore + b - globalSales),
        0
      ) / data.length;
    m -= mGrad * learningRate;
    b -= bGrad * learningRate;
  }
  return { m, b, predict: (criticScore) => m * criticScore + b };
};

(async () => {
  const data = await getData();
  const { m, b, predict } = makeModel(data, 0.0003, 1000000);
  console.log(m);
  console.log(b);
  console.log(predict(99));
})();

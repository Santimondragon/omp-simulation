import { LICENSE } from "../constants";

const getTotalvalue = (list, attribute) => {
  return list.map((e) => [e.name, e[attribute]]);
};

const simulateInvestment = (
  licenses,
  withdrawlAmount = 1,
  withdrawlMonths = [16],
  monthlyYield = 0.091
) => {
  const { DURATION, COST, WITHDRWAL_FEE } = LICENSE;

  const simulations = licenses.map((license) => {
    const total = license.value + COST;
    let revenue =
      license.value * Math.pow(1 + monthlyYield, DURATION) - license.value;
    if (revenue > license.value * 3) revenue = license.value * 3;
    const profit = revenue * (1 - WITHDRWAL_FEE);

    return {
      name: license.name,
      license: license.value,
      total,
      revenue,
      profit,
    };
  });

  const allLicenses = getTotalvalue(simulations, "license");
  const total = getTotalvalue(simulations, "total");
  const revenue = getTotalvalue(simulations, "revenue");
  const profit = getTotalvalue(simulations, "profit");

  const getProfitPercentage = () => {
    const totalInvestmet = total.reduce(
      (partialSum, a) => partialSum + a[1],
      0
    );
    const totalProfit = profit.reduce((partialSum, a) => partialSum + a[1], 0);
    return (totalProfit - totalInvestmet) / totalInvestmet;
  };

  const getAnnualReturn = () => (getProfitPercentage() * 12) / 16;

  return {
    license: allLicenses,
    total,
    revenue,
    profit,
    profitPercentage: getProfitPercentage(),
    annualReturn: getAnnualReturn(),
  };
};

export default simulateInvestment;

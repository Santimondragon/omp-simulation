import React, { useState, useEffect } from "react";
import { LICENSE } from "../../constants";
import { SimulationContainer } from "./styles";

const simulateInvestment = (
  license,
  withdrawlAmount = 1,
  withdrawlMonths = [16],
  monthlyYield = 0.091
) => {
  const { DURATION, COST, TRANSACTION_FEE, WITHDRWAL_FEE } = LICENSE;
  const investment = license.value + COST + TRANSACTION_FEE;
  let revenue =
    license.value * Math.pow(1 + monthlyYield, DURATION) - license.value;
  const profit = revenue * (1 - WITHDRWAL_FEE);
  const profitPercentage = `${((profit - investment) / investment) * 100}%`;

  return {
    license: license.value,
    investment,
    revenue,
    profit,
    profitPercentage,
  };
};

const Simulation = ({ selectedLicense }) => {
  const [simulation, setSimulation] = useState({});
  const [withdrawlsAmount, setWithdrawlsAmount] = useState(1);
  const [withdrawlMonths, setWithdrawlMonths] = useState([16]);
  const [monthlyYield, setMonthlyYield] = useState(0.091);

  useEffect(() => {
    if (withdrawlsAmount > 16) setWithdrawlsAmount(14);
    const defaultArrayMonths = [
      ...Array(Number.parseInt(withdrawlsAmount)).keys(),
    ];
    const terms = 16 / defaultArrayMonths.length;
    setWithdrawlMonths(
      defaultArrayMonths.map((num) => Number.parseInt((num + 1) * terms))
    );
  }, [withdrawlsAmount]);

  useEffect(() => {
    setSimulation(
      simulateInvestment(
        selectedLicense,
        withdrawlsAmount,
        withdrawlMonths,
        monthlyYield
      )
    );
  }, [selectedLicense, withdrawlsAmount, withdrawlMonths, monthlyYield]);

  const numFormat = (num, unit = "$") => {
    if (unit === "%")
      return (Number.parseFloat(num) / 100).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
      });
    return Number.parseFloat(num).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const resetValue = () => {
    setWithdrawlsAmount(1);
    setWithdrawlMonths([16]);
    setMonthlyYield(0.091);
  };

  const onChangeWithdrawlMonth = (value, index) => {
    const newValue = Number.parseInt(value);

    if (!withdrawlMonths.includes(newValue)) {
      setWithdrawlMonths((state) =>
        state.map((val, i) => (i !== index ? val : Number.parseInt(newValue)))
      );
    }
  };

  const renderWithdrawlMonths = () =>
    withdrawlMonths.map((elem, index) => {
      const isLastMonth = index + 1 === withdrawlMonths.length;
      return (
        <article key={elem}>
          {isLastMonth ? (
            <span>{elem}</span>
          ) : (
            <select
              value={elem}
              onChange={(e) => onChangeWithdrawlMonth(e.target.value, index)}
            >
              {[...Array(16).keys()].map((e) => {
                const val = e + 1;
                return (
                  <option key={val} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          )}
        </article>
      );
    });

  return (
    <SimulationContainer>
      <section className="summary">
        <article className="withdrawls">
          <label className="amount-label" htmlFor="amount">
            Amount of Withdrawls
          </label>
          <input
            type="number"
            className="amount"
            min={1}
            max={14}
            value={withdrawlsAmount}
            onChange={(e) => setWithdrawlsAmount(e.target.value)}
          />
        </article>
        <article className="numbers">
          <div className="investment">
            <span>Investment:</span>
            <span>{numFormat(simulation.investment)}</span>
          </div>
          <div className="revenue">
            <span>Revenue:</span>
            <span>{numFormat(simulation.revenue)}</span>
          </div>
          <div className="profit">
            <span>Profit:</span>
            <span>{numFormat(simulation.profit)}</span>
          </div>
          <div className="profitPercentage">
            <span>Profit Percetange:</span>
            <span>{numFormat(simulation.profitPercentage, "%")}</span>
          </div>
        </article>
        <button onClick={resetValue}>RESET DEFAULT VALUES</button>
      </section>
      <section className="details">
        <h2 className="title">Withdrawl's Details</h2>
        {renderWithdrawlMonths()}
      </section>
    </SimulationContainer>
  );
};

export default Simulation;

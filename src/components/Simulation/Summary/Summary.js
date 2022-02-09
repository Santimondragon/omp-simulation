import React, { useState, useEffect } from "react";
import formatNumber from "../../../utils/formatNumber";
import { LICENSE } from "../../../constants";
import simulateInvestment from "../../../utils/simulateInvestment";
import {
  MonthlyYieldContainer,
  SummaryContainer,
  SummaryItem,
} from "../styles";

const Summary = ({ selectedLicenses }) => {
  const [simulation, setSimulation] = useState([]);
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
      Object.entries(
        simulateInvestment(
          selectedLicenses,
          withdrawlsAmount,
          withdrawlMonths,
          monthlyYield
        )
      )
    );
  }, [selectedLicenses, withdrawlsAmount, withdrawlMonths, monthlyYield]);

  const renderExpectedMontlyYield = () => {
    return (
      <MonthlyYieldContainer>
        <header>
          <span className="title">Expected Monthly Yield</span>
        </header>
        <div className="inputWrapper">
          <input
            type="range"
            min={0.08}
            max={0.1}
            step={0.001}
            value={monthlyYield}
            onChange={(e) => setMonthlyYield(Number.parseFloat(e.target.value))}
          />
          <span className="yield">
            {Number.parseFloat(monthlyYield * 100).toFixed(1)}%
          </span>
        </div>
      </MonthlyYieldContainer>
    );
  };

  const renderInvestmentSummary = () =>
    simulation.map((e) => {
      const reference = e[0];
      let values = e[1];
      const valuesIsArray = Array.isArray(values);
      const refIsLicense = reference === "license";
      const refIsInvestment = reference === "investment";
      const shouldRenderDetails =
        valuesIsArray && (refIsLicense || refIsInvestment);
      const unit = valuesIsArray ? "$" : "%";
      const total = valuesIsArray
        ? values.reduce((partialSum, a) => partialSum + a[1], 0)
        : e[1];

      if (shouldRenderDetails) {
        values.sort((a, b) => a[1] - b[1]);
        const ocurrences = [...new Set(values.map((e) => e[0]))];
        values = ocurrences.map((e) => {
          return [
            ...values.find((val) => val[0] === e),
            values.filter((val) => val[0] === e).length,
          ];
        });
      }

      const renderDetails = (isInvestment) => {
        if (isInvestment && selectedLicenses.length > 0) {
          const feeValue = LICENSE.COST + LICENSE.TRANSACTION_FEE;
          const hasMoreThanOne = selectedLicenses.length > 1;
          const fee = `Fee${
            hasMoreThanOne ? `s (x${selectedLicenses.length})` : ""
          }`;
          const totalFee = feeValue * selectedLicenses.length;
          const license = `License${
            hasMoreThanOne ? `s (x${selectedLicenses.length})` : ""
          }`;
          const totalLicenses = total - totalFee;

          return (
            <>
              <div className="detail">
                <span>{fee}</span>
                <span>{formatNumber(totalFee)}</span>
              </div>
              <div className="detail">
                <span>{license}</span>
                <span>{formatNumber(totalLicenses)}</span>
              </div>
            </>
          );
        }

        return values.map((value) => {
          const isRepeated = value[2] && value[2] > 1;
          const item = `${value[0]} ${isRepeated ? `(x${value[2]})` : ""}`;
          const total = isRepeated ? value[1] * value[2] : value[1];

          return (
            <div key={item} className="detail">
              <span>{item}</span>
              <span>{formatNumber(total)}</span>
            </div>
          );
        });
      };

      return (
        <SummaryItem key={reference} className={reference}>
          {shouldRenderDetails && (
            <div className="details">
              {renderDetails(refIsInvestment, reference)}
            </div>
          )}
          <div className="total">
            <span>{reference}:</span>
            <span>{formatNumber(total, unit)}</span>
          </div>
        </SummaryItem>
      );
    });

  return (
    <>
      {renderExpectedMontlyYield()}
      <SummaryContainer>
        <header>
          <h3 className="title">Investment Summary</h3>
        </header>
        {renderInvestmentSummary()}
      </SummaryContainer>
    </>
  );
};

export default Summary;

// <div className="setYield">
//   {monthlyYield > 0.08 && (
//     <div className="remove" onClick={() => onChangeMonthlyYield("-")}>
//       -
//     </div>
//   )}
//   <div className="monthlyYield">
//     {Number.parseFloat(monthlyYield * 100).toFixed(1)}%
//   </div>
//   {monthlyYield < 0.1 && (
//     <div className="add" onClick={() => onChangeMonthlyYield("+")}>
//       +
//     </div>
//   )}
// </div>;

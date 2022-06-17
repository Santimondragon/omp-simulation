import React, { useState, useEffect } from "react";
import formatNumber from "../../../utils/formatNumber";
import { LICENSE } from "../../../constants";
import simulateInvestment from "../../../utils/simulateInvestment";
import {
  ModifiersContainer,
  MonthlyYieldContainer,
  SummaryContainer,
  SummaryItem,
} from "../styles";

const Summary = ({ selectedLicenses }) => {
  const [simulation, setSimulation] = useState([]);
  const [withdrawlsAmount, setWithdrawlsAmount] = useState(1);
  const [withdrawlMonths, setWithdrawlMonths] = useState([16]);
  const [monthlyYield, setMonthlyYield] = useState(0.091);
  const [transactionFee, setTransactionFee] = useState(36);

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

  const renderValueModifier = (
    title,
    state,
    setState,
    defaultValue,
    min,
    max,
    step,
    valueUnit
  ) => {
    return (
      <MonthlyYieldContainer>
        <header>
          <span className="title">{title}</span>
        </header>
        <div
          className="inputWrapper"
          onDoubleClick={(e) => setState(defaultValue)}
        >
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={state}
            onChange={(e) => setState(Number.parseFloat(e.target.value))}
          />
          <span className="yield">{formatNumber(state, valueUnit)}</span>
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
      const refIsInvestment = reference === "total";
      const shouldRenderDetails =
        valuesIsArray && (refIsLicense || refIsInvestment);
      const unit = valuesIsArray ? "$" : "%";
      let total = valuesIsArray
        ? values.reduce((partialSum, a) => partialSum + a[1], 0)
        : e[1];

      if (refIsInvestment) total += transactionFee;

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
          const feeValue = LICENSE.COST;
          const hasMoreThanOne = selectedLicenses.length > 1;
          const fee = `Licence Cost${
            hasMoreThanOne ? `s (x${selectedLicenses.length})` : ""
          }`;
          const totalFee = feeValue * selectedLicenses.length;
          const license = `Investment${
            hasMoreThanOne ? `s (x${selectedLicenses.length})` : ""
          }`;
          const totalLicenses = total - totalFee - transactionFee;

          return (
            <>
              <div className="detail">
                <span>Transaction Fee</span>
                <span>{formatNumber(transactionFee)}</span>
              </div>
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
      <ModifiersContainer>
        {renderValueModifier(
          "Monthly Yield",
          monthlyYield,
          setMonthlyYield,
          0.091,
          0.08,
          0.1,
          0.001,
          "%"
        )}
        {renderValueModifier(
          "Transaction Fee",
          transactionFee,
          setTransactionFee,
          36,
          0,
          100,
          1,
          "$"
        )}
      </ModifiersContainer>
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

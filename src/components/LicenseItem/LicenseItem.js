import React from "react";
import { LicenseItemContainer } from "./styles";

const LicenseItem = ({ license, addLicense, removeLicense, selectedAmount }) => {
  const { name, value } = license;
  const isSelected = selectedAmount >= 1;

  return (
    <LicenseItemContainer isSelected={isSelected}>
      <article className="logo"></article>
      <article className="data">
        <span className="value">${value}</span>
        <span className="name">{name}</span>
      </article>
      <article className="setAmount">
        {isSelected && (
          <>
            <div className="remove" onClick={() => removeLicense(license)}>
              -
            </div>
            <div className="amount">{selectedAmount}</div>
          </>
        )}
        <div className="add" onClick={() => addLicense(license)}>
          +
        </div>
      </article>
    </LicenseItemContainer>
  );
};

export default LicenseItem;

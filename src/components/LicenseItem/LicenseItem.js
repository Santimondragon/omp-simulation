import React from "react";
import { LicenseItemContainer } from "./styles";

const LicenseItem = ({
  license,
  addLicense,
  removeLicense,
  selectedAmount,
  isModifiedable,
}) => {
  const { name, value } = license;
  const isSelected = selectedAmount >= 1;

  if (selectedAmount === 0 && isModifiedable) return <></>;

  return (
    <LicenseItemContainer
      isSelected={isSelected}
      isModifiedable={isModifiedable}
    >
      <article className="logo">
        <img src={`/assets/${value}.png`} alt={`${name} badge`} />
      </article>
      <article className="data">
        <span className="value">${value}</span>
        <span className="name">{name}</span>
      </article>
      <article className="setAmount">
        {(isSelected || isModifiedable) && (
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

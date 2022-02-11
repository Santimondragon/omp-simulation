/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import formatNumber from "../../../utils/formatNumber";
import { LicenseItem, NetworkViewContainer, RowLevel } from "../styles";

const NetworkView = ({ selectedLicenses }) => {
  const [toBeAddLicenses, setToBeAddLicenses] = useState(selectedLicenses);
  const [mainLicense, setMainLicense] = useState(null);
  const [downline, setDownline] = useState([
    [...Array(2)],
    [...Array(4)],
    [...Array(8)],
    [...Array(16)],
    [...Array(32)],
  ]);

  useEffect(() => {
    if (mainLicense) {
      setMainLicense((state) => {
        return {
          ...state,
          salesCommission: formatNumber(getSalesCommission(downline), "$"),
          networkCommission: formatNumber(getNetworkCommission(downline), "$"),
          totalCommision: formatNumber(
            getNetworkCommission(downline) + getSalesCommission(downline),
            "$"
          ),
        };
      });
    }

    if (toBeAddLicenses.length === 0) {
      setDownline(
        downline.map((level) =>
          level.map((license) => {
            if (license === undefined) return "none";
            return license;
          })
        )
      );
    }
  }, [toBeAddLicenses]);

  const getSideVolume = (array, side, depth = -1) => {
    return array
      .map((level, index) => {
        const half = Math.ceil(level.length / 2);
        if (index >= depth + 2) {
          if (side === "left") {
            return level.slice(0, half);
          } else if (side === "rigth") return level.slice(-half);
        }
        return "none";
      })
      .flat()
      .filter((e) => e !== undefined)
      .filter((e) => e !== "none")
      .map((e) => e.value)
      .reduce((partialSum, a) => partialSum + a, 0);
  };

  const getNetworkCommission = (array) => {
    const rigth = getSideVolume(array, "rigth");
    const left = getSideVolume(array, "left");

    if (rigth >= left) return left / 10;
    return rigth / 10;
  };

  const getSalesCommission = (array) => {
    const flatDownline = array
      .flat()
      .filter((e) => e !== undefined)
      .filter((e) => e !== "none")
      .map((e) => e.value);
    const allSales = flatDownline.reduce((partialSum, a) => partialSum + a, 0);
    return allSales * 0.07;
  };

  const validateUndefinedValue = (prev, current) => {
    if (!prev) return true;
    if (current.every((e) => e === "none")) return false;

    const hashmap = prev.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    if (!hashmap["undefined"]) return true;
    return prev.length / 2 >= hashmap["undefined"];
  };

  const onSelectLicense = (e, licenseObject) => {
    const objectLicense = JSON.parse(e.target.value);
    const { depth, isMain, index } = licenseObject;

    if (isMain) {
      setMainLicense(objectLicense);
    } else {
      const updatedDownline = [...downline];
      updatedDownline[depth][index] = objectLicense;
      setDownline(updatedDownline);
    }

    setToBeAddLicenses((state) => {
      const index = state.map((e) => e.name).indexOf(objectLicense.name);
      return state.filter((e, i) => i !== index);
    });
  };

  const renderLicenseItem = (licenseObject) => {
    const { license, isSelectable, isMain, index } = licenseObject;

    const renderLicense = (renderedLicense) => {
      return (
        <article className="logo">
          <img
            src={`/assets/${renderedLicense?.value}.png`}
            alt={`${renderedLicense?.name} badge`}
          />
        </article>
      );
    };

    const renderSelect = () => {
      return (
        <select value="" onChange={(e) => onSelectLicense(e, licenseObject)}>
          <option value="" hidden>
            License
          </option>
          {toBeAddLicenses.map((e, index) => (
            <option key={`${index}-${e.name}`} value={JSON.stringify(e)}>
              {index + 1}. {e.name} - {formatNumber(e.value, "$")}
            </option>
          ))}
        </select>
      );
    };

    if (isMain) {
      return (
        <LicenseItem>
          {mainLicense ? (
            <>
              {renderLicense(mainLicense)}
              <article className="commissions">
                <header>
                  <span className="title">Commissions</span>
                </header>
                <div className="details">
                  <div className="detail">
                    <span>Sales</span>
                    <span>{mainLicense.salesCommission}</span>
                  </div>
                  <div className="detail">
                    <span>Network</span>
                    <span>{mainLicense.networkCommission}</span>
                  </div>
                </div>
                <div className="total">
                  <span>Total:</span>
                  <span>{mainLicense.totalCommision}</span>
                </div>
              </article>
            </>
          ) : (
            renderSelect()
          )}
        </LicenseItem>
      );
    }

    return (
      <LicenseItem key={index}>
        {!isSelectable && license !== "none"
          ? renderLicense(license)
          : toBeAddLicenses.length
          ? renderSelect()
          : "-"}
      </LicenseItem>
    );
  };

  const renderLevels = () => {
    const mainLicenseObject = {
      isSelectable: true,
      isMain: true,
    };

    return (
      <>
        <RowLevel amount={1}>{renderLicenseItem(mainLicenseObject)}</RowLevel>
        {mainLicense &&
          downline.map(
            (level, depth) =>
              validateUndefinedValue(downline[depth - 1], level) && (
                <RowLevel
                  key={level.length / 2}
                  level={level.length / 2}
                  amount={level.length}
                >
                  {level.map((license, index) => {
                    const licenseObject = {
                      depth: depth,
                      license: license,
                      isSelectable: !license,
                      isMain: false,
                      index: index,
                    };

                    return renderLicenseItem(licenseObject);
                  })}
                </RowLevel>
              )
          )}
      </>
    );
  };

  return (
    <NetworkViewContainer>
      <header>
        <h3 className="title">Network View</h3>
      </header>
      <div className="tree">{renderLevels()}</div>
    </NetworkViewContainer>
  );
};

export default NetworkView;

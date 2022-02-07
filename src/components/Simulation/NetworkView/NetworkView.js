import React, { useState, useEffect } from "react";
import { NetworkViewContainer, RowLevel } from "../styles";

const calculateLevelsAmount = (licenses) => {
  if (licenses === 1) return 1;
  if (licenses >= 2 && licenses < 4) return 2;
  if (licenses >= 4 && licenses < 8) return 3;
  if (licenses >= 8 && licenses < 16) return 4;
  if (licenses >= 16 && licenses < 32) return 5;
  return 6;
};

const getLevelDetails = (level) => {
  const levelData = (level, licenseAmount) => {
    return { level, licenseAmount };
  };
  if (level === 1) return levelData(1, 1);
  if (level === 2) return levelData(2, 2);
  if (level === 3) return levelData(3, 4);
  if (level === 4) return levelData(4, 8);
  if (level === 5) return levelData(5, 16);
  return levelData(6, 32);
};

const test = {
  license: "light",
  value: 1000,
  downline: [
    {
      license: "light",
      value: 1000,
      downline: [
        {
          license: "light",
          value: 1000,
          downline: [],
        },
        {
          license: "light",
          value: 1000,
          downline: [],
        },
      ],
    },
    {
      license: "light",
      value: 1000,
      downline: [
        {
          license: "light",
          value: 1000,
          downline: [],
        },
        {
          license: "light",
          value: 1000,
          downline: [],
        },
      ],
    },
  ],
};

const NetworkView = ({ selectedLicenses }) => {
  const [levels, setLevels] = useState({});
  const [networkTree, setNetworkTree] = useState({});

  useEffect(() => {
    setLevels(calculateLevelsAmount(selectedLicenses.length));
  }, [selectedLicenses]);

  const renderLevels = () => {
    const levelsArray = [...Array(levels).keys()];
    return levelsArray.map((e) => {
      const { level, licenseAmount } = getLevelDetails(e + 1);
      const amountArray = [...Array(licenseAmount).keys()];
      return (
        <RowLevel key={level} amount={licenseAmount}>
          {amountArray.map((e) => (
            <div key={e+level} className="license">
              {e + 1}
            </div>
          ))}
        </RowLevel>
      );
    });
  };

  return (
    <NetworkViewContainer>
      <h3>Network View</h3>
      <div className="tree">{renderLevels()}</div>
    </NetworkViewContainer>
  );
};

export default NetworkView;

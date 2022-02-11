/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { MonthlyViewContainer } from "../styles";

const MonthlyView = ({ selectedLicense }) => {

  return (
    <MonthlyViewContainer>
      <header>
        <h3 className="title">Monthly View</h3>
      </header>
    </MonthlyViewContainer>
  );
};

export default MonthlyView;

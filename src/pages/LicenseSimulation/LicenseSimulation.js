import React, { useState } from "react";
import { LICENSE } from "../../constants";
import SimulatorContainer, { LicenseListContainer, DetailsContainer } from "./styles";
import LicenseItem from "../../components/LicenseItem";
import Simulation from "../../components/Simulation";

const List = () => {
  const { LIST } = LICENSE;
  const [selectedLicenses, setSelectedLicenses] = useState([]);

  const addLicense = (license) => {
    setSelectedLicenses(state => [...state, license])
  }

  const removeLicense = (license) => {
    setSelectedLicenses(state => {
      const index = state.map(e => e.name).lastIndexOf(license.name);
      return state.filter((e, i) => i !== index);
    });
  }

  return (
    <SimulatorContainer>
      <LicenseListContainer>
        {LIST.map((license) => (
          <LicenseItem
            key={license.id}
            license={license}
            addLicense={addLicense}
            removeLicense={removeLicense}
            selectedAmount={
              selectedLicenses.filter((e) => e === license).length
            }
          />
        ))}
        <article className="actions">
          <button className="clear" onClick={() => setSelectedLicenses([])}>
            Clear
          </button>
          <button className="simulate" onClick={() => alert("Simulating")}>Start Simulation</button>
        </article>
      </LicenseListContainer>
      <DetailsContainer>
        <Simulation selectedLicense={selectedLicenses} />
      </DetailsContainer>
    </SimulatorContainer>
  );
};

export default List;

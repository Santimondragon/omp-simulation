import React, { useState } from "react";
import { LICENSE } from "../../constants";
import SimulatorContainer, {
  LaunchSimulationBtn,
  LicenseListContainer,
  DetailsContainer,
} from "./styles";
import LicenseItem from "../../components/LicenseItem";
import Summary from "../../components/Simulation/Summary";
import NetworkView from "../../components/Simulation/NetworkView";

const List = () => {
  const { LIST } = LICENSE;
  const [selectedLicenses, setSelectedLicenses] = useState([]);
  const [simulatedLicenses, setSimulatedLicenses] = useState([]);
  const [shouldFinishSimulation, setShouldFinishSimulation] = useState(false);
  const shouldRenderDetails = simulatedLicenses.length > 0;

  const addLicense = (license) => {
    if (shouldFinishSimulation) return;
    setSelectedLicenses((state) => [...state, license]);
  };

  const removeLicense = (license) => {
    if (shouldFinishSimulation) return;
    setSelectedLicenses((state) => {
      const index = state.map((e) => e.name).lastIndexOf(license.name);
      return state.filter((e, i) => i !== index);
    });
  };

  const onLaunchSimulation = () => {
    if (selectedLicenses.length === 0) return;
    if (shouldFinishSimulation) {
      setShouldFinishSimulation(false);
      setSelectedLicenses([]);
      return setSimulatedLicenses([]);
    }
    setShouldFinishSimulation(true);
    setSimulatedLicenses(selectedLicenses);
  };

  return (
    <SimulatorContainer>
      <section className="col">
        <LicenseListContainer>
          <header>
            <h3 className="title">Licenses</h3>
          </header>
          {LIST.map((license) => (
            <LicenseItem
              key={license.id}
              license={license}
              addLicense={addLicense}
              removeLicense={removeLicense}
              isModifiedable={shouldFinishSimulation}
              selectedAmount={
                selectedLicenses.filter((e) => e === license).length
              }
            />
          ))}
          <footer className="actions">
            <LaunchSimulationBtn
              disabled={selectedLicenses.length === 0}
              shouldFinish={shouldFinishSimulation}
              onClick={() => onLaunchSimulation()}
            >
              {shouldFinishSimulation
                ? "Finish Simulation"
                : "Start Simulation"}
            </LaunchSimulationBtn>
          </footer>
        </LicenseListContainer>
        {shouldRenderDetails && (
          <Summary selectedLicenses={simulatedLicenses} />
        )}
      </section>
      {shouldRenderDetails && (
        <DetailsContainer>
          <NetworkView selectedLicenses={simulatedLicenses} />
        </DetailsContainer>
      )}
    </SimulatorContainer>
  );
};

export default List;

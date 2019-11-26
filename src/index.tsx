import * as React from "react";
import { render } from "react-dom";
import uuid from "uuid";
import { getCows, CowI, addCow } from "./service";

import "./styles.css";

interface CowComponentProps {
  cow: CowI;
  setActiveCow: (cow: CowI) => void;
}

interface InputCowComponentProps {
  saveCow: (CowI) => void;
}

interface CurrentCowComponentProps {
  cow: CowI;
  toggleCowDisplay: (boolean) => void;
}

const initialCow: CowI = {
  cowName: "",
  cowDescription: ""
};

const fetchCows = async updateCows => {
  const cows = await getCows();
  console.log(cows);
  updateCows(cows);
};

const CurrentCow: React.FunctionComponent<CurrentCowComponentProps> = ({
  cow,
  toggleCowDisplay
}) => {
  return (
    <div id="current-cow">
      <h1>{cow.cowName}</h1>
      <h3>{cow.cowDescription}</h3>
      <button onClick={() => toggleCowDisplay(false)}>Close</button>
    </div>
  );
};

const handleNameChange = (updateCurrentCow, currentCow) => event => {
  const nextCow = { ...currentCow };
  nextCow.cowName = event.target.value;
  updateCurrentCow(nextCow);
};
const handleDescriptionChange = (updateCurrentCow, currentCow) => event => {
  const nextCow = { ...currentCow };
  nextCow.cowDescription = event.target.value;
  updateCurrentCow(nextCow);
};

const InputCow: React.FunctionComponent<InputCowComponentProps> = ({
  saveCow
}) => {
  const [currentCow, updateCurrentCow] = React.useState(initialCow);

  return (
    <div id="input-container">
      <input
        onChange={handleNameChange(updateCurrentCow, currentCow)}
        placeholder="cow name"
        value={currentCow.cowName}
      />
      <input
        onChange={handleDescriptionChange(updateCurrentCow, currentCow)}
        placeholder="cow description"
        value={currentCow.cowDescription}
      />
      <button
        onClick={() => {
          saveCow(currentCow);
          updateCurrentCow(initialCow);
        }}
        type="submit"
      >
        Save
      </button>
    </div>
  );
};

const Cow: React.FunctionComponent<CowComponentProps> = ({
  cow,
  setActiveCow
}) => {
  return (
    <div onClick={() => setActiveCow(cow)} className="cow">
      <h1>{cow.cowName}</h1>
      <h3>{cow.cowDescription}</h3>
    </div>
  );
};

function App() {
  const [cows, updateCows] = React.useState([]);
  const [cowDisplayActive, toggleCowDisplay] = React.useState(false);
  const [activeCow, updateActiveCow] = React.useState(initialCow);
  React.useEffect(() => {
    fetchCows(updateCows);
  }, []);
  const saveCow = async (cow: CowI) => {
    console.log("Saving the cow");
    await addCow({ id: uuid.v4(), cow });
    await fetchCows(updateCows);
  };
  const setActiveCow = (cow: CowI) => {
    updateActiveCow(cow);
    toggleCowDisplay(true);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {cowDisplayActive && (
        <CurrentCow cow={activeCow} toggleCowDisplay={toggleCowDisplay} />
      )}
      <InputCow saveCow={saveCow} />
      <div id="cows-list">
        {cows.map(cow => (
          <Cow cow={cow} setActiveCow={setActiveCow} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

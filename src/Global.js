import React from "react";

const globalState = {
  current_page: 1,
};

const globalStateContext = React.createContext(globalState);

const App = () => (
  <globalStateContext.Provider
    value={globalState}
  ></globalStateContext.Provider>
);

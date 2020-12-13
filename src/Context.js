// // setup Provider
// import { ContextProvider } from "./context";
//
// <ContextProvider>
//   <Root />
// </ContextProvider>

// // use in components
// import { Context } from "./Context";
// const [contextState, contextDispatch] = useContext(Context);

import React, { useReducer, createContext } from "react";

const initialState = {
  speed: 50,
  size: 100,

  string: "Hello UX",
  number: 80,
  boolean: true,
  color: "#2FA1D6",
};

function reducer(state, action) {
  switch (action.type) {
    case "setState": {
      return { ...state, ...action.data };
    }
    case "setSpeed": {
      return { ...state, speed: state.speed + action.data };
    }
    case "setSize": {
      return { ...state, size: state.size + action.data };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

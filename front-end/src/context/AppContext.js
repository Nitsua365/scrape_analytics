import React, { createContext, useContext, useState } from "react";

import io from 'socket.io-client';

const AppContext = createContext({});

const socket = io(`${process.env.REACT_APP_CONNECT_STRING}`, {
    transports: ['websocket', 'polling']
});

export function AppPageContext({ children }) {

  let StateInit = { socket }

  const [state, setState] = useState(StateInit)
  const setStateVar = (field, value) => setState({ ...state, [field]: value })

  return (
    <AppContext.Provider value={{ ...state, setStateVar }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}
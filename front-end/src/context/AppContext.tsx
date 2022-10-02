import React, { createContext, useContext, useState } from "react";

import { io, Socket } from "socket.io-client";

// App context type interface
interface AppContextInterface {
  socket: Socket;
  numberOfPoints: number;
}

// initialize context
const AppContext = createContext<AppContextInterface | Object>({});

// initialize transport socket
const socket: Socket = io(process.env.REACT_APP_CONNECT_STRING, {
    transports: ['websocket', 'polling']
});

export function AppPageContext({ children }) {

  // initalize interface
  const StateInit : AppContextInterface = { 
    socket,
    numberOfPoints: 50
  }

  // state variable containing our global state
  const [state, setState] = useState<Object>(StateInit)

  // Function to set state variable in global context
  const setStateVar : (field: string, value: number) => void = (field, value) => setState({ ...state, [field]: value })

  return (
    <AppContext.Provider value={{ ...state, setStateVar }}>
      {children}
    </AppContext.Provider>
  )

}

export function useAppContext() {
  return useContext(AppContext);
}
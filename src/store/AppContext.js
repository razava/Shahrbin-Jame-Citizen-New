import React, { useReducer } from "react";
import { reducer } from "./reducer";
import { LS } from "../utils/functions";
import { appConstants } from "../utils/variables";

const defaultState = {
  filters: {
    query: "",
    fromDate: "",
    toDate: "",
    categoryIds: [],
  },
  bottomSheet: {
    state: false,
    renderComponent: undefined,
    style: {},
    maxHeight: 0,
  },
  getAccesses: 1,
  quickAccesses: [],
  apps: [],
  news: [],
  categories: {},
  newMessagesCount: 0,
  user: {},
  refresh: false,
  initialData: {
    user: {},
    categories: {},
  },
  createRequest: {
    currentStep: 1,
    categories: {
      currentLevel: 1,
      currentNodes: [],
      navigationStack: [],
      tracks: [],
    },
  },
  instances: [],
  instance: null,
  sideMenu: true,
};

export const AppStore = React.createContext(defaultState);

const AppContext = ({ children }) => {
  const instance = LS.read(appConstants.SH_CT_INSTANCE);
  const initialState = { ...defaultState, instance };
  const value = useReducer(reducer, initialState);

  return (
    <>
      <AppStore.Provider value={value}>{children}</AppStore.Provider>
    </>
  );
};

export default AppContext;

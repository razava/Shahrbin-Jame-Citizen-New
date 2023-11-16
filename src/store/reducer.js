import { appActions } from "../utils/variables";

export const reducer = (state, action) => {
  switch (action.type) {
    case appActions.SET_FILTERS:
      return { ...state, filters: action.payload };
    case appActions.SET_BOTTOM_SHEET:
      return { ...state, bottomSheet: action.payload };
    case appActions.SET_QUICK_ACCESSES:
      return { ...state, quickAccesses: action.payload };
    case appActions.SET_APPS:
      return { ...state, apps: action.payload };
    case appActions.SET_ACCESSES:
      return { ...state, getAccesses: action.payload };
    case appActions.SET_NEWS:
      return { ...state, news: action.payload };
    case appActions.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case appActions.SET_NEW_MESSAGE_COUNT:
      return { ...state, newMessagesCount: action.payload };
    case appActions.SET_USER:
      return { ...state, user: action.payload };
    case appActions.SET_REFRESH:
      return { ...state, refresh: action.payload };
    case appActions.SET_INITIALDATA:
      return { ...state, initialData: action.payload };
    case appActions.SET_SIDEMENU:
      return { ...state, sideMenu: action.payload };
    case appActions.SET_CREATE_REQUEST: {
      return {
        ...state,
        createRequest: { ...state.createRequest, ...action.payload },
      };
    }
    case appActions.SET_INSTANCES:
      return { ...state, instances: action.payload };
    case appActions.SET_INSTANCE:
      return { ...state, instance: action.payload };

    default:
      throw new Error("unexpected action type");
  }
};

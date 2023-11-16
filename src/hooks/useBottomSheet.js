import { useContext } from "react";
import { AppStore } from "../store/AppContext";
import { appActions } from "../utils/variables";

const useBottomSheet = () => {
  // store
  const [store, dispatch] = useContext(AppStore);

  // functions
  const open = ({ renderComponent, style = {}, maxHeight } = {}) => {
    dispatch({
      type: appActions.SET_BOTTOM_SHEET,
      payload: {
        state: true,
        renderComponent,
        style,
        maxHeight,
      },
    });
  };

  const close = () => {
    dispatch({
      type: appActions.SET_BOTTOM_SHEET,
      payload: {
        state: false,
        renderComponent: undefined,
        style: {},
        maxHeight: 0,
      },
    });
  };

  return { open, close };
};

export default useBottomSheet;

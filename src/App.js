import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/Errors/ErrorBoundary";
import BottomSheet from "./components/BottomSheet/BottomSheet";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes/Routes";
import AppContext from "./store/AppContext";

const App = () => {
  return (
    <>
      <AppContext>
        <BrowserRouter>
          <BottomSheet />
          <ToastContainer rtl={true} theme="colored" />
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </BrowserRouter>
      </AppContext>
    </>
  );
};

export default App;

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/Errors/ErrorBoundary";
import BottomSheet from "./components/BottomSheet/BottomSheet";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes/Routes";
import AppContext from "./store/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContext>
          <BrowserRouter>
            <BottomSheet />
            <ToastContainer rtl={true} theme="colored" />
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </BrowserRouter>
        </AppContext>
      </QueryClientProvider>
    </>
  );
};

export default App;

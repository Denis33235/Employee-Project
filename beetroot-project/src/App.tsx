import { BrowserRouter } from "react-router-dom"
import { Routes as Route } from "./routes/Routes";
import { AuthContextProvider } from "./lib/context/AuthContext/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BrowserRouter>
            <Route />
          </BrowserRouter>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App

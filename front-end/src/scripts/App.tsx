import Header from "./header/Header";
import "../css/general.css";
import HomePage from "./pages/home-page/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./pages/auth-pages/LoginPage";
import { ToastContainer } from "react-toastify";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <ToastContainer />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;

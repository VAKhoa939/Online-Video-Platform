import Header from "./header/Header";
import "../css/general.css";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home-page/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./pages/auth-pages/LoginPage";
import { ToastContainer } from "react-toastify";
import RegisterPage from "./pages/auth-pages/RegisterPage";
import { COUNTDOWN } from "./utils/toast";
import UploadVideo from "./header/UploadVideo";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <ToastContainer theme="dark" autoClose={COUNTDOWN} />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/upload" element={<UploadVideo />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;

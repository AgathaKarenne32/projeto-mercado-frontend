import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { DraftProvider } from "./contexts/DraftContext.jsx"
import { ModalProvider } from "./contexts/ModalContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <DraftProvider>
          <ModalProvider>
            <AppRoutes />
          </ModalProvider>
        </DraftProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

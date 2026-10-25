import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import App from "./App.jsx";

// Login settings: all from .env, so going live = changing .env only
const oidcConfig = {
  authority: import.meta.env.VITE_HYDRA_URL, // where Hydra is (its "issuer")
  client_id: import.meta.env.VITE_CLIENT_ID, // which app we are
  redirect_uri: import.meta.env.VITE_REDIRECT_URI, // where Hydra sends us back
  scope: "openid offline", // who I am + stay logged in

  // After coming back from login, remove ?code=...&state=... from the address bar
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, "/");
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

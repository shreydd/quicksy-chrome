import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./lib/store.ts";
import { Toaster } from "@/components/ui/sonner"

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-center" richColors theme="light"/>
    </Provider>
  </React.StrictMode>
);

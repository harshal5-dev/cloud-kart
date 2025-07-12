import { createRoot } from "react-dom/client";
import CloudKartClient from "./CloudKartClient.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import "@ant-design/v5-patch-for-react-19";

import "./index.css";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <CloudKartClient />
    </BrowserRouter>
  </Provider>
);

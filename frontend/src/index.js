import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import store from './store'; // Import store Redux
import queryClient from './config/queryClient'; // Import client from React Query
import "./styles/output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

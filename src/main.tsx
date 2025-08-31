import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import BookmarkContextProvider from "./context/BookmarkContextProvider.tsx";
import ActiveIdContextProvider from "./context/ActiveIdContextProvider.tsx";
import SearchTextContextProvider from "./context/SearchTextContextProvider.tsx";
import JobItemsContextProvider from "./context/JobItemsContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarkContextProvider>
        <ActiveIdContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </ActiveIdContextProvider>
      </BookmarkContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

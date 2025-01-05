import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {DataProvider} from "./context/DataContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <DataProvider>
                    <App />
                </DataProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

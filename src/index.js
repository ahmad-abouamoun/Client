import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {SocketProvider} from "./context/SocketProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./App";
import { ImageProvider } from "./contexts/ImageContext";
import { DataProvider } from "./contexts/DataContext";
import { YouTubeProvider } from "./contexts/YouTubeContext";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <ImageProvider>
        <YouTubeProvider>
          <App />
        </YouTubeProvider>
      </ImageProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
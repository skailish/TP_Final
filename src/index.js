import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./App";
import { ImageProvider } from "./contexts/ImageContext";
import { DataProvider } from "./contexts/DataContext";
import { YouTubeProvider } from "./contexts/YouTubeContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MovieProvider } from "./contexts/MovieContext";
import { TvShowProvider } from "./contexts/TvShowContext";
import { PaginationProvider } from "./contexts/PaginationContext";
import { UserProvider } from "./contexts/UserContext";
import { FavsProvider } from "./contexts/FavsContext";
import { SearchProvider } from "./contexts/SearchContext";

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <FavsProvider>
        <MovieProvider>
          <TvShowProvider>
            <DataProvider>
              <ImageProvider>
                <YouTubeProvider>
                  <ThemeProvider>
                    <PaginationProvider>
                      <SearchProvider>
                        <App />
                      </SearchProvider>
                    </PaginationProvider>
                  </ThemeProvider>
                </YouTubeProvider>
              </ImageProvider>
            </DataProvider>
          </TvShowProvider>
        </MovieProvider>
      </FavsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

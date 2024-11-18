import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Welcome,
  OnePlayer,
  TwoPlayer,
  PlayGame,
  ErrorBoundary,
} from "./pages";

function App() {
  const { isGameReadyToPlay, isGameToPlay, mode } = useSelector(
    (state) => state.game
  );

  return (
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/vs-computer"
          element={
            isGameReadyToPlay && mode === "computer" ? (
              <OnePlayer />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/vs-computer/play"
          element={isGameToPlay ? <PlayGame /> : <Navigate to="/" />}
        />

        <Route
          path="/two-player"
          element={
            isGameReadyToPlay && mode === "two player" ? (
              <TwoPlayer />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/two-player/play"
          element={isGameToPlay ? <PlayGame /> : <Navigate to="/" />}
        />

        <Route path="*" element={<ErrorBoundary />} />
      </Routes>
    </main>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";

import {
  Welcome,
  OnePlayer,
  TwoPlayer,
  PlayGame,
  ErrorBoundary,
} from "./pages";

function App() {
  return (
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/one-player" element={<OnePlayer />} />
        <Route path="/two-player" element={<TwoPlayer />} />
        <Route path="/play" element={<PlayGame />} />

        <Route path="/404" element={<ErrorBoundary />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </main>
  );
}

export default App;

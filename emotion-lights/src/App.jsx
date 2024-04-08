import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AppleWatchLandingPage from "./pages/AppleWatchLandingPage";
import MinimalismLoginPage from "./pages/MinimalismLoginPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<AppleWatchLandingPage />} />
        <Route path="/login" element={<MinimalismLoginPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

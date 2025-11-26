import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import CodeReviewer from "./CodeReviewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<CodeReviewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

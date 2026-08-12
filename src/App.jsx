import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import CaseStudyLayout from "./layout/CaseStudyLayout";
import Home from "./pages/home/Home";
import CaseStudy from "./pages/case-studies/CaseStudy";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/case-studies" element={<CaseStudyLayout />}>
          <Route index element={<Navigate to="/#case-studies" replace />} />
          <Route path=":slug" element={<CaseStudy />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

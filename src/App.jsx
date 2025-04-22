import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

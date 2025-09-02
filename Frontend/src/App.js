import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AddStudent from "./Pages/AddStudent";
import Home from "./Pages/Home";
import ShowOne from "./Components/ShowOne";
import NotFound from "./Components/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/get/:id" element={<ShowOne />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

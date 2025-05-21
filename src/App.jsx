import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GlobalStyles from "./styles/GlobalStyles";
import Submitted from "./pages/Submitted";
import TooManyRequests from "./pages/TooManyRequests";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/submitted" element={<Submitted />} />
            <Route path="/too-many-requests" element={<TooManyRequests />} />
          </Routes>
        </AppLayout>
      </Router>
    </>
  );
}

export default App;

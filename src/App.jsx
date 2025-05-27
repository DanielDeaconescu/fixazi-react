import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GlobalStyles from "./styles/GlobalStyles";
import Submitted from "./pages/Submitted";
import TooManyRequests from "./pages/TooManyRequests";
import Cookies from "./pages/Cookies";
import Login from "./pages/Login"; // New
import Admin from "./pages/Admin"; // New
import ProtectedRoute from "./components/ProtectedRoute"; // New
import AuthInitializer from "./components/AuthInitializer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ChatProvider } from "./contexts/ChatContext";

function App() {
  return (
    <>
      <ChatProvider>
        <GlobalStyles />
        <HelmetProvider>
          <Router>
            <AuthInitializer />
            <AppLayout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/submitted" element={<Submitted />} />
                <Route
                  path="/too-many-requests"
                  element={<TooManyRequests />}
                />
                <Route path="/login" element={<Login />} /> {/* New */}
                {/* Protected Admin Route */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                {/* Optional: 404 catch-all */}
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </AppLayout>
          </Router>
        </HelmetProvider>
      </ChatProvider>
    </>
  );
}

export default App;

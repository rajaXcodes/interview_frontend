import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SessionProvider } from "./contexts/SessionContext";
import PrivateRoute from "./components/PrivateRoute";
import InterviewRoom from "./components/InterviewRoom";
import Login from "./components/Login"; 
import HeroPage from "./components/HeroPage"; 
import ProctoringAndRules from "./components/PreInterview";
import Dictaphone from "./components/ui/speaking";
import InterviewFeedback from "./components/endInterview";

export default function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/speak" element={< Dictaphone/>} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/pre"
              element={
                <PrivateRoute>
                  <ProctoringAndRules />
                </PrivateRoute>
              }
            />
            <Route
              path="/interview"
              element={
                <PrivateRoute>
                    <InterviewRoom />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <PrivateRoute>
                    <InterviewFeedback />
                </PrivateRoute>
              }
            />
            
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </AuthProvider>
  );
}

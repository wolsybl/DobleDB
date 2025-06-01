import { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboardExample";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  return showRegister ? (
    <Register onGoToLogin={() => setShowRegister(false)} />
  ) : (
    <Login
      onGoToRegister={() => setShowRegister(true)}
      onLoginSuccess={() => setIsLoggedIn(true)}
    />
  );
}

export default App;

import { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return showRegister ? (
    <Register onGoToLogin={() => setShowRegister(false)} />
  ) : (
    <Login onGoToRegister={() => setShowRegister(true)} />
  );
}

export default App;

import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from ".";
import LogInForm from "src/components/LogInForm/LogInForm";
import Home from "src/components/Home/Home";
import RegistrationForm from "src/components/RegistrationForm/RegistrationForm";

const App = () => {
  const store = useContext(Context);
  const [isAuthentication, setIsAuthentication] = useState(store.isAuth);

  useEffect(() => {
    store.subscribe("isAuth", (isAuth) => setIsAuthentication(isAuth));
    store.checkAuth();
  }, []);

  if (isAuthentication) {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    );
  }

  return (
      <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/authorization" element={<LogInForm />} />
        <Route path="*" element={<Navigate to="/authorization" />} />
      </Routes>
  );
}

export default App;

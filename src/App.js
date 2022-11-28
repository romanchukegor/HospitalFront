import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from ".";
import Authorization from "./components/Authorization/Authorization";
import Home from "./components/Home/Home";
import Registration from "./components/Registration/Registration";
import "./interceptors/axios";

function App() {
  const { store } = useContext(Context);
  const [isAuthic, setIsAuthic] = useState(store.isAuth);

  useEffect(() => {
    store.checkAuth();
    store.subscribe("isAuth", (params) => setIsAuthic(params));
  }, []);

  if (isAuthic) {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="*" element={<Navigate to="/authorization" />} />
      </Routes>
    </div>
  );
}

export default App;

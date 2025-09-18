import { Outlet } from "react-router";
import Header from "@components/Header";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default App;

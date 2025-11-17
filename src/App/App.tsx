import { Outlet } from "react-router";
import Header from "@components/Header";
import ModalProvider from "@context/modal/ModalProvider";
import "./App.css";

function App() {
  return (
    <div className="app">
      <ModalProvider>
        <Header />
        <Outlet />
      </ModalProvider>
    </div>
  );
}

export default App;

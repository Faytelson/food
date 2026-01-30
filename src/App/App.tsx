import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import ModalProvider from "@context/modal/ModalProvider";
import AuthProvider from "@context/auth/AuthProvider";
import "./App.css";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ModalProvider>
          <ScrollRestoration />
          <Header />
          <Outlet />
          <Footer />
        </ModalProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

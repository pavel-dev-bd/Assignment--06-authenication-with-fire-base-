import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col ">
      <Header />

      <main className="grow main-content ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
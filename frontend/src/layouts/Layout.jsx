import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Hero />

      <main className='container mx-auto py-10 flex-1'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import { useAppContext } from "./context/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";

const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<p>Home Page Content</p>} />
            <Route path='/search' element={<p>Search Page Content</p>} />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            {isLoggedIn && (
              <>
                <Route path='/add-hotel' element={<AddHotel />} />
                <Route path='/my-hotels' element={<MyHotels />} />
              </>
            )}

            <Route path='*' element={<p>404 - Page Not Found</p>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

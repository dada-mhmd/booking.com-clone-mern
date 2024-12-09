import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { useAppContext } from "../context/AppContext";
import * as apiClient from "../apiClient";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const { isLoading } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between items-center'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>Booking</Link>
        </span>

        <span className='flex space-x-2'>
          {!isLoading && (
            <>
              {isLoggedIn ? (
                <>
                  <Link
                    className='flex items-center text-blue-600 px-3 font-bold bg-gray-100 py-2 rounded hover:opacity-85'
                    to={"/my-bookings"}
                  >
                    My Bookings
                  </Link>
                  <Link
                    className='flex items-center text-blue-600 px-3 font-bold bg-gray-100 py-2 rounded hover:opacity-85'
                    to={"/my-hotels"}
                  >
                    My Hotels
                  </Link>
                  <LogoutBtn />
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='flex items-center text-blue-600 px-3 font-bold bg-gray-100 py-2 rounded hover:opacity-85'
                  >
                    Sign In
                  </Link>
                </>
              )}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;

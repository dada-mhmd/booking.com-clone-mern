import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../apiClient";
import { toast } from "react-hot-toast";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data } = useQuery("getMyHotels", apiClient.getMyHotels, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!data) {
    return <span>No hotels found..</span>;
  }

  return (
    <div className='space-y-5'>
      <span className='flex justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:opacity-85'
        >
          Add Hotel
        </Link>
      </span>

      <div className='grid grid-cols-1 gap-8'>
        {data?.map((hotel) => (
          <div
            key={hotel._id}
            className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'
          >
            <h2 className='text-xl font-bold'>{hotel.name}</h2>
            <p className='whitespace-pre-line'>{hotel.description}</p>
            <div className='grid grid-cols-5 gap-2'>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BsMap className='mr-1' />
                <span className='text-sm font-medium'>
                  {hotel.city}, {hotel.country}
                </span>
              </div>
              {/*  */}
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BsBuilding className='mr-1' />
                <span className='text-sm font-medium'>{hotel.type}</span>
              </div>
              {/*  */}
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiMoney className='mr-1' />
                <span className='text-sm font-medium'>
                  ${hotel.pricePerNight} / per night
                </span>
              </div>
              {/*  */}
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiHotel className='mr-1' />
                <span className='text-sm font-medium'>
                  {hotel.adultCount} adults, {hotel.childCount} children
                </span>
              </div>
              {/*  */}
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiStar className='mr-1' />
                <span className='text-sm font-medium'>
                  {hotel.starRating} stars
                </span>
              </div>
            </div>

            <span className='flex justify-end'>
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className='bg-blue-600 text-white text-lg font-medium p-2 hover:opacity-85'
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;

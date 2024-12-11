import { useFormContext } from "react-hook-form";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Guests</h2>

      <div className='grid grid-cols-2 p-6 gap-5 bg-gray-300'>
        <label className='text-gray-700 text-sm font-semibold'>
          Adults
          <input
            type='number'
            min={1}
            {...register("adultCount", { required: "Adult count is required" })}
            className='border rounded w-full py-2 px-3 font-normal'
          />
          {errors.adultCount && (
            <span className='text-red-500 text-xs'>
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        <label className='text-gray-700 text-sm font-semibold'>
          Children
          <input
            type='number'
            min={0}
            {...register("childCount", {
              required: "Children count is required",
            })}
            className='border rounded w-full py-2 px-3 font-normal'
          />
          {errors.childCount && (
            <span className='text-red-500 text-xs'>
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;

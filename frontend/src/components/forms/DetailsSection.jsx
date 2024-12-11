import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-bold mb-3'>Add Hotel</h1>

      <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
        Name
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          type='text'
          name='name'
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className='text-red-500 text-xs'>{errors.name.message}</span>
        )}
      </label>

      <div className='flex gap-4'>
        <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
          city
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            type='text'
            name='city'
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className='text-red-500 text-xs'>{errors.city.message}</span>
          )}
        </label>
        <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
          country
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            type='text'
            name='country'
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className='text-red-500 text-xs'>
              {errors.country.message}
            </span>
          )}
        </label>
      </div>

      <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
        city
        <textarea
          rows={10}
          className='border rounded w-full py-1 px-2 font-normal'
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className='text-red-500 text-xs'>
            {errors.description.message}
          </span>
        )}
      </label>

      <label htmlFor='' className='text-gray-700 text-sm font-bold max-w-[50%]'>
        Price Per Night
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          type='number'
          min={1}
          {...register("pricePerNight", {
            required: "PricePerNight is required",
          })}
        />
        {errors.pricePerNight && (
          <span className='text-red-500 text-xs'>
            {errors.pricePerNight.message}
          </span>
        )}
      </label>

      <label htmlFor='' className='text-gray-700 text-sm font-bold max-w-[50%]'>
        Star Rating
        <select
          {...register("starRating", { required: "Star Rating is required" })}
          className='border rounded w-full p-2 text-gray-700 font-normal'
        >
          <option value='' className='text-sm font-bold'>
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((rating, i) => (
            <option key={i} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className='text-red-500 text-xs'>
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;

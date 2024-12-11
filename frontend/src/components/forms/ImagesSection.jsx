import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Images</h2>
      <div className='border rounded p-4 flex flex-col gap-4'>
        <input
          multiple
          accept='image/*'
          className='w-full text-gray-700 font-normal'
          type='file'
          {...register("imageFiles", {
            validate: (val) => {
              const totalLength = val.length;
              if (totalLength === 0) {
                return "Please select at least one image file";
              }
              if (totalLength > 6) {
                return "Please select at most 6 image files";
              }
              return true;
            },
          })}
        />
      </div>

      {errors.imageFiles && (
        <span className='text-red-500 text-xs'>
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;

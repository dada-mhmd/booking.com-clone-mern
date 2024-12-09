import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import * as apiClient from "../apiClient";

const Register = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      toast.success("Registration successful");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form className='flex flex-col gap-5'>
      <h2 className='text-3xl font-bold'>Create an account</h2>

      <div className='flex flex-col md:flex-row gap-5'>
        <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            type='text'
            name='firstName'
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <span className='text-red-500 text-xs'>
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            type='text'
            name='lastName'
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <span className='text-red-500 text-xs'>
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>

      <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          type='email'
          name='email'
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className='text-red-500 text-xs'>{errors.email.message}</span>
        )}
      </label>

      <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          type='password'
          name='password'
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <span className='text-red-500 text-xs'>
            {errors.password.message}
          </span>
        )}
      </label>

      <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
        Confirm Password
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          type='password'
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "Please confirm your password";
              } else if (watch("password") !== value) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className='text-red-500 text-xs'>
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span>
        <button
          type='submit'
          className='bg-blue-600 rounded text-white p-2 font-bold hover:bg-blue-500 text-xl'
          onClick={handleSubmit(onSubmit)}
        >
          Create account
        </button>
      </span>
    </form>
  );
};

export default Register;

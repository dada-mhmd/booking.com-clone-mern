import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import * as apiClient from "../apiClient";

const Login = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      toast.success("Login successful");
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
      <h2 className='text-3xl font-bold'>Login</h2>

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

      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Do not have an account?{" "}
          <Link
            to='/register'
            className='text-blue-600 underline font-semibold'
          >
            Create now!
          </Link>
        </span>

        <button
          type='submit'
          className='bg-blue-600 rounded text-white p-2 font-bold hover:bg-blue-500 text-xl'
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;

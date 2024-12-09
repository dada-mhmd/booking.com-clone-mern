import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
import { toast } from "react-hot-toast";

const LogoutBtn = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Logout successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleLogout}
      className='flex items-center text-blue-600 px-3 font-bold bg-gray-100 py-2 rounded hover:opacity-85'
    >
      Logout
    </button>
  );
};

export default LogoutBtn;

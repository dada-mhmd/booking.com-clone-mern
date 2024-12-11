import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

import * as apiClient from "../apiClient";
import ManageHotelForm from "../components/forms/ManageHotelForm";

const AddHotel = () => {
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      toast.success("Hotel added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSave = (data) => {
    mutate(data);
  };

  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;

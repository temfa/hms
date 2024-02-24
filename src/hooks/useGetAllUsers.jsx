import { useEffect, useState } from "react";
import { useUsersMutation } from "../redux/api/mutationApi";

export const useGetAllUsers = (title) => {
  const [allUsers, setAllUsers] = useState([]);
  const [getAllUsers, { data: getAllUser, isSuccess: getAllUserSuccess, isLoading: getAllUserLoading, isError: getAllUserFalse, error: getAllUserErr }] = useUsersMutation();
  useEffect(() => {
    if (getAllUserSuccess) {
      if (getAllUser) {
        getAllUser?.data?.filter((item) => {
          if (item.role === title) setAllUsers((arr) => [...arr, item]);
          return true;
        });
        // toast.success("Patient Created Successfully");
        // getAllUser?.data.map((item) => {
        //   if (new Date(item.registration_date).getDate() === new Date().getDate()) todayData.push(item);
        //   if (new Date(item.registration_date).getMonth() === new Date().getMonth()) monthlyData.push(item);
        //   return true;
        // });
      }
    }
  }, [getAllUser, getAllUserSuccess, title]);
  useEffect(() => {
    if (getAllUserFalse) {
      if (getAllUserErr) {
        console.log(getAllUserErr);
      }
    }
  }, [getAllUserErr, getAllUserFalse]);
  useEffect(() => {
    const interval = setTimeout(() => {
      getAllUsers({ "all-users": true });
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [getAllUsers]);
  return { allUsers, getAllUserLoading };
};

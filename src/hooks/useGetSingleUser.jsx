import { useEffect, useState } from "react";
import { useUsersMutation } from "../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetSingleUsers = (title, link) => {
  const navigate = useNavigate();
  const [singleUsers, setSingleUsers] = useState({});
  const [getSingleUsers, { data: getSingleUser, isSuccess: getSingleUserSuccess, isLoading: getSingleUserLoading, isError: getSingleUserFalse, error: getSingleUserErr }] =
    useUsersMutation();
  useEffect(() => {
    if (getSingleUserSuccess) {
      if (getSingleUser) {
        setSingleUsers(getSingleUser);
      }
    }
  }, [getSingleUser, getSingleUserSuccess, title]);
  useEffect(() => {
    if (getSingleUserFalse) {
      if (getSingleUserErr) {
        console.log(getSingleUserErr);
        toast.error(getSingleUserErr.data.error);
        if (getSingleUserErr.data.error === "User not found") {
          navigate(link);
        }
      }
    }
  }, [getSingleUserErr, getSingleUserFalse, navigate, link]);
  useEffect(() => {
    const interval = setTimeout(() => {
      const data = {
        "single-user": true,
        user_id: title,
      };
      getSingleUsers(data);
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [getSingleUsers, title]);
  return { singleUsers, getSingleUserLoading };
};

import { useEffect, useState } from "react";
import { useWardsMutation } from "../redux/api/mutationApi";

export const useGetAllWards = () => {
  const [allWards, setAllWards] = useState([]);
  const [getAllWards, { data: getAllWard, isSuccess: getAllWardSuccess, isLoading: getAllWardLoading, isError: getAllWardFalse, error: getAllWardErr }] = useWardsMutation();
  useEffect(() => {
    if (getAllWardSuccess) {
      if (getAllWard) {
        setAllWards(getAllWard?.data);
      }
    }
  }, [getAllWard, getAllWardSuccess]);
  useEffect(() => {
    if (getAllWardFalse) {
      if (getAllWardErr) {
        console.log(getAllWardErr);
      }
    }
  }, [getAllWardErr, getAllWardFalse]);
  useEffect(() => {
    const interval = setTimeout(() => {
      getAllWards({ "all-wards": true });
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [getAllWards]);
  return { allWards, getAllWardLoading };
};

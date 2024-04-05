import { useEffect, useState } from "react";
import { useServicesMutation } from "../redux/api/mutationApi";

export const useGetAllServices = () => {
  const [allServices, setAllServices] = useState([]);
  const [getAllServices, { data: getAllService, isSuccess: getAllServiceSuccess, isLoading: getAllServiceLoading, isError: getAllServiceFalse, error: getAllServiceErr }] =
    useServicesMutation();
  useEffect(() => {
    if (getAllServiceSuccess) {
      if (getAllService) {
        setAllServices(getAllService?.data);
      }
    }
  }, [getAllService, getAllServiceSuccess]);
  useEffect(() => {
    if (getAllServiceFalse) {
      if (getAllServiceErr) {
        console.log(getAllServiceErr);
      }
    }
  }, [getAllServiceErr, getAllServiceFalse]);
  useEffect(() => {
    const interval = setTimeout(() => {
      getAllServices({ "all-services": true });
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [getAllServices]);
  return { allServices, getAllServiceLoading };
};

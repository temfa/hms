import { useEffect, useState } from "react";
import { useClinicsMutation } from "../redux/api/mutationApi";

export const useGetAllClinics = () => {
  const [allClinics, setAllClinics] = useState([]);
  const [getAllClinics, { data: getAllClinic, isSuccess: getAllClinicSuccess, isLoading: getAllClinicLoading, isError: getAllClinicFalse, error: getAllClinicErr }] =
    useClinicsMutation();
  useEffect(() => {
    if (getAllClinicSuccess) {
      if (getAllClinic) {
        setAllClinics(getAllClinic?.data);
      }
    }
  }, [getAllClinic, getAllClinicSuccess]);
  useEffect(() => {
    if (getAllClinicFalse) {
      if (getAllClinicErr) {
        console.log(getAllClinicErr);
      }
    }
  }, [getAllClinicErr, getAllClinicFalse]);
  useEffect(() => {
    const interval = setTimeout(() => {
      getAllClinics({ "all-clinics": true });
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [getAllClinics]);
  return { allClinics, getAllClinicLoading };
};

import { useEffect, useState } from "react";
import { usePatientMutation } from "../redux/api/mutationApi";

export const useGetAllPatients = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [getAllPatients, { data: getAllPatient, isSuccess: getAllPatientSuccess, isLoading: getAllPatientLoading, isError: getAllPatientFalse, error: getAllPatientErr }] =
    usePatientMutation();
  useEffect(() => {
    if (getAllPatientSuccess) {
      if (getAllPatient) {
        setAllPatients(getAllPatient?.data);
      }
    }
  }, [getAllPatient, getAllPatientSuccess]);
  useEffect(() => {
    if (getAllPatientFalse) {
      if (getAllPatientErr) {
        console.log(getAllPatientErr);
      }
    }
  }, [getAllPatientErr, getAllPatientFalse]);
  useEffect(() => {
    const interval = setTimeout(() => {
      getAllPatients({ "all-patients": true });
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [getAllPatients]);
  return { allPatients, getAllPatientLoading };
};

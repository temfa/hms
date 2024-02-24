import { useEffect, useState } from "react";
import { useMedicineMutation } from "../redux/api/mutationApi";

export const useGetAllMedicine = () => {
  const [allMedicines, setAllMedicines] = useState([]);
  const [getAllMedicines, { data: getAllMedicine, isSuccess: getAllMedicineSuccess, isLoading: getAllMedicineLoading, isError: getAllMedicineFalse, error: getAllMedicineErr }] =
    useMedicineMutation();
  useEffect(() => {
    if (getAllMedicineSuccess) {
      if (getAllMedicine) {
        setAllMedicines(getAllMedicine?.data);
      }
    }
  }, [getAllMedicine, getAllMedicineSuccess]);
  useEffect(() => {
    if (getAllMedicineFalse) {
      if (getAllMedicineErr) {
        console.log(getAllMedicineErr);
      }
    }
  }, [getAllMedicineErr, getAllMedicineFalse]);
  useEffect(() => {
    const interval = setTimeout(() => {
      getAllMedicines({ "all-medicine": true });
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [getAllMedicines]);
  return { allMedicines, getAllMedicineLoading };
};

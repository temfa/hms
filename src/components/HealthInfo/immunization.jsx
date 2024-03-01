import React, { useEffect, useState } from "react";
import { Button, DatePickerComp, Input } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useMedicalRecordMutation } from "../../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Immunization = ({ id, action }) => {
  const [date, setDate] = useState(new Date());

  const roles = useSelector((state) => state.roles);
  const {
    register,
    handleSubmit,
    // watch,
    //  setValue,
    formState: { errors },
  } = useForm();

  const [newMedicalRecord, { data: medicalRecord, isLoading: medicalRecordLoad, isSuccess: medicalRecordSuccess, isError: medicalRecordFalse, error: medicalRecordErr }] =
    useMedicalRecordMutation();

  const submit = (datas) => {
    const datad = {
      "add-immunization": true,
      patient_id: id,
      user_id: roles.user_id,
      immunization: datas.immunization,
      date_given: date,
    };
    newMedicalRecord(datad);
  };
  useEffect(() => {
    if (medicalRecordSuccess) {
      if (medicalRecord) {
        console.log(medicalRecord);
        toast.success(medicalRecord.success);
        //  navigate("/doctors");
        action();
      }
    }
  }, [medicalRecord, medicalRecordSuccess, action]);
  useEffect(() => {
    if (medicalRecordFalse) {
      if (medicalRecordErr) {
        console.log(medicalRecordErr);
        toast.error(medicalRecordErr.data.error);
      }
    }
  }, [medicalRecordErr, medicalRecordFalse]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex-colo gap-4">
        {/* uploader */}
        <div className="flex gap-3 flex-col w-full col-span-6">
          {/* weight */}
          <Input label="Immunization" color={true} type="text" placeholder={"Immunization"} register={{ ...register("immunization", { required: "Immunization is required" }) }} />
          {errors.immunization && <span>{errors.immunization.message}</span>}
          <DatePickerComp label="Date of Birth" startDate={date} onChange={(date) => setDate(date)} />
          {/* submit */}
          <Button label={"Save Changes"} Icon={HiOutlineCheckCircle} type={true} loading={medicalRecordLoad} />
        </div>
      </div>
    </form>
  );
};

export default Immunization;

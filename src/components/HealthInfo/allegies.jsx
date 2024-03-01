import React, { useEffect } from "react";
import { Button, Input, Textarea } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useMedicalRecordMutation } from "../../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Allegies = ({ id, action }) => {
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
      "add-allegies": true,
      patient_id: id,
      user_id: roles.user_id,
      allegen: datas.allegen,
      reaction: datas.reaction,
      allergy_type: datas.allegyType,
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
          <Input label="Allegy Type" color={true} type="text" placeholder={"Allegy Type"} register={{ ...register("allegyType", { required: "Allegy Type is required" }) }} />
          {errors.allegyType && <span>{errors.allegyType.message}</span>}
          {/* height */}
          <Input label="Allegen" color={true} type="text" placeholder={"Allegen"} register={{ ...register("allegen", { required: "Allegen is required" }) }} />
          {errors.allegen && <span>{errors.allegen.message}</span>}
          {/* allergies */}
          <Textarea label="Reaction" color={true} rows={3} placeholder={"Reaction"} register={{ ...register("reaction", { required: "Reaction is required" }) }} />
          {errors.reaction && <span>{errors.reaction.message}</span>}
          {/* habits */}
          {/* <Textarea label="Habits" color={true} rows={3} placeholder={"smoking, drinking, etc"} register={{ ...register("habits", { required: "Habits is required" }) }} />
          {errors.habits && <span>{errors.habits.message}</span>} */}
          {/* submit */}
          <Button label={"Save Changes"} Icon={HiOutlineCheckCircle} type={true} loading={medicalRecordLoad} />
        </div>
      </div>
    </form>
  );
};

export default Allegies;

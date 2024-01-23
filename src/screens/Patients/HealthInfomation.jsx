import React, { useEffect, useState } from "react";
import { sortsDatas } from "../../components/Datas";
import { Button, Input, Select, Textarea } from "../../components/Form";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMedicalRecordMutation } from "../../redux/api/mutationApi";
import { useSelector } from "react-redux";

// Health Information
// allergies
// habits
// Medical History

const HealthInfomation = ({ data }) => {
  const roles = useSelector((state) => state.roles);
  const {
    register,
    handleSubmit,
    // watch,
    //  setValue,
    formState: { errors },
  } = useForm();
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[0]);
  useEffect(() => {
    setBloodType({ name: data?.blood_group });
  }, [data]);
  const [newMedicalRecord, { data: medicalRecord, isLoading: medicalRecordLoad, isSuccess: medicalRecordSuccess, isError: medicalRecordFalse, error: medicalRecordErr }] =
    useMedicalRecordMutation();

  const submit = (datas) => {
    const datad = {
      "create-record": true,
      patient_id: data.patient_id,
      user_id: roles.user_id,
      allegies: datas.allergies,
      habits: datas.habits,
      height: datas.height,
      medical_history: datas.medicalHistory,
      weight: datas.weight,
    };
    console.log(datad);
    newMedicalRecord(datad);
  };
  useEffect(() => {
    if (medicalRecordSuccess) {
      if (medicalRecord) {
        console.log(medicalRecord);
        toast.success(medicalRecord.success);
        //  navigate("/doctors");
      }
    }
  }, [medicalRecord, medicalRecordSuccess]);
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
          {/* select  */}
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Blood Group</p>
            <Select selectedPerson={bloodType} setSelectedPerson={setBloodType} datas={sortsDatas.bloodTypeFilter}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {bloodType?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>

          {/* weight */}
          <Input label="Weight" color={true} type="text" placeholder={"60kg"} register={{ ...register("weight", { required: "Weight is required" }) }} />
          {errors.weight && <span>{errors.weight.message}</span>}
          {/* height */}
          <Input label="Height" color={true} type="text" placeholder={"5.5ft"} register={{ ...register("height", { required: "Height is required" }) }} />
          {errors.height && <span>{errors.height.message}</span>}
          {/* allergies */}
          <Textarea label="Allergies" color={true} rows={3} placeholder={"beans, nuts, etc"} register={{ ...register("allergies", { required: "Allergies is required" }) }} />
          {errors.allergies && <span>{errors.allergies.message}</span>}
          {/* habits */}
          <Textarea label="Habits" color={true} rows={3} placeholder={"smoking, drinking, etc"} register={{ ...register("habits", { required: "Habits is required" }) }} />
          {errors.habits && <span>{errors.habits.message}</span>}
          {/* Medical History */}
          <Textarea
            label="Medical History"
            color={true}
            rows={3}
            placeholder={"diabetes,  malaria, glaucoma, etc"}
            register={{ ...register("medicalHistory", { required: "Medical History is required" }) }}
          />
          {errors.medicalHistory && <span>{errors.medicalHistory.message}</span>}
          {/* submit */}
          <Button label={"Save Changes"} Icon={HiOutlineCheckCircle} type={true} loading={medicalRecordLoad} />
        </div>
      </div>
    </form>
  );
};

export default HealthInfomation;

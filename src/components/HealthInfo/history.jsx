import React, { useEffect } from "react";
import { Button, Input, Textarea } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useMedicalRecordMutation } from "../../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const History = ({ id, action }) => {
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
      "add-history-examination": true,
      patient_id: id,
      doctor_id: roles.user_id,
      presenting_complaint_history: datas.complaints,
      systemic_enquiry: datas.enquiry,
      physical_examination: datas.physical_exam,
      general_examination: datas.general_exam,
      cardiovascular: datas.cardio,
      respiration: datas.respiration,
      gastrointestinal: datas.gastro,
      medical_history: datas.medical_history,
      musculoskeletal: datas.musculo,
      family_history: datas.family_history,
      paediatric_history: datas.paeds,
      gyneac_obstetric_history: datas.gyn,
      vaginal_examination: datas.vaginal,
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
          <Input label="Enquiry" color={true} type="text" placeholder={"Enquiry"} register={{ ...register("enquiry", { required: "Enquiry is required" }) }} />
          {errors.enquiry && <span>{errors.enquiry.message}</span>}
          <Input
            label="Physical Examination"
            color={true}
            type="text"
            placeholder={"Physical Examination"}
            register={{ ...register("physical_exam", { required: "Physical Examination is required" }) }}
          />
          {errors.physical_exam && <span>{errors.physical_exam.message}</span>}
          <Input
            label="General Examination"
            color={true}
            type="text"
            placeholder={"General Examination"}
            register={{ ...register("general_exam", { required: "General Examination is required" }) }}
          />
          {errors.general_exam && <span>{errors.general_exam.message}</span>}
          <Input label="Cardiovascular" color={true} type="text" placeholder={"Cardiovascular"} register={{ ...register("cardio", { required: "Cardiovascular is required" }) }} />
          {errors.cardio && <span>{errors.cardio.message}</span>}
          <Input label="Respiration" color={true} type="text" placeholder={"Respiration"} register={{ ...register("respiration", { required: "Respiration is required" }) }} />
          {errors.respiration && <span>{errors.respiration.message}</span>}
          <Input
            label="Gastrointesinal"
            color={true}
            type="text"
            placeholder={"Gastrointesinal"}
            register={{ ...register("gastro", { required: "Gastrointesinal is required" }) }}
          />
          {errors.gastro && <span>{errors.gastro.message}</span>}
          <Input
            label="Medical History"
            color={true}
            type="text"
            placeholder={"Medical History"}
            register={{ ...register("medical_history", { required: "Medical History is required" }) }}
          />
          {errors.medical_history && <span>{errors.medical_history.message}</span>}
          <Input
            label="Musculo Skelatal"
            color={true}
            type="text"
            placeholder={"Musculo Skelatal"}
            register={{ ...register("musculo", { required: "Musculo Skelatal is required" }) }}
          />
          {errors.musculo && <span>{errors.musculo.message}</span>}
          <Input
            label="Family History"
            color={true}
            type="text"
            placeholder={"Family History"}
            register={{ ...register("family_history", { required: "Family History is required" }) }}
          />
          {errors.family_history && <span>{errors.family_history.message}</span>}
          <Input
            label="Paediatric History"
            color={true}
            type="text"
            placeholder={"Paediatric History"}
            register={{ ...register("paeds", { required: "Paediatric History is required" }) }}
          />
          {errors.paeds && <span>{errors.paeds.message}</span>}
          <Input label="Gyn History" color={true} type="text" placeholder={"Gyn History"} register={{ ...register("gyn", { required: "Gyn History is required" }) }} />
          {errors.gyn && <span>{errors.gyn.message}</span>}
          <Input
            label="Vaginal Examination"
            color={true}
            type="text"
            placeholder={"Vaginal Examination"}
            register={{ ...register("vaginal", { required: "Vaginal Examination is required" }) }}
          />
          {errors.vaginal && <span>{errors.vaginal.message}</span>}
          <Textarea label="Complaints" color={true} type="text" placeholder={"Complaints"} register={{ ...register("complaints", { required: "Complaints is required" }) }} />
          {errors.complaints && <span>{errors.complaints.message}</span>}
          {/* submit */}
          <Button label={"Save Changes"} Icon={HiOutlineCheckCircle} type={true} loading={medicalRecordLoad} />
        </div>
      </div>
    </form>
  );
};

export default History;

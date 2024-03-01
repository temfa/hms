import React, { useEffect } from "react";
import { Button, Input, Textarea } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useMedicalRecordMutation } from "../../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Vitals = ({ id, action }) => {
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
      "add-vitals": true,
      patient_id: id,
      user_id: roles.user_id,
      visit_id: "",
      admission_id: "",
      systolic_bp: datas.systolic_bp,
      diastolic_bp: datas.diastolic_bp,
      temperature: datas.temperature,
      weight: datas.weight,
      height: datas.height,
      respiratory_rate: datas.respiratory_rate,
      heart_rate: datas.heart_rate,
      urine_output: datas.urine,
      blood_sugar_f: datas.blood_sugar,
      spo2: datas.spo2,
      avpu: datas.avpu,
      trauma: datas.trauma,
      mobility: datas.mobility,
      oxygen_supplementation: datas.oxygen_sup,
      comments: datas.comments,
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
          <Input label="Systolic BP" color={true} type="text" placeholder={"Systolic BP"} register={{ ...register("systolic_bp", { required: "Systolic BP is required" }) }} />
          {errors.systolic_bp && <span>{errors.systolic_bp.message}</span>}
          <Input label="Diastolic BP" color={true} type="text" placeholder={"Diastolic BP"} register={{ ...register("diastolic_bp", { required: "Diastolic BP is required" }) }} />
          {errors.diastolic_bp && <span>{errors.diastolic_bp.message}</span>}
          <Input label="Temperature" color={true} type="text" placeholder={"Temperature"} register={{ ...register("temperature", { required: "Temperature is required" }) }} />
          {errors.temperature && <span>{errors.temperature.message}</span>}
          <Input label="Weight" color={true} type="text" placeholder={"Weight"} register={{ ...register("weight", { required: "Weight is required" }) }} />
          {errors.weight && <span>{errors.weight.message}</span>}
          <Input label="Height" color={true} type="text" placeholder={"Height"} register={{ ...register("height", { required: "Height is required" }) }} />
          {errors.height && <span>{errors.height.message}</span>}
          <Input
            label="Respiratory Rate"
            color={true}
            type="text"
            placeholder={"Respiratory Rate"}
            register={{ ...register("respiratory_rate", { required: "Respiratory Rate is required" }) }}
          />
          {errors.respiratory_rate && <span>{errors.respiratory_rate.message}</span>}
          <Input label="Heart Rate" color={true} type="text" placeholder={"Heart Rate"} register={{ ...register("heart_rate", { required: "Heart Rate is required" }) }} />
          {errors.heart_rate && <span>{errors.heart_rate.message}</span>}
          <Input label="Urine Output" color={true} type="text" placeholder={"Urine Output"} register={{ ...register("urine", { required: "Urine Output is required" }) }} />
          {errors.urine && <span>{errors.urine.message}</span>}
          <Input label="Blood Sugar" color={true} type="text" placeholder={"Blood Sugar"} register={{ ...register("blood_sugar", { required: "Blood Sugar is required" }) }} />
          {errors.blood_sugar && <span>{errors.blood_sugar.message}</span>}
          <Input label="Spo2" color={true} type="text" placeholder={"Spo2"} register={{ ...register("spo2", { required: "Spo2 is required" }) }} />
          {errors.spo2 && <span>{errors.spo2.message}</span>}
          <Input label="Avpu" color={true} type="text" placeholder={"Avpu"} register={{ ...register("avpu", { required: "Avpu is required" }) }} />
          {errors.avpu && <span>{errors.avpu.message}</span>}
          <Input label="Trauma" color={true} type="text" placeholder={"Trauma"} register={{ ...register("trauma", { required: "Trauma is required" }) }} />
          {errors.trauma && <span>{errors.trauma.message}</span>}
          <Input label="Mobility" color={true} type="text" placeholder={"Mobility"} register={{ ...register("mobility", { required: "Mobility is required" }) }} />
          {errors.mobility && <span>{errors.mobility.message}</span>}
          <Input
            label="Oxygen Supplementation"
            color={true}
            type="text"
            placeholder={"Oxygen Supplementation"}
            register={{ ...register("oxygen_sup", { required: "Oxygen Supplementation is required" }) }}
          />
          {errors.oxygen_sup && <span>{errors.Oxygen_sup.message}</span>}
          <Textarea label="Comments" color={true} type="text" placeholder={"Comments"} register={{ ...register("comments", { required: "Comments is required" }) }} />
          {errors.comments && <span>{errors.comments.message}</span>}
          {/* submit */}
          <Button label={"Save Changes"} Icon={HiOutlineCheckCircle} type={true} loading={medicalRecordLoad} />
        </div>
      </div>
    </form>
  );
};

export default Vitals;

import React, { useEffect, useState } from "react";
// import Uploder from "../Uploader";
import { location, sortsDatas } from "../Datas";
import { Button, DatePickerComp, Input, Select, Select2 } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { usePatientMutation } from "../../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { RiDeleteBin5Line } from "react-icons/ri";

const PreviewPatient = ({ data }) => {
  //   const [title, setTitle] = useState(sortsDatas.title[0]);
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[0]);
  const [paymentMethod, setPaymentMethod] = useState(sortsDatas.method[0]);
  const [state, setState] = useState(location[0]);
  const [lga, setLga] = useState({ name: "Choose LGA..." });
  // const [lgaValue, setLgaValue] = useState([]);
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [patientBody, { data: patientNew, isLoading: patientNewLoad, isSuccess: patientNewSuccess, isError: patientNewFalse, error: patientNewErr }] = usePatientMutation();

  const onSubmit = (datas) => {
    const datad = {
      "edit-patient": true,
      patient_id: data.patient_id,
      fullname: datas.fullName,
      date_of_birth: date,
      // email: datas.email,
      gender: gender?.name,
      phone: datas.phoneNumber,
      address: datas.address,
      lga: lga?.name,
      blood_group: bloodType.name,
      state: state?.name,
      nok_name: datas.emergencyContact,
      nok_relation: datas.emergencyRelation,
      nok_address: datas.emergencyAddress,
      nok_phone: datas.emergencyPhone,
      payer: paymentMethod.name,
    };
    console.log(datad);
    patientBody(datad);
  };
  useEffect(() => {
    if (patientNewSuccess) {
      if (patientNew) {
        console.log(patientNew);
        toast.success("Edited Successfully");
        navigate("/patients");
      }
    }
  }, [patientNew, patientNewSuccess, navigate]);
  useEffect(() => {
    if (patientNewFalse) {
      if (patientNewErr) {
        console.log(patientNewErr);
        toast.error(patientNewErr);
      }
    }
  }, [patientNewErr, patientNewFalse]);

  useEffect(() => {
    setValue("fullName", data.fullname);
    setValue("email", data.email);
    setValue("phoneNumber", data.phone);
    setValue("address", data.address);
    setValue("emergencyContact", data.nok_name);
    setValue("emergencyPhone", data.nok_phone);
    setValue("emergencyAddress", data.nok_address);
    setValue("emergencyRelation", data.nok_relation);
    setGender({ name: data?.gender });
    if (data?.date_of_birth !== undefined) {
      setDate(new Date(data?.date_of_birth));
    }
    setLga({ name: data?.lga });
    setState({ name: data?.state });
    setPaymentMethod({ name: data?.payer });
    setBloodType({ name: data?.blood_group });
  }, [data, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-colo gap-4">
        {/* uploader */}
        {/* <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Profile Image</p>
        <Uploder />
  </div> */}
        {/* select  */}
        {/* {titles && (
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Title</p>
            <Select selectedPerson={title} setSelectedPerson={setTitle} datas={sortsDatas.title}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {title?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        )} */}

        {/* fullName */}
        <Input label="Full Name" color={true} type="text" register={{ ...register("fullName", { required: "Full Name is required" }) }} />
        {errors.fullName && <span>{errors.fullName.message}</span>}
        {/* phone */}
        <Input label="Phone Number" color={true} type="number" register={{ ...register("phoneNumber") }} />
        {/* email */}
        <Input label="Email" color={true} type="email" register={{ ...register("email") }} />
        <DatePickerComp label="Date of Birth" startDate={date} onChange={(date) => setDate(date)} />

        <>
          {/* address */}
          <Input label="Address" color={true} type="text" register={{ ...register("address") }} />
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">State</p>
            <Select selectedPerson={state} setSelectedPerson={setState} datas={location}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {state?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {state.name === "Choose State..." ? null : (
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Local Government</p>
              <Select2 selectedPerson={lga} setSelectedPerson={setLga} datas={[]}>
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {lga?.name} <BiChevronDown className="text-xl" />
                </div>
              </Select2>
            </div>
          )}
          {/* gender */}
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Gender</p>
            <Select selectedPerson={gender} setSelectedPerson={setGender} datas={sortsDatas.genderFilter}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {gender?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Blood Group</p>
            <Select selectedPerson={bloodType} setSelectedPerson={setBloodType} datas={sortsDatas.bloodTypeFilter}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {bloodType?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {/* emergancy contact */}
          <Input label="Emergency Contact" color={true} type="text" register={{ ...register("emergencyContact") }} />
          <Input label="Emergency Contact Phone" color={true} type="number" register={{ ...register("emergencyPhone") }} />
          <Input label="Emergency Contact Address" color={true} type="text" register={{ ...register("emergencyAddress") }} />
          <Input label="Emergency Contact Relation" color={true} type="text" register={{ ...register("emergencyRelation") }} />
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Payment Method</p>
            <Select selectedPerson={paymentMethod} setSelectedPerson={setPaymentMethod} datas={sortsDatas.method}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {paymentMethod?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </>
        {/* submit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* <Button
          label={"Delete Account"}
          Icon={RiDeleteBin5Line}
          onClick={() => {
            toast.error("This feature is not available yet");
          }}
        /> */}
          <Button
            type={true}
            label={"Save Changes"}
            Icon={HiOutlineCheckCircle}
            loading={patientNewLoad}
            // onClick={() => {
            //   toast.error("This feature is not available yet");
            // }}
          />
        </div>
      </div>
    </form>
  );
};

export default PreviewPatient;

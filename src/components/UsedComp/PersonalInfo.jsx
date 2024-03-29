import React, { useEffect, useState } from "react";
// import Uploder from "../Uploader";
import { location, sortsDatas } from "../Datas";
import { Button, DatePickerComp, Input, Select } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { usePatientMutation } from "../../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetAllClinics } from "../../hooks/useGetAllClinics";
import LoadingSkel from "../LoadingSkel";
// import { RiDeleteBin5Line } from "react-icons/ri";

const PersonalInfo = ({ titles }) => {
  const roles = useSelector((state) => state.roles);
  const { allClinics, getAllClinicLoading } = useGetAllClinics();
  const [title, setTitle] = useState(sortsDatas.title[0]);
  const [clinic, setClinic] = useState({ name: "Choose Clinic..." });
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[0]);
  const [paymentMethod, setPaymentMethod] = useState(sortsDatas.method[0]);
  const [state, setState] = useState(location[0]);
  const [lga, setLga] = useState({ name: "Choose LGA..." });
  const [lgaValue, setLgaValue] = useState([]);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    location?.filter((e) => {
      if (e.name === state.name) setLgaValue(e.localGoverment);
      return true;
    });
  }, [state]);
  const [patient, { data: newPatient, isLoading: newPatientLoad, isSuccess: newPatientSuccess, isError: newPatientFalse, error: newPatientErr }] = usePatientMutation();
  useEffect(() => {
    if (newPatientSuccess) {
      if (newPatient) {
        console.log(newPatient);
        toast.success("Patient Created Successfully");
      }
    }
  }, [newPatient, newPatientSuccess]);
  useEffect(() => {
    if (newPatientFalse) {
      if (newPatientErr) {
        console.log(newPatientErr);
      }
    }
  }, [newPatientErr, newPatientFalse]);
  const onSubmit = (data) => {
    const datas = {
      fullname: data.fullName,
      date_of_birth: date,
      email: data.email,
      gender: gender?.name,
      phone: data.phoneNumber,
      address: data.address,
      lga: lga?.name,
      blood_group: bloodType.name,
      state: state?.name,
      country: "Nigeria",
      nok_name: data.emergencyContact,
      nok_relation: data.emergencyRelation,
      nok_address: data.emergencyAddress,
      nok_phone: data.emergencyPhone,
      payer: paymentMethod.name,
      "register-patient": true,
      registered_by: roles?.user_id,
    };
    patient(datas);
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {getAllClinicLoading ? (
        <LoadingSkel />
      ) : (
        <div className="flex-colo gap-4">
          {/* uploader */}
          {/* <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Profile Image</p>
        <Uploder />
  </div> */}
          {/* select  */}
          {titles && (
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Title</p>
              <Select selectedPerson={title} setSelectedPerson={setTitle} datas={sortsDatas.title}>
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {title?.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
          )}

          {/* fullName */}
          <Input label="Full Name" color={true} type="text" register={{ ...register("fullName", { required: "Full Name is required" }) }} placeholder="Enter Full Name" />
          {errors.fullName && <span>{errors.fullName.message}</span>}
          {/* phone */}
          <Input label="Phone Number" color={true} type="number" register={{ ...register("phoneNumber") }} placeholder="Enter Phone Number" />
          {/* email */}
          <Input label="Email" color={true} type="email" register={{ ...register("email") }} placeholder="Enter Email" />
          <DatePickerComp label="Date of Birth" startDate={date} onChange={(date) => setDate(date)} />
          {!titles && (
            <>
              {/* address */}
              <Input label="Address" color={true} type="text" register={{ ...register("address") }} placeholder="Enter Address" />
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
                  <Select selectedPerson={lga} setSelectedPerson={setLga} datas={lgaValue}>
                    <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                      {lga?.name} <BiChevronDown className="text-xl" />
                    </div>
                  </Select>
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
              <div className="flex w-full flex-col gap-3">
                <p className="text-black text-sm">Clinic</p>
                <Select selectedPerson={clinic} setSelectedPerson={setClinic} datas={allClinics}>
                  <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                    {clinic?.name} <BiChevronDown className="text-xl" />
                  </div>
                </Select>
              </div>
              {/* emergancy contact */}
              <Input label="Emergency Contact" color={true} type="text" register={{ ...register("emergencyContact") }} placeholder="Enter Emergency Contact" />
              <Input label="Emergency Contact Phone" color={true} type="number" register={{ ...register("emergencyPhone") }} placeholder="Enter Emergency Phone" />
              <Input label="Emergency Contact Address" color={true} type="text" register={{ ...register("emergencyAddress") }} placeholder="Enter Emergency Contact Address" />
              <Input label="Emergency Contact Relation" color={true} type="text" register={{ ...register("emergencyRelation") }} placeholder="Enter Emergency Contact Reelation" />
              <div className="flex w-full flex-col gap-3">
                <p className="text-black text-sm">Payment Method</p>
                <Select selectedPerson={paymentMethod} setSelectedPerson={setPaymentMethod} datas={sortsDatas.method}>
                  <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                    {paymentMethod?.name} <BiChevronDown className="text-xl" />
                  </div>
                </Select>
              </div>
            </>
          )}
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
              loading={newPatientLoad}
              // onClick={() => {
              //   toast.error("This feature is not available yet");
              // }}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default PersonalInfo;

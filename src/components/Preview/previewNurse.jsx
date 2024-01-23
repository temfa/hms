import React, { useEffect, useState } from "react";
// import Uploder from "../Uploader";
import { sortsDatas } from "../Datas";
import { Button, DatePickerComp, Input, Select } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useUsersMutation } from "../../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { RiDeleteBin5Line } from "react-icons/ri";

const PreviewNurse = ({ data }) => {
  //   const [title, setTitle] = useState(sortsDatas.title[0]);
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [userBody, { data: userNew, isLoading: userNewLoad, isSuccess: userNewSuccess, isError: userNewFalse, error: userNewErr }] = useUsersMutation();

  const onSubmit = (datas) => {
    const datad = {
      "edit-user": true,
      username: datas.username,
      password: datas.password,
      user_id: data.user_id,
      fullname: datas.fullName,
      date_of_birth: date,
      gender: gender.name,
      contact_number: datas.phone,
      email: datas.email,
      address: datas.address,
    };
    console.log(datad);
    userBody(datad);
  };
  useEffect(() => {
    if (userNewSuccess) {
      if (userNew) {
        console.log(userNew);
        toast.success("Edited Successfully");
        navigate("/nurses");
      }
    }
  }, [userNew, userNewSuccess, navigate]);
  useEffect(() => {
    if (userNewFalse) {
      if (userNewErr) {
        console.log(userNewErr);
        toast.error(userNewErr);
      }
    }
  }, [userNewErr, userNewFalse]);

  useEffect(() => {
    setValue("fullName", data.fullname);
    setValue("username", data.username);
    setValue("email", data.email);
    setValue("phone", data.contact_number);
    setValue("address", data.address);
    setGender({ name: data?.gender });
    if (data?.date_of_birth !== undefined) {
      setDate(new Date(data?.date_of_birth));
    }
  }, [data, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="Full Name" color={true} placeholder="John Doe" register={{ ...register("fullName") }} />
          {errors.fullName && <span>{errors.fullName.message}</span>}

          <Input label="Username" color={true} register={{ ...register("username") }} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="Email" type="email" color={true} register={{ ...register("email") }} />
          <Input label="Phone Number" color={true} register={{ ...register("phone") }} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Gender</p>
            <Select selectedPerson={gender} setSelectedPerson={setGender} datas={sortsDatas.genderFilter}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {gender?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <DatePickerComp label="Date of Birth" startDate={date} onChange={(date) => setDate(date)} />
        </div>
        <Input label="Address" color={true} register={{ ...register("address") }} />

        {/* password */}
        {/* <Input label="Password" type="password" color={true} register={{ ...register("password") }} /> */}

        {/* table access */}
        {/* <div className="w-full">
          <Access setAccess={setAccess} />
        </div> */}

        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {/* <button onClick={closeModal} className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light">
            Cancel
          </button> */}
          <Button label="Save" Icon={HiOutlineCheckCircle} type={true} loading={userNewLoad} />
        </div>
      </div>
    </form>
  );
};

export default PreviewNurse;

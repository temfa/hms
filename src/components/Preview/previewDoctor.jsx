import React, { useEffect, useState } from "react";
// import Uploder from "../Uploader";
import { sortsDatas } from "../Datas";
import { Button, DatePickerComp, Input, Select, Switchi } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useUsersMutation } from "../../redux/api/mutationApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { RiDeleteBin5Line } from "react-icons/ri";

const PreviewDoctor = ({ data }) => {
  const roles = useSelector((state) => state.roles);
  //   const [title, setTitle] = useState(sortsDatas.title[0]);
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [freeze, setFreeze] = useState(data.is_active === 1 ? false : true);
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [userBody, { data: userNew, isLoading: userNewLoad, isSuccess: userNewSuccess, isError: userNewFalse, error: userNewErr }] = useUsersMutation();
  const [disableUsers, { data: disableUser, isLoading: disableUserLoad, isSuccess: disableUserSuccess, isError: disableUserFalse, error: disableUserErr }] = useUsersMutation();

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
      specialization: datas.specialization,
      license_number: datas.licenseNumber,
    };
    console.log(datad);
    userBody(datad);
  };
  useEffect(() => {
    if (userNewSuccess) {
      if (userNew) {
        console.log(userNew);
        toast.success("Edited Successfully");
        navigate("/doctors");
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
    if (disableUserSuccess) {
      if (disableUser) {
        console.log(disableUser);
        if (disableUser.success === "User account activated successfully!") {
          setFreeze(false);
        } else if (disableUser.success === "User account deactivated successfully!") {
          setFreeze(true);
        }
        toast.success(disableUser.success);
      }
    }
  }, [disableUser, disableUserSuccess]);
  useEffect(() => {
    if (disableUserFalse) {
      if (disableUserErr) {
        console.log(disableUserErr);
        toast.error(disableUserErr);
      }
    }
  }, [disableUserErr, disableUserFalse]);

  useEffect(() => {
    setValue("fullName", data.fullname);
    setValue("username", data.username);
    setValue("email", data.email);
    setValue("phone", data.contact_number);
    setValue("address", data.address);
    setValue("specialization", data.specialization);
    setValue("licenseNumber", data.license_number);
    setGender({ name: data?.gender });
    if (data?.date_of_birth !== undefined) {
      setDate(new Date(data?.date_of_birth));
    }
  }, [data, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-colo gap-6">
        <div className="flex items-center gap-2 w-full">
          <Switchi
            label="Status"
            checked={freeze}
            onChange={() => {
              const datas = {
                "activate-user": true,
                "admin-id": roles.user_id,
                "user-id": data.user_id,
                "is-active": freeze ? "active" : "inactive",
              };
              disableUsers(datas);
            }}
          />
          <p className={`text-sm ${freeze ? "text-subMain" : "text-textGray"}`}>{freeze ? "Enabled" : "Disabled"}</p>
        </div>
        {disableUserLoad ? (
          <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-900"></path>
          </svg>
        ) : null}
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
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="Address" color={true} register={{ ...register("address") }} />
          <Input label="Specialization" color={true} register={{ ...register("specialization") }} />
        </div>
        <Input label="License Number" color={true} register={{ ...register("licenseNumber") }} />

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

export default PreviewDoctor;

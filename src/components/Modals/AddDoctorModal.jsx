import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button, DatePickerComp, Input, Select } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { sortsDatas } from "../Datas";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUsersMutation } from "../../redux/api/mutationApi";
// import Access from "../Access";
// import Uploader from "../Uploader";

function AddDoctorModal({ closeModal, isOpen, doctor, datas }) {
  // const [instraction, setInstraction] = useState(sortsDatas.title[0]);
  // const [access, setAccess] = useState({});
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const [userBody, { data: userNew, isLoading: userNewLoad, isSuccess: userNewSuccess, isError: userNewFalse, error: userNewErr }] = useUsersMutation();

  const onSubmit = (data) => {
    let datad;
    if (doctor === "Doctor") {
      datad = {
        "register-user": true,
        username: data.username,
        password: data.password,
        role: doctor,
        fullname: data.fullName,
        date_of_birth: date,
        gender: gender.name,
        contact_number: data.phone,
        email: data.email,
        address: data.address,
        specialization: data.specialization,
        license_number: data.licenseNumber,
      };
    } else {
      datad = {
        "register-user": true,
        username: data.username,
        password: data.password,
        role: doctor,
        fullname: data.fullName,
        date_of_birth: date,
        gender: gender.name,
        contact_number: data.phone,
        email: data.email,
        address: data.address,
      };
    }
    console.log(datad);
    userBody(datad);
  };
  useEffect(() => {
    if (userNewSuccess) {
      if (userNew) {
        console.log(userNew);
        toast.success("Created Successfully");
        closeModal();
        window.location.reload();
      }
    }
  }, [userNew, userNewSuccess, closeModal]);
  useEffect(() => {
    if (userNewFalse) {
      if (userNewErr) {
        console.log(userNewErr);
        toast.error(userNewErr.data.error);
      }
    }
  }, [userNewErr, userNewFalse]);

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} title={`Add ${doctor}`} width={"max-w-3xl"}>
      {/* <div className="flex gap-3 flex-col col-span-6 mb-6">
        <p className="text-sm">Profile Image</p>
        <Uploader />
      </div> */}
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
          {doctor === "Doctor" ? (
            <>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <Input
                  label="Address"
                  color={true}
                  register={{
                    ...register("address"),
                  }}
                />
                <Input
                  label="Specialization"
                  color={true}
                  register={{
                    ...register("specialization"),
                  }}
                />
              </div>
              <Input
                label="License Number"
                color={true}
                register={{
                  ...register("licenseNumber"),
                }}
              />
            </>
          ) : (
            <Input
              label="Address"
              color={true}
              register={{
                ...register("address"),
              }}
            />
          )}

          {/* password */}
          <Input label="Password" type="password" color={true} register={{ ...register("password") }} />

          {/* table access */}
          {/* <div className="w-full">
          <Access setAccess={setAccess} />
        </div> */}

          {/* buttones */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <button onClick={closeModal} className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light">
              Cancel
            </button>
            <Button label="Save" Icon={HiOutlineCheckCircle} type={true} loading={userNewLoad} />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddDoctorModal;

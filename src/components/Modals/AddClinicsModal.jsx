import React, { useEffect } from "react";
import { Button, Input } from "../Form";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { HiOutlineCheckCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { useClinicsMutation } from "../../redux/api/mutationApi";
import { useSelector } from "react-redux";

const AddClinicsModal = ({ closeModal, isOpen, title }) => {
  const roles = useSelector((state) => state.roles);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const [createClinic, { data: createClinics, isLoading: createClinicsLoad, isSuccess: createClinicsSuccess, isError: createClinicsFalse, error: createClinicsErr }] =
    useClinicsMutation();
  const [createWard, { data: createWards, isLoading: createWardsLoad, isSuccess: createWardsSuccess, isError: createWardsFalse, error: createWardsErr }] = useClinicsMutation();

  const onSubmit = (data) => {
    let datad = {
      "create-clinic": true,
      name: data.name,
      short_code: data.shortName,
      created_by: roles.user_id,
    };
    let datas = {
      "create-Ward": true,
      name: data.name,
      short_code: data.shortName,
      user_id: roles.user_id,
      bed_nos: data.beds,
    };

    title === "Ward" ? createWard(datas) : createClinic(datad);
  };
  useEffect(() => {
    if (createClinicsSuccess) {
      if (createClinics) {
        console.log(createClinics);
        toast.success("Created Successfully");
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  }, [createClinics, createClinicsSuccess, closeModal]);
  useEffect(() => {
    if (createClinicsFalse) {
      if (createClinicsErr) {
        console.log(createClinicsErr);
        toast.error(createClinicsErr.data.error);
      }
    }
  }, [createClinicsErr, createClinicsFalse]);
  useEffect(() => {
    if (createWardsSuccess) {
      if (createWards) {
        console.log(createWards);
        toast.success("Created Successfully");
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  }, [createWards, createWardsSuccess, closeModal]);
  useEffect(() => {
    if (createWardsFalse) {
      if (createWardsErr) {
        console.log(createWardsErr);
        toast.error(createWardsErr.data.error);
      }
    }
  }, [createWardsErr, createWardsFalse]);
  return (
    <Modal closeModal={closeModal} isOpen={isOpen} title={`Add ${title}`} width={"max-w-3xl"}>
      {/* <div className="flex gap-3 flex-col col-span-6 mb-6">
        <p className="text-sm">Profile Image</p>
        <Uploader />
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-colo gap-6">
          <Input label="Name" color={true} placeholder="Name" register={{ ...register("name") }} />
          {errors.fullName && <span>{errors.name.message}</span>}

          <Input label="Short name" color={true} register={{ ...register("shortName") }} placeholder="Short name" />
          <Input label="Number of beds" color={true} register={{ ...register("beds") }} placeholder="Number of Beds" />
          {/* buttones */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <button onClick={closeModal} className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light">
              Cancel
            </button>
            <Button label="Save" Icon={HiOutlineCheckCircle} type={true} loading={title === "Ward" ? createWardsLoad : createClinicsLoad} />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddClinicsModal;

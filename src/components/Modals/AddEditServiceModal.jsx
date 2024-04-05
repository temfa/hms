import React, { useEffect } from "react";
import Modal from "./Modal";
import { Button, Input, Textarea } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useServicesMutation } from "../../redux/api/mutationApi";
import { useSelector } from "react-redux";

function AddEditServiceModal({ closeModal, isOpen, datas }) {
  const roles = useSelector((state) => state.roles);
  const {
    register,
    handleSubmit,
    setValue,
    // watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (datas?.name) {
      setValue("name", datas.name);
      setValue("price", datas.price);
      setValue("description", datas.description);
    }
  }, [datas, setValue]);
  const [getAllServices, { data: getAllService, isSuccess: getAllServiceSuccess, isLoading: getAllServiceLoading, isError: getAllServiceFalse, error: getAllServiceErr }] =
    useServicesMutation();
  useEffect(() => {
    if (getAllServiceSuccess) {
      if (getAllService) {
        toast.success("Created Successfully");
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  }, [getAllService, getAllServiceSuccess, closeModal]);
  useEffect(() => {
    if (getAllServiceFalse) {
      if (getAllServiceErr) {
        console.log(getAllServiceErr);
      }
    }
  }, [getAllServiceErr, getAllServiceFalse]);

  const submit = (e) => {
    if (datas?.name) {
      const data = {
        "edit-service": true,
        user_id: roles.user_id,
        record_id: datas.id,
        date_created: datas.date_created,
        name: e.name,
        description: e.description,
        price: e.price,
      };
      getAllServices(data);
    } else {
      const data = {
        "create-service": true,
        user_id: roles.user_id,
        name: e.name,
        description: e.description,
        price: e.price,
      };
      getAllServices(data);
    }
  };

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} title={datas?.name ? "Edit Service" : "New Service"} width={"max-w-3xl"}>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex-colo gap-6">
          <Input label="Service Name" color={true} placeholder={datas?.name && datas.name} register={{ ...register("name", { required: "Service Name is required" }) }} />
          {errors.name && <span>{errors.name.message}</span>}
          <Input
            label="Price (Tsh)"
            type="number"
            color={true}
            placeholder={datas?.price ? datas.price : 0}
            register={{ ...register("price", { required: "Price is required" }) }}
          />
          {errors.price && <span>{errors.price.message}</span>}

          {/* des */}
          <Textarea
            label="Description"
            placeholder="Write description here..."
            color={true}
            rows={5}
            register={{ ...register("description", { required: "Description is required" }) }}
          />
          {errors.description && <span>{errors.description.message}</span>}
          {/* switch */}
          {/* <div className="flex items-center gap-2 w-full">
            <Switchi label="Status" checked={check} onChange={() => setCheck(!check)} />
            <p className={`text-sm ${check ? "text-subMain" : "text-textGray"}`}>{check ? "Enabled" : "Disabled"}</p>
          </div> */}
          {/* buttones */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <button onClick={closeModal} className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light">
              {datas?.name ? "Discard" : "Cancel"}
            </button>
            <Button label="Save" Icon={HiOutlineCheckCircle} loading={getAllServiceLoading} type={"submit"} />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddEditServiceModal;

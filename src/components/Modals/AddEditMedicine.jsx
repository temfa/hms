import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button, DatePickerComp, Input, Select, Textarea } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { sortsDatas } from "../Datas";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMedicineMutation } from "../../redux/api/mutationApi";
import { useSelector } from "react-redux";

function AddEditMedicineModal({ closeModal, isOpen, datas }) {
  const roles = useSelector((state) => state.roles);

  const [measures, setMeasures] = useState(sortsDatas.measure[0]);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [manufactureDate, setManufactureDate] = useState(new Date());

  useEffect(() => {
    if (datas?.name) {
      setMeasures({
        id: datas.measure,
        name: datas.measure,
      });
    }
  }, [datas]);

  const [getAllMedicines, { data: getAllMedicine, isSuccess: getAllMedicineSuccess, isLoading: getAllMedicineLoading, isError: getAllMedicineFalse, error: getAllMedicineErr }] =
    useMedicineMutation();
  useEffect(() => {
    if (getAllMedicineSuccess) {
      if (getAllMedicine) {
        // setAllMedicines(getAllMedicine?.data);
        if (Object.keys(datas).length > 0) {
          toast.success("Edited Successfully");
        } else {
          toast.success("Created Successfully");
        }
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  }, [getAllMedicine, getAllMedicineSuccess, closeModal, datas]);
  useEffect(() => {
    if (getAllMedicineFalse) {
      if (getAllMedicineErr) {
        console.log(getAllMedicineErr);
      }
    }
  }, [getAllMedicineErr, getAllMedicineFalse]);

  const { register, handleSubmit, setValue } = useForm();

  const submit = (e) => {
    let data;
    if (Object.keys(datas).length > 0) {
      data = {
        "edit-medicine": true,
        medicine_id: datas.id,
        generic_name: e.medicineName,
        brand_name: e.brandName,
        manufacturer: e.manufacturer,
        manufacture_date: manufactureDate,
        dosage_form: e.dosageForm,
        expiry_date: expiryDate,
        unit_price: e.price,
        stock_quantity: e.stock,
        description: e.description,
        measure: measures.name,
        user_id: roles.user_id,
      };
    } else {
      data = {
        "add-medicine": true,
        generic_name: e.medicineName,
        brand_name: e.brandName,
        manufacturer: e.manufacturer,
        manufacture_date: manufactureDate,
        dosage_form: e.dosageForm,
        expiry_date: expiryDate,
        unit_price: e.price,
        stock_quantity: e.stock,
        description: e.description,
        measure: measures.name,
        user_id: roles.user_id,
      };
    }
    getAllMedicines(data);
  };

  useEffect(() => {
    if (Object.keys(datas).length > 0) {
      setValue("medicineName", datas.generic_name);
      setValue("brandName", datas.brand_name);
      setValue("manufacturer", datas.manufacturer);
      setValue("dosageForm", datas.dosage_form);
      setValue("price", datas.unit_price);
      setValue("stock", datas.stock_quantity);
      setValue("description", datas.description);
      setMeasures({
        id: datas?.measure,
        name: datas?.measure,
      });
      if (datas?.manufacture_date !== undefined) {
        setManufactureDate(new Date(datas?.manufacture_date));
      }
      if (datas?.expiry_date !== undefined) {
        setExpiryDate(new Date(datas?.expiry_date));
      }
    }
  }, [datas, setValue]);

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} title={datas?.brand_name ? "Edit Medicine" : "New Medicine"} width={"max-w-3xl"}>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex-colo gap-6">
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input label="Medicine Name" color={true} placeholder="Medicine Name" register={{ ...register("medicineName", { required: "Medicine Name is required" }) }} />
            <Input label="Brand Name" color={true} placeholder="Brand Name" register={{ ...register("brandName", { required: "Brand Name is required" }) }} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input label="Manufacturer" color={true} placeholder="Manufacturer" register={{ ...register("manufacturer", { required: "Manufacturer is required" }) }} />
            <DatePickerComp label="Manufacture Date" startDate={manufactureDate} onChange={(date) => setManufactureDate(date)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {/* <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Dosage Form</p>
            <Select selectedPerson={measures} setSelectedPerson={setMeasures} datas={sortsDatas.measure}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {measures?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div> */}
            <Input label="Dosage Form" color={true} placeholder="Dosage Form" register={{ ...register("dosageForm", { required: "Doasage Form is required" }) }} />
            <DatePickerComp label="Expiry Date" startDate={expiryDate} onChange={(date) => setExpiryDate(date)} />
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Measure</p>
            <Select selectedPerson={measures} setSelectedPerson={setMeasures} datas={sortsDatas.measure}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {measures?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Input
              label="Price (₦)"
              type="number"
              color={true}
              placeholder={datas?.price ? datas.price : 0}
              register={{ ...register("price", { required: "Price is required" }) }}
            />
            <Input label="Instock" type="number" color={true} placeholder={datas?.stock ? datas.stock : 0} register={{ ...register("stock", { required: "Stock is required" }) }} />
          </div>

          {/* des */}
          <Textarea label="Description" placeholder="Write description here..." color={true} rows={5} register={{ ...register("description") }} />
          {/* buttones */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <button onClick={closeModal} className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light">
              {datas?.name ? "Discard" : "Cancel"}
            </button>
            <Button type="submit" loading={getAllMedicineLoading} label="Save" Icon={HiOutlineCheckCircle} />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddEditMedicineModal;

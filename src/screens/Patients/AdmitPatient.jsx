import React, { useEffect, useState } from "react";
import { Button, Select, Select2 } from "../../components/Form";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useAdmissionMutation } from "../../redux/api/mutationApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetAllWards } from "../../hooks/useGetAllWards";
import LoadingSkel from "../../components/LoadingSkel";

const AdmitPatient = ({ id }) => {
  const roles = useSelector((state) => state.roles);
  const { allWards, getAllWardLoading } = useGetAllWards();
  const [wards, setWard] = useState({ name: "Choose Ward..." });
  const [beds, setBeds] = useState({ name: "Choose Bed..." });
  const [bedNumber, setBedNumber] = useState([]);
  const {
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  useEffect(() => {
    const interval = setTimeout(() => {
      setBedNumber([]);
      allWards?.filter((e) => {
        if (e.name === wards.name) {
          e.ward_beds?.filter((item) => {
            if (item.bed_status === "vacant") setBedNumber((items) => [...items, item]);
            return true;
          });
        }
        return true;
      });
    }, 1000);

    return () => clearTimeout(interval);
  }, [allWards, wards, bedNumber]);
  const [admission, { data: newAdmitted, isLoading: newAdmittedLoad, isSuccess: newAdmittedSuccess, isError: newAdmittedFalse, error: newAdmittedErr }] = useAdmissionMutation();
  useEffect(() => {
    if (newAdmittedSuccess) {
      if (newAdmitted) {
        toast.success("Patient Admitted Successfully");
      }
    }
  }, [newAdmitted, newAdmittedSuccess]);
  useEffect(() => {
    if (newAdmittedFalse) {
      if (newAdmittedErr) {
        console.log(newAdmittedErr);
      }
    }
  }, [newAdmittedErr, newAdmittedFalse]);
  const onSubmit = () => {
    const datas = {
      "admit-patient": true,
      user_id: roles?.user_id,
      patient_id: id,
      ward_id: wards.id,
      bed_no: beds.bed_no,
    };
    admission(datas);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {getAllWardLoading ? (
        <LoadingSkel />
      ) : (
        <div className="flex-colo gap-4">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Ward</p>
            <Select selectedPerson={wards} setSelectedPerson={setWard} datas={allWards}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {wards?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Bed No.</p>
            <Select2 selectedPerson={beds} setSelectedPerson={setBeds} datas={bedNumber} test={true}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {beds?.bed_no} <BiChevronDown className="text-xl" />
              </div>
            </Select2>
          </div>
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
              loading={newAdmittedLoad}
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

export default AdmitPatient;

import React, { useState } from "react";
import { Button } from "../../components/Form";
import { BiPlus } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { medicalRecodData } from "../../components/Datas";
import MedicalRecodModal from "../../components/Modals/MedicalRecodModal";
import { useNavigate } from "react-router-dom";

const MedicalRecord = ({ id, medicalRecodData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [datas, setDatas] = useState({});
  const navigate = useNavigate();
  return (
    <>
      {
        // Modal
        isOpen && (
          <MedicalRecodModal
            closeModal={() => {
              setIsOpen(false);
              setDatas({});
            }}
            isOpen={isOpen}
            datas={datas}
          />
        )
      }
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-4">
          <h1 className="text-sm font-medium sm:block hidden">Medical Record</h1>
          <div className="sm:w-1/4 w-full">
            <Button
              label="New Record"
              Icon={BiPlus}
              onClick={() => {
                navigate(`/patients/visiting/${id}`);
              }}
            />
          </div>
        </div>
        {medicalRecodData.map((data, index) => (
          <div key={index} className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6">
            <div className="col-span-12 md:col-span-2">
              <p className="text-xs text-textGray font-medium">{data.date_created}</p>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              {/* {data?.data?.map((item, index) => (
               
              ))} */}
              <p className="text-xs text-main font-light">
                <span className="font-medium">Complaint:</span>
                {
                  // if value character is more than 40, show only 40 characters
                  data?.complains?.length > 40 ? `${data?.complains?.slice(0, 40)}...` : data?.complains
                }
              </p>
              <p className="text-xs text-main font-light">
                <span className="font-medium">Diagnosis:</span>
                {
                  // if value character is more than 40, show only 40 characters
                  data?.diagnosis?.length > 40 ? `${data?.diagnosis?.slice(0, 40)}...` : data?.diagnosis
                }
              </p>
              <p className="text-xs text-main font-light">
                <span className="font-medium">Treatment:</span>
                {
                  // if value character is more than 40, show only 40 characters
                  data?.treatment?.length > 40 ? `${data?.treatment?.slice(0, 40)}...` : data?.treatment
                }
              </p>
              <p className="text-xs text-main font-light">
                <span className="font-medium">Prescription:</span>
                {
                  // if value character is more than 40, show only 40 characters
                  data?.prescription?.length > 40 ? `${data?.prescription?.slice(0, 40)}...` : data?.prescription
                }
              </p>
            </div>
            {/* price */}
            {/* <div className="col-span-12 md:col-span-2">
              <p className="text-xs text-subMain font-semibold">
                <span className="font-light text-main">(Tsh)</span> {data?.amount}
              </p>
            </div> */}
            {/* actions */}
            <div className="col-span-12 md:col-span-2 flex-rows gap-2">
              <button
                onClick={() => {
                  setIsOpen(true);
                  setDatas(data);
                }}
                className="text-sm flex-colo bg-white text-subMain border border-border rounded-md w-2/4 md:w-10 h-10">
                <FiEye />
              </button>
              <button
                onClick={() => {
                  toast.error("This feature is not available yet");
                }}
                className="text-sm flex-colo bg-white text-red-600 border border-border rounded-md w-2/4 md:w-10 h-10">
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MedicalRecord;

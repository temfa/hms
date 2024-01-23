import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Select2, Textarea } from "../../components/Form";
import { BiChevronDown, BiPlus } from "react-icons/bi";
import { medicineData } from "../../components/Datas";
import { MedicineDosageTable } from "../../components/Tables";
import { toast } from "react-hot-toast";
import MedicineDosageModal from "../../components/Modals/MedicineDosage";
import { FaTimes } from "react-icons/fa";
import Uploader from "../../components/Uploader";
import { HiOutlineCheckCircle } from "react-icons/hi";
import LoadingSkel from "../../components/LoadingSkel";
import { usePatientMutation, useUsersMutation } from "../../redux/api/mutationApi";
import { calculate_age } from "../../utils/data";

// const doctorsData = memberData.map((item) => {
//   return {
//     id: item.id,
//     name: item.title,
//   };
// });

const NewMedicalRecode = () => {
  const location = useLocation();
  const locate = location.pathname.split("/");
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState({ fullname: "Choose Doctor" });
  const [doctorData, setDoctorData] = useState([]);
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  // const [treatmeants, setTreatmeants] = useState(
  //   servicesData.map((item) => {
  //     return {
  //       name: item.name,
  //       checked: false,
  //       price: item.price,
  //     };
  //   })
  // );

  // on change treatmeants
  // const onChangeTreatmeants = (e) => {
  //   const { name, checked } = e.target;
  //   const newTreatmeants = treatmeants.map((item) => {
  //     if (item.name === name) {
  //       return {
  //         ...item,
  //         checked: checked,
  //       };
  //     }
  //     return item;
  //   });
  //   setTreatmeants(newTreatmeants);
  // };

  const [patient, { data: patientNew, isLoading: patientNewLoad, isSuccess: patientNewSuccess, isError: patientNewFalse, error: patientNewErr }] = usePatientMutation();

  useEffect(() => {
    const locate = location.pathname.split("/");
    const data = {
      "single-patient": true,
      patient_id: locate[locate.length - 1],
    };
    patient(data);
  }, [location.pathname, patient]);

  useEffect(() => {
    if (patientNewSuccess) {
      if (patientNew) {
        setData(patientNew);
      }
    }
  }, [patientNew, patientNewSuccess]);
  useEffect(() => {
    if (patientNewFalse) {
      if (patientNewErr) {
        console.log(patientNewErr);
        toast.error(patientNewErr.data.error);
        if (patientNewErr.data.error === "User not found") {
          navigate("/patients");
        }
      }
    }
  }, [patientNewErr, patientNewFalse, navigate]);
  const [getAllDoctors, { data: getAllDoctor, isSuccess: getAllDoctorSuccess, isError: getAllDoctorFalse, error: getAllDoctorErr }] = useUsersMutation();
  useEffect(() => {
    if (getAllDoctorSuccess) {
      if (getAllDoctor) {
        getAllDoctor?.data?.filter((item) => {
          if (item.role === "Doctor") setDoctorData((arr) => [...arr, item]);
          return true;
        });
        // toast.success("Patient Created Successfully");
        // getAllDoctor?.data.map((item) => {
        //   if (new Date(item.registration_date).getDate() === new Date().getDate()) todayData.push(item);
        //   if (new Date(item.registration_date).getMonth() === new Date().getMonth()) monthlyData.push(item);
        //   return true;
        // });
      }
    }
  }, [getAllDoctor, getAllDoctorSuccess]);
  useEffect(() => {
    if (getAllDoctorFalse) {
      if (getAllDoctorErr) {
        console.log(getAllDoctorErr);
      }
    }
  }, [getAllDoctorErr, getAllDoctorFalse]);
  useEffect(() => {
    getAllDoctors({ "all-users": true });
  }, [getAllDoctors]);

  return (
    <Layout>
      {
        // modal
        isOpen && (
          <MedicineDosageModal
            isOpen={isOpen}
            closeModal={() => {
              setIsOpen(false);
            }}
          />
        )
      }
      <div className="flex items-center gap-4">
        <Link to={`/patients/preview/${locate[locate.length - 1]}`} className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md">
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">New Medical Record</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        {patientNewLoad ? (
          <LoadingSkel />
        ) : (
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28">
            <img src="/images/user.jpeg" alt="setting" className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain" />
            <div className="gap-2 flex-colo">
              <h2 className="text-sm font-semibold">{data?.fullname}</h2>
              <p className="text-xs text-textGray">{data?.email}</p>
              <p className="text-xs">{data?.phone}</p>
              <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">{calculate_age(new Date(data?.date_of_birth))} yrs </p>
            </div>
          </div>
        )}
        {/* tab panel */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
          <div className="flex w-full flex-col gap-5">
            {/* doctor */}
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Doctor</p>
              <Select2 selectedPerson={doctors} setSelectedPerson={setDoctors} datas={doctorData}>
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {doctors.fullname} <BiChevronDown className="text-xl" />
                </div>
              </Select2>
            </div>
            {/* complains */}
            <Textarea label="Complains" color={true} rows={3} placeholder={"Bad breath, toothache, ...."} />
            <Textarea label="Doctors's Examination" color={true} rows={3} placeholder={"Bad breath, toothache, ...."} />
            {/* Diagnosis */}
            <Textarea label="Diagnosis" color={true} rows={3} placeholder={"Gingivitis, Periodontitis, ...."} />
            {/* Vital Signs */}
            <Textarea label="Vital Signs" color={true} rows={3} placeholder={"Blood pressure, Pulse, ...."} />
            {/* Treatment */}
            {/* <div className="flex w-full flex-col gap-4">
              <p className="text-black text-sm">Treatment</p>
              <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-6 pb-6">
                {servicesData?.slice(1, 100).map((item) => (
                  <Checkbox label={item.name} checked={treatmeants.find((i) => i.name === item.name).checked} onChange={onChangeTreatmeants} name={item.name} key={item.id} />
                ))}
              </div>
            </div> */}
            {/* medicine */}
            <div className="flex w-full flex-col gap-4 mb-6">
              <p className="text-black text-sm">Medicine</p>
              <div className="w-full overflow-x-scroll">
                <MedicineDosageTable
                  data={medicineData?.slice(0, 3)}
                  functions={{
                    delete: (id) => {
                      toast.error("This feature is not available yet");
                    },
                  }}
                  button={true}
                />
              </div>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm">
                <BiPlus /> Add Medicine
              </button>
            </div>
            {/* attachment */}
            <div className="flex w-full flex-col gap-4">
              <p className="text-black text-sm">Attachments</p>
              <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {[1, 2, 3, 4].map((_, i) => (
                  <div className="relative w-full" key={i}>
                    <img src={`https://placehold.it/300x300?text=${i}`} alt="patient" className="w-full  md:h-40 rounded-lg object-cover" />
                    <button onClick={() => toast.error("This feature is not available yet.")} className="bg-white rounded-full w-8 h-8 flex-colo absolute -top-1 -right-1">
                      <FaTimes className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <Uploader setImage={{}} />
            </div>
            {/* submit */}
            <Button
              label={"Save"}
              Icon={HiOutlineCheckCircle}
              onClick={() => {
                toast.error("This feature is not available yet");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewMedicalRecode;

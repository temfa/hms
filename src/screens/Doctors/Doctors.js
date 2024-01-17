import React, { useEffect, useState } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import { toast } from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import Layout from "../../Layout";
import { Button } from "../../components/Form";
import { DoctorsTable } from "../../components/Tables";
import { useNavigate } from "react-router-dom";
import AddDoctorModal from "../../components/Modals/AddDoctorModal";
import { useUsersMutation } from "../../redux/api/mutationApi";

function Doctors() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const navigate = useNavigate();

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const preview = (data) => {
    navigate(`/doctors/preview/${data}`);
  };

  const deleteItem = (data) => {
    const datas = {
      "delete-user": true,
      user_id: data,
    };
    getAllDoctors(datas);
  };

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
        // add doctor modal
        isOpen && <AddDoctorModal closeModal={onCloseModal} isOpen={isOpen} doctor={true} datas={null} />
      }
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb">
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <h1 className="text-xl font-semibold">Doctors</h1>
      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" data-aos-offset="200" className="bg-white my-8 rounded-xl border-[1px] border-border p-5">
        {/* datas */}

        <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
          </div>

          {/* export */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error("Exporting is not available yet");
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <DoctorsTable
            doctor={true}
            data={doctorData}
            functions={{
              preview: preview,
            }}
            deleteItem={{
              deleteItem: deleteItem,
            }}
            search={search}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Doctors;

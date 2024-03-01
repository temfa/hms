import React, { useEffect, useState } from "react";
import { healthInfo } from "../../components/Datas";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useMedicalRecordMutation } from "../../redux/api/mutationApi";
import AddEditMedicineModal from "../../components/Modals/AddEditMedicine";
import LoadingSkel from "../../components/LoadingSkel";
import { AllegiesTable, HistoryTable, ImmunizationTable, VitalsTable } from "../../components/Tables";
import Allegies from "../../components/HealthInfo/allegies";
import Immunization from "../../components/HealthInfo/immunization";
import History from "../../components/HealthInfo/history";
import Vitals from "../../components/HealthInfo/vitals";

// Health Information
// allergies
// habits
// Medical History

const HealthInfomation = ({ data, id }) => {
  const [activeTab, setActiveTab] = useState("Vitals");
  const [modal, setModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [immunizationData, setImmunizationData] = useState([]);
  // const [bloodType, setBloodType] = useState(sortsDatas.bloodTypeFilter[0]);

  const onCloseModal = () => {
    setModal(false);
    //  setData({});
  };

  const switchTab = () => {
    switch (activeTab) {
      case "Vitals":
        return <VitalsTable data={immunizationData} action={() => setModal(true)} />;
      case "Allegies":
        return <AllegiesTable data={immunizationData} />;

      case "History Examination":
        return <HistoryTable data={immunizationData} action={() => setModal(true)} />;

      case "Immunization":
        return <ImmunizationTable data={immunizationData} />;
      default:
        return <VitalsTable data={immunizationData} action={() => setModal(true)} />;
    }
  };
  const switchForm = () => {
    switch (activeTab) {
      case "Vitals":
        return (
          <Vitals
            id={id}
            action={() => {
              setAdd(false);
              setActiveTab("Vitals");
            }}
          />
        );
      case "Allegies":
        return (
          <Allegies
            id={id}
            action={() => {
              setAdd(false);
              setActiveTab("Vitals");
            }}
          />
        );

      case "History Examination":
        return (
          <History
            id={id}
            action={() => {
              setAdd(false);
              setActiveTab("Vitals");
            }}
          />
        );

      case "Immunization":
        return (
          <Immunization
            id={id}
            action={() => {
              setAdd(false);
              setActiveTab("Vitals");
            }}
          />
        );
      default:
        return (
          <Vitals
            id={id}
            action={() => {
              setAdd(false);
              setActiveTab("Vitals");
            }}
          />
        );
    }
  };

  // useEffect(() => {
  //   setBloodType({ name: data?.blood_group });
  // }, [data]);

  const [immunizations, { data: immunization, isLoading: immunizationLoad, isSuccess: immunizationSuccess, isError: immunizationFalse, error: immunizationErr }] =
    useMedicalRecordMutation();

  useEffect(() => {
    let data =
      activeTab === "Vitals"
        ? {
            "patient-vitals": true,
            patient_id: id,
          }
        : activeTab === "Immunization"
        ? {
            "patient-immunization": true,
            patient_id: id,
          }
        : activeTab === "Allegies"
        ? {
            "patient-allegies": true,
            patient_id: id,
          }
        : activeTab === "History Examination"
        ? {
            "patient-history-examination": true,
            patient_id: id,
          }
        : {};
    immunizations(data);
  }, [immunizations, id, activeTab]);

  useEffect(() => {
    if (immunizationSuccess) {
      if (immunization) {
        setImmunizationData(immunization.data);
      }
    }
  }, [immunization, immunizationSuccess]);
  useEffect(() => {
    if (immunizationFalse) {
      if (immunizationErr) {
        console.log(immunizationErr);
        toast.error(immunizationErr?.data?.error);
      }
    }
  }, [immunizationErr, immunizationFalse]);

  return (
    <>
      <div className="w-full pb-10">
        <div className="relative right-0">
          <ul className="relative flex flex-wrap p-1 list-none rounded-lg bg-blueGray" data-tabs="tabs">
            {healthInfo?.map((item) => {
              return (
                <li className="z-30 flex-auto text-center" onClick={() => setActiveTab(item.title)} key={item.id}>
                  <p
                    className={
                      activeTab === item.title
                        ? "bg-white z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 "
                        : "bg-inherit z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 "
                    }
                    data-tab-target=""
                    role="tab"
                    aria-selected="true">
                    <span className="ml-1">{item.title}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        {add ? null : (
          <button
            onClick={() => setAdd(true)}
            className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-0 right-12 button-fb">
            <BiPlus className="text-2xl" />
          </button>
        )}
      </div>
      {immunizationLoad ? <LoadingSkel /> : add ? switchForm() : switchTab()}
      {modal && activeTab === "Vitals" ? <AddEditMedicineModal datas={{}} isOpen={modal} closeModal={onCloseModal} /> : null}
    </>
  );
};

export default HealthInfomation;

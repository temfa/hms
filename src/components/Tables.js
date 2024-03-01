import React, { useState } from "react";
import { MenuSelect } from "./Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit, FiEye } from "react-icons/fi";
import { RiDeleteBin6Line, RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { calculate_age } from "../utils/data";
import { formatter } from "../utils/formatter";

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

export function Transactiontable({ data, action, functions }) {
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (data) => {
        functions.edit(data.id);
      },
    },
    {
      title: "View",
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data.id);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>Patient</th>
          <th className={thclass}>Date</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>
            Amout <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Method</th>
          {action && <th className={thclass}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclass}>{index + 1}</td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <span className="w-12">
                  <img src={item.user.image} alt={item.user.title} className="w-full h-12 rounded-full object-cover border border-border" />
                </span>

                <div>
                  <h4 className="text-sm font-medium">{item.user.title}</h4>
                  <p className="text-xs mt-1 text-textGray">{item.user.phone}</p>
                </div>
              </div>
            </td>
            <td className={tdclass}>{item.date}</td>
            <td className={tdclass}>
              <span
                className={`py-1 px-4 ${
                  item.status === "Paid"
                    ? "bg-subMain text-subMain"
                    : item.status === "Pending"
                    ? "bg-orange-500 text-orange-500"
                    : item.status === "Cancel" && "bg-red-600 text-red-600"
                } bg-opacity-10 text-xs rounded-xl`}>
                {item.status}
              </span>
            </td>
            <td className={`${tdclass} font-semibold`}>{item.amount}</td>
            <td className={tdclass}>{item.method}</td>
            {action && (
              <td className={tdclass}>
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//Immunization table
export const ImmunizationTable = ({ data }) => {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>S/N</th>
          <th className={thclass}>Immunization</th>
          <th className={thclass}>Date Given</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="border-b border-border hover:bg-greyed transitions" key={index}>
            <td className={tdclass}>
              <p className="text-xs">{index + 1}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.immunization}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.date_given}</p>
            </td>

            {/* <td className={tdclass}>
                <button onClick={() => functions.preview(item.id)} className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10">
                  <FiEye />
                </button>
              </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//Allegies table
export const AllegiesTable = ({ data }) => {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>S/N</th>
          <th className={thclass}>Allergy Type</th>
          <th className={thclass}>Allegen</th>
          <th className={thclass}>Reaction</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="border-b border-border hover:bg-greyed transitions" key={index}>
            <td className={tdclass}>
              <p className="text-xs">{index + 1}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.allergy_type}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.allegen}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.reaction}</p>
            </td>

            {/* <td className={tdclass}>
                <button onClick={() => functions.preview(item.id)} className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10">
                  <FiEye />
                </button>
              </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//Vitals Table
export const VitalsTable = ({ data, action }) => {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>S/N</th>
          <th className={thclass}>Temp</th>
          <th className={thclass}>Weight</th>
          <th className={thclass}>Height</th>
          <th className={thclass}>Resp. Rate</th>
          <th className={thclass}>Heart Rate</th>
          <th className={thclass}>Blood Sugar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="border-b border-border hover:bg-greyed transitions" onClick={action} key={index}>
            <td className={tdclass}>
              <p className="text-xs">{index + 1}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.temperature}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.weight}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.height}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{item.respiratory_rate}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{item.heart_rate}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{item.blood_sugar_f}</p>
            </td>

            {/* <td className={tdclass}>
                <button onClick={() => functions.preview(item.id)} className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10">
                  <FiEye />
                </button>
              </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
//Vitals Table
export const HistoryTable = ({ data, action }) => {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>S/N</th>
          <th className={thclass}>Complaint</th>
          <th className={thclass}>Phy. Exam.</th>
          <th className={thclass}>Gen. Exam</th>
          <th className={thclass}>Resp.</th>
          <th className={thclass}>Med. Hist.</th>
          <th className={thclass}>Fam. Hist.</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="border-b border-border hover:bg-greyed transitions" onClick={action} key={index}>
            <td className={tdclass}>
              <p className="text-xs">{index + 1}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.presenting_complaint_history}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.physical_examination}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.general_examination}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{item.respiration}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{item.medical_history}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{item.family_history}</p>
            </td>

            {/* <td className={tdclass}>
                <button onClick={() => functions.preview(item.id)} className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10">
                  <FiEye />
                </button>
              </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// invoice table
export function InvoiceTable({ data }) {
  const navigate = useNavigate();
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        navigate(`/invoices/edit/${item.id}`);
      },
    },
    {
      title: "View",
      icon: FiEye,
      onClick: (item) => {
        navigate(`/invoices/preview/${item.id}`);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Invoice ID</th>
          <th className={thclass}>Patient</th>
          <th className={thclass}>Created Date</th>
          <th className={thclass}>Due Date</th>
          <th className={thclass}>
            Amout <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclass}>#{item?.id}</td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <span className="w-12">
                  <img src={item?.to?.image} alt={item?.to?.title} className="w-full h-12 rounded-full object-cover border border-border" />
                </span>
                <div>
                  <h4 className="text-sm font-medium">{item?.to?.title}</h4>
                  <p className="text-xs mt-1 text-textGray">{item?.to?.email}</p>
                </div>
              </div>
            </td>
            <td className={tdclass}>{item?.createdDate}</td>
            <td className={tdclass}>{item?.dueDate}</td>
            <td className={`${tdclass} font-semibold`}>{item?.total}</td>
            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// clinic table
export function ClinicTable({ data }) {
  const navigate = useNavigate();
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        navigate(`/invoices/edit/${item.id}`);
      },
    },
    {
      title: "View",
      icon: FiEye,
      onClick: (item) => {
        navigate(`/invoices/preview/${item.id}`);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}> ID</th>
          <th className={thclass}> Name</th>
          <th className={thclass}> Short Name</th>
          <th className={thclass}>No. Doctors</th>
          <th className={thclass}>No. Nurses</th>
          <th className={thclass}>No. Patients</th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclass}>#{item?.id}</td>
            <td className={tdclass}>{item.name}</td>
            <td className={tdclass}>{item?.short_code}</td>
            <td className={tdclass}>10</td>
            <td className={`${tdclass} font-semibold`}>10</td>
            <td className={`${tdclass} font-semibold`}>10</td>
            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// prescription table
export function MedicineTable({ data, onEdit }) {
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        onEdit(item);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Name</th>
          <th className={thclass}>
            Price <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Status</th>
          <th className={thclass}>InStock</th>
          <th className={thclass}>Measure</th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclass}>
              <h4 className="text-sm font-medium capitalize">{item?.generic_name}</h4>
            </td>
            <td className={`${tdclass} font-semibold`}>{formatter.format(item?.unit_price)}</td>
            <td className={tdclass}>
              <span className={`text-xs font-medium ${item?.stock_quantity === 0 ? "text-red-600" : "text-green-600"}`}>
                {item?.stock_quantity === 0 ? "Out of Stock" : "In Stock"}
              </span>
            </td>
            <td className={tdclass}>{item?.stock_quantity}</td>
            <td className={tdclass}>{item?.measure}</td>
            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// service table
export function ServiceTable({ data, onEdit }) {
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        onEdit(item);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Name</th>
          <th className={thclass}>Created At</th>
          <th className={thclass}>
            Price <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Status</th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclass}>
              <h4 className="text-sm font-medium">{item?.name}</h4>
            </td>
            <td className={tdclass}>{item?.date}</td>
            <td className={`${tdclass} font-semibold`}>{item?.price}</td>
            <td className={tdclass}>
              <span className={`text-xs font-medium ${!item?.status ? "text-red-600" : "text-green-600"}`}>{!item?.status ? "Disabled" : "Enabled"}</span>
            </td>
            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// patient table
export const PatientTable = ({ data, functions, used, name, sort }) => {
  const dataCopy = [...data];
  const [pageNumber, setPageNumber] = useState(1);

  const usersPerPage = 20;
  const lastIndex = pageNumber * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const pageCount = Math.ceil(dataCopy.length / usersPerPage);
  const number = [...Array(pageCount + 1).keys()].slice(1);

  const prePage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const nextPage = () => {
    if (pageNumber !== pageCount) {
      setPageNumber(pageNumber + 1);
    }
  };

  const changeCPage = (n) => {
    setPageNumber(n);
  };
  const DropDown1 = [
    {
      title: "View",
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data.patient_id);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];

  const thclasse = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
  const tdclasse = "text-start text-xs py-4 px-2 whitespace-nowrap";
  return (
    <>
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclasse}>#</th>
            <th className={thclasse}>Patient</th>
            <th className={thclasse}>Patient ID</th>
            <th className={thclasse}>Created At</th>
            <th className={thclasse}>Gender</th>
            <th className={thclasse}>Blood Group</th>
            <th className={thclasse}>Age</th>
            <th className={thclasse}>Actions</th>
          </tr>
        </thead>
        {dataCopy.length === 0 ? (
          <p>No Paitent Yet</p>
        ) : (
          <tbody>
            {dataCopy
              ?.sort((x, y) => {
                let a = new Date(x?.registration_date),
                  b = new Date(y?.registration_date);
                if (sort.name === "Oldest Patients") {
                  return a - b;
                } else if (sort.name === "Newest Patients") {
                  return b - a;
                } else return true;
              })
              ?.filter((el) => el?.fullname.toLowerCase().includes(name.toLowerCase()))
              ?.slice(firstIndex, lastIndex)
              ?.map((item, index) => {
                let name = item?.fullname.split(" ");
                return (
                  <tr key={index} className="border-b border-border hover:bg-greyed transitions">
                    <td className={tdclasse}>{index + 1}</td>
                    <td className={tdclasse}>
                      <div className="flex gap-4 items-center">
                        {/* {used && (
                        <span className="w-12">
                          <img src={item?.image} alt={item?.fullname} className="w-full h-12 rounded-full object-cover border border-border" />
                        </span>
                      )} */}

                        <div>
                          <h4 className="text-sm font-medium">{`${name[0]} ${name[1] === undefined ? "" : name[1]}`}</h4>
                          <p className="text-xs mt-1 text-textGray">{item?.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className={tdclasse}>{item?.patient_id}</td>
                    <td className={tdclasse}>{new Date(item?.registration_date).toDateString()}</td>

                    <td className={tdclasse}>
                      <span
                        className={`py-1 px-4 ${
                          item.gender.toLowerCase() === "male" ? "bg-subMain text-subMain" : "bg-orange-500 text-orange-500"
                        } bg-opacity-10 text-xs rounded-xl`}>
                        {item.gender}
                      </span>
                    </td>

                    <td className={tdclasse}>{item?.blood_group === "" ? "0+" : item?.blood_group}</td>
                    <td className={tdclasse}>{calculate_age(new Date(item?.date_of_birth))}</td>

                    <td className={tdclasse}>
                      <MenuSelect datas={DropDown1} item={item}>
                        <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                          <BiDotsHorizontalRounded />
                        </div>
                      </MenuSelect>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={prePage}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
          </svg>
          Previous
        </button>
        <div className="flex items-center gap-2">
          {number?.map((item, index) => (
            <button
              className={
                pageNumber === item
                  ? "relative h-10 max-h-[40px] w-10 max-[40px] select-none rounded-full bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  : "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              }
              type="button"
              key={index}
              onClick={() => changeCPage(item)}>
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{item}</span>
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={nextPage}>
          Next
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

// doctor table
export function DoctorsTable({ data, functions, doctor, search, deleteItem }) {
  // const [deleteState, setDeleteState] = useState(false);
  const DropDown1 = [
    {
      title: "View",
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data?.user_id);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: (data) => {
        deleteItem.deleteItem(data?.user_id);
        // setDeleteState(true);
      },
    },
  ];
  return (
    <>
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>#</th>
            <th className={thclass}>{doctor}</th>
            <th className={thclass}>User ID</th>
            <th className={thclass}>Phone</th>
            <th className={thclass}>Email</th>
            <th className={thclass}>Gender</th>
            <th className={thclass}>Status</th>
            <th className={thclass}>Address</th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.filter((item) => item?.fullname.toLowerCase().includes(search.toLowerCase()))
            ?.map((item, index) => {
              let name = item?.fullname.split(" ");
              return (
                <tr key={index} className="border-b border-border hover:bg-greyed transitions">
                  <td className={tdclass}>{index + 1}</td>
                  <td className={tdclass}>
                    <div className="flex gap-4 items-center">
                      {/* <span className="w-12">
                  <img src={item.user.image} alt={item.user.title} className="w-full h-12 rounded-full object-cover border border-border" />
                </span> */}
                      <h4 className="text-sm font-medium">{`${name[0]} ${name[1] === undefined ? "" : name[1]}`}</h4>
                    </div>
                  </td>
                  <td className={tdclass}>
                    <p className="text-textGray">{item?.user_id}</p>
                  </td>
                  <td className={tdclass}>
                    <p className="text-textGray">{item?.contact_number}</p>
                  </td>
                  {/* <td className={tdclass}>{"Dr"}</td> */}
                  <td className={tdclass}>{item?.email}</td>
                  <td className={tdclass}>{item.gender}</td>
                  <td className={tdclass}>
                    <span className={`py-1 px-4 ${item.is_active === "1" ? "bg-subMain text-subMain" : "bg-orange-500 text-orange-500"} bg-opacity-10 text-xs rounded-xl`}>
                      {item.is_active === "1" ? "Active" : "Not Active"}
                    </span>
                  </td>
                  <td className={tdclass}>{item.address}</td>
                  <td className={tdclass}>
                    <MenuSelect datas={DropDown1} item={item}>
                      <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                        <BiDotsHorizontalRounded />
                      </div>
                    </MenuSelect>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* {deleteState ? (
        <div
          data-dialog-backdrop="dialog"
          data-dialog-backdrop-close="true"
          className="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300">
          <div
            data-dialog="dialog"
            className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
            <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">Its a simple dialog.</div>
            <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
              The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears,
              and I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan luv.
            </div>
            <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
              <button
                data-ripple-dark="true"
                data-dialog-close="true"
                className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Cancel
              </button>
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null} */}
    </>
  );
}

// appointment table
export function AppointmentTable({ data, functions, doctor }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Date</th>
          <th className={thclass}>{doctor ? "Patient" : "Doctor"}</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>Time</th>
          <th className={thclass}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclass}>
              <p className="text-xs">{item.date}</p>
            </td>
            <td className={tdclass}>
              <h4 className="text-xs font-medium">{doctor ? item.user.title : item.doctor.title}</h4>
              <p className="text-xs mt-1 text-textGray">{doctor ? item.user.phone : item.doctor.phone}</p>
            </td>
            <td className={tdclass}>
              <span
                className={`py-1  px-4 ${
                  item.status === "Approved"
                    ? "bg-subMain text-subMain"
                    : item.status === "Pending"
                    ? "bg-orange-500 text-orange-500"
                    : item.status === "Cancel" && "bg-red-600 text-red-600"
                } bg-opacity-10 text-xs rounded-xl`}>
                {item.status}
              </span>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{`${item.from} - ${item.to}`}</p>
            </td>

            <td className={tdclass}>
              <button onClick={() => functions.preview(item)} className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10">
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// payment table
export function PaymentTable({ data, functions, doctor }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Date</th>
          <th className={thclass}>{doctor ? "Patient" : "Doctor"}</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>Amount</th>
          <th className={thclass}>Method</th>
          <th className={thclass}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclass}>
              <p className="text-xs">{item.date}</p>
            </td>
            <td className={tdclass}>
              <h4 className="text-xs font-medium">{doctor ? item.user.title : item.doctor.title}</h4>
              <p className="text-xs mt-1 text-textGray">{doctor ? item.user.phone : item.doctor.phone}</p>
            </td>
            <td className={tdclass}>
              <span
                className={`py-1  px-4 ${
                  item.status === "Paid"
                    ? "bg-subMain text-subMain"
                    : item.status === "Pending"
                    ? "bg-orange-500 text-orange-500"
                    : item.status === "Cancel" && "bg-red-600 text-red-600"
                } bg-opacity-10 text-xs rounded-xl`}>
                {item.status}
              </span>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{`$${item.amount}`}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.method}</p>
            </td>

            <td className={tdclass}>
              <button onClick={() => functions.preview(item.id)} className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10">
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// invoice used table
export function InvoiceUsedTable({ data, functions }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Invoice ID</th>
          <th className={thclass}>Create Date</th>
          <th className={thclass}>Due Date</th>
          <th className={thclass}>Amount</th>
          <th className={thclass}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclass}>
              <p className="text-xs">#{item.id}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.createdDate}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.dueDate}</p>
            </td>

            <td className={tdclass}>
              <p className="text-xs font-semibold">{`$${item.total}`}</p>
            </td>

            <td className={tdclass}>
              <button onClick={() => functions.preview(item.id)} className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10">
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// invoice table
export function InvoiceProductsTable({ data, functions, button }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Item</th>
          <th className={thclass}>
            Item Price
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          <th className={thclass}>Quantity</th>
          <th className={thclass}>
            Amout
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          {button && <th className={thclass}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={`${tdclass}  font-medium`}>{item.name}</td>
            <td className={`${tdclass} text-xs`}>{item.price}</td>
            <td className={tdclass}>{item.id}</td>
            <td className={tdclass}>{item.price * item.id}</td>
            {button && (
              <td className={tdclass}>
                <button onClick={() => functions.deleteItem(item.id)} className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm">
                  <RiDeleteBinLine />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// medicine Dosage table

export function MedicineDosageTable({ data, functions, button }) {
  const thclasse = "text-start text-xs font-medium py-3 px-2 whitespace-nowrap";
  const tdclasse = "text-start text-xs py-4 px-2 whitespace-nowrap";
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclasse}>Item</th>
          <th className={thclasse}>
            Item Price
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          <th className={thclasse}>Dosage</th>
          <th className={thclasse}>Instraction</th>
          <th className={thclasse}>Quantity</th>
          <th className={thclasse}>
            Amout
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          {button && <th className={thclasse}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-greyed transitions">
            <td className={tdclasse}>{item.name}</td>
            <td className={tdclasse}>{item.price}</td>
            <td className={tdclasse}>{item.id} - M/A/E</td>
            <td className={tdclasse}>{item.instraction}</td>
            <td className={tdclasse}>{item.id}</td>
            <td className={tdclasse}>{item.price * item.id}</td>
            {button && (
              <td className={tdclasse}>
                <button onClick={() => functions.delete(item.id)} className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm">
                  <RiDeleteBinLine />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

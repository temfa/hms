import React, { useEffect, useState } from "react";
// import Uploder from "../Uploader";
import { location, sortsDatas } from "../Datas";
import { Button, DatePickerComp, Input, Select, Select2 } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";
// import { RiDeleteBin5Line } from "react-icons/ri";

function PersonalInfo({ titles }) {
  const [title, setTitle] = useState(sortsDatas.title[0]);
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [state, setState] = useState(location[0]);
  const [lga, setLga] = useState({ name: "Choose LGA..." });
  const [lgaValue, setLgaValue] = useState([]);
  useEffect(() => {
    location?.filter((e) => {
      if (e.name === state.name) setLgaValue(e.localGoverment);
      return true;
    });
  }, [state]);
  return (
    <div className="flex-colo gap-4">
      {/* uploader */}
      {/* <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Profile Image</p>
        <Uploder />
      </div> */}
      {/* select  */}
      {titles && (
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Title</p>
          <Select selectedPerson={title} setSelectedPerson={setTitle} datas={sortsDatas.title}>
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
              {title?.name} <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
      )}

      {/* fullName */}
      <Input label="Full Name" color={true} type="text" />
      {/* phone */}
      <Input label="Phone Number" color={true} type="number" />
      {/* email */}
      <Input label="Email" color={true} type="email" />
      <DatePickerComp label="Date of Birth" startDate={date} onChange={(date) => setDate(date)} />
      {!titles && (
        <>
          {/* address */}
          <Input label="Address" color={true} type="text" />
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">State</p>
            <Select selectedPerson={state} setSelectedPerson={setState} datas={location}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {state?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {state.name === "Choose State..." ? null : (
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Local Government</p>
              <Select2 selectedPerson={lga} setSelectedPerson={setLga} datas={lgaValue}>
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {lga?.name} <BiChevronDown className="text-xl" />
                </div>
              </Select2>
            </div>
          )}
          {/* gender */}
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Gender</p>
            <Select selectedPerson={gender} setSelectedPerson={setGender} datas={sortsDatas.genderFilter}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {gender?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {/* emergancy contact */}
          <Input label="Emergency Cotact" color={true} type="text" />
          <Input label="Emergency Cotact Phone" color={true} type="number" />
          <Input label="Emergency Cotact Address" color={true} type="text" />
        </>
      )}
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
          label={"Save Changes"}
          Icon={HiOutlineCheckCircle}
          onClick={() => {
            toast.error("This feature is not available yet");
          }}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;

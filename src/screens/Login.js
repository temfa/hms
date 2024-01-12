import React, { useState } from "react";
import { Button, Input, Select } from "../components/Form";
import { BiChevronDown, BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { setRoles } from "../redux/slice/roles";
import toast from "react-hot-toast";
import { sortsDatas } from "../components/Datas";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "Choose User..." });
  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo">
        <img src="/images/logo.png" alt="logo" className="w-48 h-16 object-contain" />
        <div className="flex flex-col gap-4 w-full mb-6">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">User</p>
            <Select selectedPerson={user} setSelectedPerson={setUser} datas={sortsDatas.roles}>
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {user?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <Input label="Email" type="email" color={true} placeholder={"admin@gmail.com"} />
          <Input label="Password" type="password" color={true} placeholder={"*********"} />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Button
            label="Login"
            Icon={BiLogInCircle}
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              if (user.name === "Choose User...") {
                toast.error("Please choose a User");
                setLoading(false);
              } else {
                setTimeout(() => {
                  dispatch(setRoles(user.name));
                  navigate("/dashboard");
                }, 1500);
              }
            }}
          />
        )}
      </form>
    </div>
  );
};

export default Login;

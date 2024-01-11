import React, { useState } from "react";
import { Button, Input } from "../components/Form";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo">
        <img src="/images/logo.png" alt="logo" className="w-48 h-16 object-contain" />
        <div className="flex flex-col gap-4 w-full mb-6">
          <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            <div class="flex w-full divide-x divide-gray-800 row">
              <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full rounded-r-none border-r-0"
                type="button">
                Doctors
              </button>
              <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full rounded-r-none border-r-0 rounded-l-none"
                type="button">
                Nurses
              </button>
              <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full rounded-l-none"
                type="button">
                Officers
              </button>
            </div>
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
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                navigate("/dashboard");
              }, 3000);
            }}
          />
        )}
      </form>
    </div>
  );
}

export default Login;

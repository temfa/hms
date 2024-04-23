import React, { useEffect } from "react";
import { Button, Input } from "../components/Form";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoles } from "../redux/slice/roles";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUsersMutation } from "../redux/api/mutationApi";

const Login = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, { data: userLogin, isLoading: userLoginLoad, isSuccess: userLoginSuccess, isError: userLoginFalse, error: userLoginErr }] = useUsersMutation();
  useEffect(() => {
    if (userLoginSuccess) {
      if (userLogin) {
        if (userLogin.is_active === 1) {
          dispatch(setRoles(userLogin));
          navigate("/dashboard");
        } else {
          toast.error("Your account has been suspended. Please reach out to the administrator");
        }
      }
    }
  }, [userLogin, userLoginSuccess, dispatch, navigate]);
  useEffect(() => {
    if (userLoginFalse) {
      if (userLoginErr) {
        console.log(userLoginErr);
        toast.error(userLoginErr.data.error);
      }
    }
  }, [userLoginErr, userLoginFalse]);
  const onSubmit = (data) => {
    let datas = {
      "user-login": true,
      email: data.email,
      password: data.password,
    };
    user(datas);
  };
  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form className="xs:w-full lg:w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo" onSubmit={handleSubmit(onSubmit)}>
        <img src="/images/logo.png" alt="logo" className="w-48 h-16 object-contain" />
        <div className="flex flex-col gap-4 w-full mb-6">
          <Input label="Email" type="email" color={true} placeholder={"admin@gmail.com"} register={{ ...register("email", { required: "Email is required" }) }} />
          {errors.email && <span>{errors.email.message}</span>}
          <Input label="Password" type="password" color={true} placeholder={"*********"} register={{ ...register("password", { required: "Password is required" }) }} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <Button label="Login" Icon={BiLogInCircle} type={true} loading={userLoginLoad} />
      </form>
    </div>
  );
};

export default Login;

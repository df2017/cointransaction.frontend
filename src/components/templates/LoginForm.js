/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 04/05/2021 - 15:01:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import ButtonLogin from "../atoms/buttons/LoginButton";
import ButtonRegister from "../atoms/buttons/RegisterButton";
import PasswordInput from "../atoms/inputs/PasswordInput";
import UsernameInput from "../atoms/inputs/UsernameInput";
import Modal from "./RegisterForm";
import Login from "../../services/LoginService";
import auth from "../Auth";
import { useAlert } from "react-alert";
import BlockUi from "react-block-ui";


function LoginForm() {

  const [blockLogin, setBlockLogin] = useState(false);
  const history = useHistory();
  const alert = useAlert();

  const defaultValues = {
    username: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const alertLogin = () => {
    alert.error("Username or password incorrect");
  };

  const onSubmit = async (data) => {
    setBlockLogin(true);
    const result = await Login(data);
    if (!result) {
      alertLogin()
      setBlockLogin(false);
    } else {

      auth.login(() => {
        history.push("/dashboard");
      });
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <div>
       <BlockUi blocking={blockLogin} message="Loading, please wait...">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Username</label>
            <UsernameInput
              register={register("username", {
                required: {
                  value: true,
                  message: "You must enter your username or email",
                },
              })}
            />
            <p className="help is-danger mt-2 mb-2">
              {errors.username?.message}
            </p>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <PasswordInput
              register={register("password", {
                required: {
                  value: true,
                  message: "You must enter your password",
                },
                minLength: {
                  value: 8,
                  message: "Your name must be at least 8 characters",
                },
              })}
              name="password"
            />
            <p className="help is-danger mt-2 mb-2">
              {errors.password?.message}
            </p>
          </div>
          <ButtonLogin />
        </form>
        
        <ButtonRegister onClick={handleShow} />
        <Modal show={show} handleClose={handleClose} />
        </BlockUi>
      </div>

  );
}

export default LoginForm;

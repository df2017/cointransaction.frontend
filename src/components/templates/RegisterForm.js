import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UsernameInput from "../atoms/inputs/UsernameInput";
import PasswordInput from "../atoms/inputs/PasswordInput";
import EmailInput from "../atoms/inputs/EmailInput";
import Register from "../../services/RegisterService";
import { useAlert } from "react-alert";
import BlockUi from "react-block-ui";

function Modal({ show, handleClose }) {
  
  const [blockRegister, setBlockRegister] = useState(false);
  const showHideClassName = show ? "modal is-active" : "modal";
  const alert = useAlert();

  const defaultValues = {
    username: undefined,
    password: undefined,
    password2: undefined,
    email: undefined,
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

  const alertRegister = () => {
    alert.error("Error server....#");
  };

  const successRegister = () => {
    alert.success("Successful registration!!!");
  };

  const onSubmit = async (data) => {
    setBlockRegister(true);
    const result = await Register(data);
    if (!result) {
      alertRegister()
      setBlockRegister(false);
    } else {
      handleClose()
      successRegister();
      setBlockRegister(false);
    }
  };

  return (
    <div className={showHideClassName}>
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        <BlockUi blocking={blockRegister} message="Registering, please wait...">
          <form onSubmit={handleSubmit(onSubmit)}>
            <header className="modal-card-head">
              <p className="modal-card-title">Register</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleClose}
              />
            </header>
            <section className="modal-card-body">
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
                  name="password"
                  register={register("password", {
                    required: {
                      value: true,
                      message: "You must enter your password",
                    },
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters",
                    },
                  })}
                />
                <p className="help is-danger mt-2 mb-2">
                  {errors.password?.message}
                </p>
              </div>
              <div className="field">
                <label className="label">Confirmed Password</label>
                <PasswordInput
                  name="password2"
                  register={register("password2", {
                    required: {
                      value: true,
                      message: "You must enter your password",
                    },
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters",
                    },
                  })}
                />
                <p className="help is-danger mt-2 mb-2">
                  {errors.password2?.message}
                </p>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <EmailInput
                  register={register("email", {
                    required: {
                      value: true,
                      message: "You must enter your email",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <p className="help is-danger mt-2 mb-2">
                  {errors.password?.message}
                </p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Sign in</button>
              <button className="button" onClick={handleClose}>
                Cancel
              </button>
            </footer>
          </form>
        </BlockUi>
      </div>
    </div>
  );
}

export default Modal;

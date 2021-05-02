import React from "react";

function PasswordInput({register, ...propsInput}) {
  return (
    <>
      <input
        className="input is-normal"
        type="password"
        placeholder="Enter your password"
        {...propsInput}
        {...register}
      />
    </>
  );
}

export default PasswordInput;

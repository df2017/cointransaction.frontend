import React from "react";

function EmailInput({register}) {
  return (
    <>
      <input
        className="input is-normal"
        type="email"
        placeholder="Enter your email"
        name="email"
        {...register}
      />
    </>
  );
}

export default EmailInput;
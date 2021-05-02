import React from "react";

function UsernameInput({register}) {
  return (
    <>
      <input
        className="input is-normal"
        type="text"
        placeholder="Enter your username"
        name="username"
        {...register}
      />
    </>
  );
}

export default UsernameInput;
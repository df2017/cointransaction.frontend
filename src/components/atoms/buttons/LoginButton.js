import React from "react";

function ButtonLogin(buttonProps) {

  return (
    <button className="button is-dark is-fullwidth mt-2"
      {...buttonProps}
    >Login</button>
  );
}

export default ButtonLogin;
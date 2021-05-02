import React from "react";


function ButtonLogout(buttonProps) {

  return (
    <button className="button is-danger is-small m-1"
      {...buttonProps}>
     Logout</button>
  );
}

export default ButtonLogout;
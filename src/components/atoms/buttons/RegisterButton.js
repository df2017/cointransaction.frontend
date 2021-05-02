import React from "react";

function ButtonRegister({onClick}) {

  return (
    <button className="button is-warning is-fullwidth mt-2"
      onClick={onClick}
    >Register</button>
  );
}

export default ButtonRegister;
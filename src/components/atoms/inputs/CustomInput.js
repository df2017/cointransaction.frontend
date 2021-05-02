/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 02/05/2021 - 01:43:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";

function CustomInput({register, ...propsInput}) {
  return (
    <>
      <input
        className="input is-normal"
        {...propsInput}
        {...register}
      />
    </>
  );
}

export default CustomInput;
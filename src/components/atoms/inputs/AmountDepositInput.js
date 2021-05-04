/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 03/05/2021 - 08:57:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";

function AmountInput({register}) {
  return (
    <>
      <input
        className="input is-normal"
        type="number" 
        step="0.01"
        placeholder="Enter an amount"
        name="amount"
        {...register}
      />
    </>
  );
}

export default AmountInput;
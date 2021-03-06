/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 03/05/2021 - 01:16:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";

function AmountInput({event, register}) {
  return (
    <>
      <input
        className="input is-normal"
        type="number" 
        step="0.00000001"
        placeholder="Enter an amount"
        name="amount"
        {...register}
        onChange={event}
      />
    </>
  );
}

export default AmountInput;
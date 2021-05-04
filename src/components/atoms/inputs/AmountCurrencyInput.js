/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 02/05/2021 - 23:46:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";

function AmountCurrencyInput({event, register}) {
  return (
    <>
      <input
        className="input is-normal"
        type="number"
        placeholder="0.00000000"
        name="amountCurrency"
        {...register}
        value={event}
      />
    </>
  );
}

export default AmountCurrencyInput;
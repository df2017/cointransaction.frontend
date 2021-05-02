/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 01/05/2021 - 23:31:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";

function DepositButton(buttonProps) {

  return (
    <button className="button is-primary has-text-black is-rounded is-fullwidth mt-2 mb-2"
      {...buttonProps}
    >Deposit</button>
  );
}

export default DepositButton;
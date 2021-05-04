/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 02/05/2021 - 00:36:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";

function BuyButton(propsButton) {

  return (
    <button className="button is-danger is-outlined is-rounded is-small is-fullwidth m-1"
    {...propsButton}>Pay</button>
  );
}

export default BuyButton;
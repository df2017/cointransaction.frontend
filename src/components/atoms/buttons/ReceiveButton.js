/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 02/05/2021 - 00:39:44
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";

function ButtonReceive(propsButton) {

  return (
    <button className="button is-primary is-outlined has-text-black is-rounded is-small is-fullwidth m-1"
      {...propsButton}
    >Receive</button>
  );
}

export default ButtonReceive;
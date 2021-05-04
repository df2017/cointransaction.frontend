/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 01/05/2021 - 23:30:10
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";

function ButtonSend(propsButton) {

  return (
    <button className="button is-black is-outlined is-rounded is-small is-fullwidth m-1"
      {...propsButton}>Send</button>
  );
}

export default ButtonSend;
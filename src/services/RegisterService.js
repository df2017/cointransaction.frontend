/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 02/05/2021 - 02:02:31
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import { Instance } from "./BaseInstance";

const Register = async (data) => {
  try {
    const registerResult = await Instance.post("register/", data);
    if (registerResult) {
      return true;
    }

  } catch (error) {
    return false
  }
};

export default Register;
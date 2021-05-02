/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 01/05/2021 - 19:06:44
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import { Instance, InstanceAuth } from "./BaseInstance";


const SaveToken = (token) =>{
  localStorage.setItem("token", token);

  const existToken = localStorage.getItem("token");
  if(existToken){
    return true
  } else {
    return false
  }
}

const Login = async (data) => {
  try {
    const loginResult = await Instance.post("login/", data);
    const tokenAccess = loginResult.data.access;
    const verifyExistToken = SaveToken(tokenAccess);
    
    if(verifyExistToken){
      const body = { token: tokenAccess };
      const result = verifyToken(body);
      if (result) {
        const getUser = await me(data.username);
        const dataUser = getUser.data.results
        localStorage.setItem('user', JSON.stringify(dataUser))
        return true;
      }
    }
    
  } catch (error) {
    return false
  }
};

const verifyToken = async (token) => {
  try {
    const response = await Instance.post("verify/", token);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const me = async (user) => {
  try {
    const response = await InstanceAuth.get(`me/?username=${user}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return false;
  }
};

export default Login
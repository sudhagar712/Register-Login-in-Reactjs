import axios from "axios"
import { getUserData } from "./Storage";


axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyDtcWOpiPA4qGOiIXuxwpCSKgmiD9ctQl4";
const REGISTER_URL = `/accounts:signUp?key= ${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USERDATA_URL = `accounts:lookup?key=${API_KEY}`


// RegisterAPI
export const RegisterApi = (input) => {
    let data = {displayName:input.name, email:input.email, password:input.password}
    return axios.post(REGISTER_URL, data);
}

// LOginAPI 

export const LoginApi = (input) => {
  let data = {
    email: input.email,
    password: input.password,
  };
  return axios.post(LOGIN_URL, data);
};

// UserDetailsAPI 

export const UserDetailsApi = () => {
    let data = {idToken : getUserData()}
    return axios.post(USERDATA_URL , data)

}
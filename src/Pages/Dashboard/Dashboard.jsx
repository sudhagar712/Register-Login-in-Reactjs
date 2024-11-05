import React,{useState, useEffect} from 'react'
import {UserDetailsApi} from "../../Services/Api";
import Navbar from '../../Components/Navbar';
import { logout  ,isAuthenticated } from '../../Services/Auth';
import { useNavigate , Navigate } from 'react-router-dom';
import { toast } from "react-toastify";



const Dashboard = () => {

  const navigate = useNavigate();

const [user ,setUser] =useState({name:"",email:"" , localId:""})


useEffect(()=>{
  if (isAuthenticated()) {
    UserDetailsApi().then((response) => {
      console.log(response);
      setUser({
        name: response.data.users[0].displayName,
        email: response.data.users[0].email,
        localId: response.data.users[0].localId,
      });
    });
  }
 

},[])



const logoutUser = () => {
  logout();
  navigate('/login')
  toast.success('Logged out successfully')
  


} 


if(!isAuthenticated()){
  return <Navigate to="/login" />;
}



  return (
    <>
    <Navbar logoutUser={logoutUser}/>
      <div className="text-center mt-5 bg-gray-200 p-5">
        <h1 className="font-bold  text-3xl mb-6">Welcome To Dashboard</h1>

        {user.name && user.email && user.localId ? (
          <div>
            <h2>
              Hi{" "}
              <span className="text-red-600 font-bold text-xl">
                {user.name}
              </span>{" "}
            </h2>{" "}
            <h2>
              your firebase UserID is{" "}
              <span className="text-red-600">{user.localId}</span>{" "}
            </h2>
            <h3>
              USER EMAIL ID is
              <span className="text-red-600"> {user.email} </span>{" "}
            </h3>
          </div>
        ) : (
          <p className="text-blue-600 ">Loading...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard

// import { createContext, useEffect, useState,useContext } from "react";
// import axios from 'axios'
// import {toast} from 'react-hot-toast'
// import { useNavigate } from "react-router-dom";

// axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
// export const AppContext=createContext();


// export const AppProvider=({children})=>{
// const navigate=useNavigate()
// const currency=import.meta.env.VITE_CURRENCY
//     const [token,setToken]=useState(null) 
//     const [user,setUser]=useState(null)
//     const [isOwner,setIsOwner]=useState(false) 
//     const [showLogin,setShowLogin]=useState(false)
//     const [pickupDate,setPickupDate]=useState('') 
//     const [returnDate,setReturnDate]=useState('') 
//     const [cars,setCars]=useState([])

// // function to check if user is logged it 

// const fetchUser =async()=>{
//     try{
// const {data}=await axios.get('/api/user/data')
// if(data.success){
//     setUser(data.user)
//     setIsOwner(data.user.role==='owner')
// }

// else{
//     navigate('/')
// }
//     }
//     catch(error){
// toast.error(error.message)
//     }
// }

// // function to fetch all cars from the server
// const fetchCars=async()=>{
//     try{
//     const {data}=await axios.get('/api/user/cars')
//     data.success? setCars(data.cars):toast.error(data.message)
//     }
//     catch(error){
// toast.error(error.message)
//     }
// }



// // function to logout 

// const logout=()=>{
//     localStorage.removeItem('token')
//     setToken(null)
//     setUser(null)
//     setIsOwner(false)
//     axios.defaults.headers.common['Authorization']=''
//     toast.success('You have been logged out')
// }

// // useeffect to retrive the token from local storage

// useEffect(()=>{
//     const token =localStorage.getItem('token')
//         setToken(token)
//     fetchCars()
// },[])


// useEffect(()=>{
//     if(token){
//         axios.defaults.headers.common['Authorization']=`${token}`
//         fetchUser()
//     }
// },[token])


// const value={
// navigate,
// currency,axios,user,setUser,token,setToken,isOwner,setIsOwner,fetchUser,showLogin,logout,setShowLogin,fetchCars,cars,setCars,pickupDate,setPickupDate,returnDate,setReturnDate
//     }


//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext=()=>{
//     return useContext(AppContext)
// }

import { createContext, useEffect, useState, useContext } from "react";
import axiosModule from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // ✅ Create isolated axios instance
  const axios = axiosModule.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  // ✅ Attach token only if available
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }

  // ✅ Fetch user data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        toast.error(data.message || "Login expired");
        logout();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      logout();
    }
  };

  // ✅ Fetch cars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    toast.success("Logged out successfully");
  };

  // ✅ On mount: restore token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    fetchCars(); // Can be called regardless of auth
  }, []);

  // ✅ When token changes: attach + fetch user
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      fetchUser();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'


export const UserRedirect = ()=>{
  const data = JSON.parse(Cookies.get("csc_token")||null) ;
  const navigate = useNavigate()
  useEffect(()=>{
    if (!data) { 
        navigate("/signin");
    }
  },[data,navigate]);
}
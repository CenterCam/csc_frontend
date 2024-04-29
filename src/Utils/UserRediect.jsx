import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { proxy } from "./Utils";
import axios from "axios";


export const UserRedirect = ()=>{
  const data = JSON.parse(Cookies.get("csc_token")||null) ;
  const navigate = useNavigate()
  useEffect(()=>{
    if (!data) { 
        navigate("/signin");
    }
  },[data,navigate]);
}
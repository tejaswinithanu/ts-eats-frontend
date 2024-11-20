import { useEffect } from "react"
import { LoadingView } from "./loading"
import axios from '../../configs/axios.config'

export const Runway=()=>{

    const saveLoggedInUserDetails=(userDetails:any)=>{
        const {token,username,userId}=userDetails
        sessionStorage.setItem('token',token);
        sessionStorage.setItem('role','user');
        sessionStorage.setItem('username',username)
        sessionStorage.setItem('userId',userId)
      }  

    useEffect(()=>{
        const getUser=async()=>{
            try {
             const params=new URLSearchParams(window.location.search);
             const code=params.get('code')
             const res=await axios.post('/users/callback',{code})
            
             const data=res.data.data
             saveLoggedInUserDetails(data)

                window.location.href='/'
             
            }
             
             catch(err){
                
             }
         }
         getUser()
    },[])

    return(
        <div style={{minHeight:'100vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
            <LoadingView size={36} color="white"/>
        </div>
    )
}
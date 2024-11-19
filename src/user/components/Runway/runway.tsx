import { useEffect } from "react"
import { LoadingView } from "../Loading/loading"
import axios from '../../../services/axios.service'

export const Runway=()=>{

    const saveLoggedInUserDetails=(userDetails:any)=>{
        const {token,role,username,userId}=userDetails
        sessionStorage.setItem('token',token);
        sessionStorage.setItem('role',role);
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
             const {role}=data
             saveLoggedInUserDetails(data)

             if(role==='admin') window.location.href='/admin-dashboard'
         
             else window.location.href='/'
             
             }
             catch(err){
                
             }
         }
         getUser()
    },[])

    return(
        <div>
            <LoadingView/>
        </div>
    )
}
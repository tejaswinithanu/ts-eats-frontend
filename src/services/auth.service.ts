 import axios from '../configs/axios.config'
 
 interface UserDetails{
    email:String;
    password:String;
 }

 interface NewUserDetails extends UserDetails{
    name:String;
 }

class AuthService{

    existUser=async (email:any)=>{
        try{
            const response=await axios.post('/users/exist',{email})    
            console.log(response)    
            if(response.data.status===200){
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message || 'Login failed');
        }
    }
    
    login=async (userDetails:UserDetails)=>{
        try{
            const response=await axios.post('/users/login',{...userDetails}) 
            console.log(response)
            if(response.data.status===200){
                
                return {token:response.data.token,...response.data.data}
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            
            throw new Error(err.message || 'Login failed');
        }
    }

    register=async (newUserDetails:NewUserDetails)=>{
        try{
            const response=await axios.post('/users/register',{username:newUserDetails.name,email:newUserDetails.email,password:newUserDetails.password})
            
            if(response.data.status===201){
                return response.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            
            throw new Error(err.message || 'Registration failed');
        }
    }
}

const authentication=new AuthService()

export default authentication
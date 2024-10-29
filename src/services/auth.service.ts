 import axios from './axios.service'
 
 interface UserDetails{
    email:String;
    password:String;
 }

 interface NewUserDetails extends UserDetails{
    name:String;
 }

class AuthService{
    
    login=async (userDetails:UserDetails)=>{
        try{
            const response=await axios.post('/users/login',{...userDetails})        
            if(response.data.status===200){
                return response.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            console.log('err',err)
            throw new Error(err.message || 'Login failed');
        }
    }

    register=async (newUserDetails:NewUserDetails)=>{
        try{
            const response=await axios.post('/users/register',{username:newUserDetails.name,email:newUserDetails.email,password:newUserDetails.password})
            console.log('response',response.data)
            if(response.data.status===201){
                return response.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            console.log(err)
            throw new Error(err.message || 'Registration failed');
        }
    }
}

const authentication=new AuthService()

export default authentication
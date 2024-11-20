import axios from '../configs/axios.config'

class UserManagementService{
    getAllUsers=async()=>{
        try{
            const response=await axios.get('/users')
            console.log(response)
            if(response.data.status===200){      
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

    addUser=async (userDetails:any)=>{
        try{
            const response=await axios.post('/users/register', {...userDetails})
            console.log(response)
            if(response.data.status===201){        
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

}

const userManagementService=new UserManagementService()

export default userManagementService
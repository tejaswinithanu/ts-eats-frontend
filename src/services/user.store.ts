import axios from './axios.service'

class UserService{
    addCartItem=async (item:any)=>{
        console.log('details in service',item)
        try{
            const response=await axios.post('/cart',{...item})
            console.log('response',response.data)
            if(response.data.status===201){
                
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            console.log(err)
            throw new Error(err.message);
        }
    }

    removeCartItem=async (cartId:any)=>{
        try{
            const response=await axios.delete(`/cart/${cartId}`)
            if(response.data.status===200){
                
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

    getCartItems=async(userId:any)=>{
        try{
            const response=await axios.get(`/cart/${userId}`)
            if(response.data.status===200){
                console.log(response.data.data)
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message)
        }
    }

    updateQuantity=async (item:any)=>{
        try{
            const response=await axios.put("/cart/update",{...item})
            if(response.data.status===200){
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message)
        }
    }
}

const userService=new UserService()

export default userService
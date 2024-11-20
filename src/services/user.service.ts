import axios from '../configs/axios.config'

class UserService{
    addCartItem=async (item:any)=>{
        
        try{
            const response=await axios.post('/cart',{...item})
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
            if(response.status===200){
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message)

        }
    }

    addAddress=async (userAddress:any)=>{
        try{
            const response=await axios.post('/address',userAddress)
            if(response.data.status===201){
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message)
        }
    }

    getAddresses=async (userId:any)=>{
        try{
            const response=await axios.get(`/address/${userId}`)
            if(response.data.status===200){
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

    placeOrder=async (userId:any)=>{
        try{
            const response=await axios.post('/orders',{userId})
            if(response.data.status===201){
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message)
        }
    }

    getOrderHistory=async (userId:any)=>{
        try{
            const response=await axios.get(`/orders/${userId}`)
            if(response.data.status===200){    
                return response.data.data    
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message)
        }
    }

    updateOrder=async (orderId:any, status:any)=>{
        try{
            const response=await axios.put(`/orders/${orderId}`, {status})
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
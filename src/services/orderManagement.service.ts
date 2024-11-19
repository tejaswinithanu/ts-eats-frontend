import axios from './axios.service'

class OrderManagementService{
    getAllOrders=async ()=>{
        try{
            const response=await axios.get('/orders')

            if(response.data.status===200){    
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

}

const orderManagementService=new OrderManagementService()

export default orderManagementService
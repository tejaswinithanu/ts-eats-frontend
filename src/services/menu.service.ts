import axios from './axios.service'

class MenuService{
    getMenuItems=async ()=>{
        try{
            const response=await axios.get('/items')
            if(response.data.status===200){        
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

    deleteMenuItem=async (itemId:any)=>{
        console.log(itemId)
        try{
            const response=await axios.delete(`/items/${itemId}`)
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

    addMenuItem=async (item:any)=>{
        try{
            const response=await axios.post('/items', item)
            
            if(response.data.status===201){        
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

    updateMenuItem=async(itemDetails:any, itemId:any)=>{

        try{
            const response=await axios.put(`/items/${itemId}`, itemDetails)
            
            if(response.data.status===200){        
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

    getAllCategories=async ()=>{
        try{
            const response=await axios.get('/categories')
            if(response.data.status===200){        
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

    addCategory=async(category:any)=>{
        try{
            const response=await axios.post('/categories', {category})
            if(response.data.status===201){        
                return response.data.data
            }else{
                throw new Error(response.data.message)
            }
        }catch(err:any){
            throw new Error(err.message);
        }
    }

    getMenuByCategory=async (categoryName:any)=>{
        try{
            const response=await axios.get(`/items/${categoryName}`)
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

const menuService=new MenuService()

export default menuService
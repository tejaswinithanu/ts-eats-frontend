import axios from './axios.service'
class MenuService{
    getMenuItems=async ()=>{
        try{
            const response=await axios.get('/items')
            //console.log('response',response.data)
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
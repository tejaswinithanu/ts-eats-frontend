import axios from './axios.service'

const categories=[
    {
        id:1,
        categoryName:'Starters'
    },
    {
        id:2,
        categoryName:'Main Course'
    },
    {
        id:3,
        categoryName:'Munchies'
    },
    {
        id:4,
        categoryName:'Tiffens'
    }
]
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

    getAllCategories=async ()=>{
        return categories
    }

    getMenuByCategory=async (categoryId:any)=>{

    }
}

const menuService=new MenuService()

export default menuService
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems, deleteMenuItem, getAllCategories, addMenuItem, addCategory, updateMenuItem } from './../../store/menuSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TableRow,
  Box,
  Typography,
  Select,
  MenuItem, 
  RadioGroup,
  Radio,
  FormControlLabel,
  Skeleton,
  TableCell,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from './../../utils/formatPrice';
import './../../styles/menuManagement.css'
import { BorderedButton} from './customButton';
import { EmptyMenuView } from './emptyMenuView';
import CircleIcon from "@mui/icons-material/Circle";
import { LoadingView } from '../../user/components/loading';
import SearchIcon from '@mui/icons-material/Search';


export const MenuManagement = () => {
  const { menuItems, categories, status } = useSelector((state:any) => state.menuSlice);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [categoryError, setCategoryError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const [form, setForm] = useState<any>({
    name: '',
    price: '',
    availableItems:'',
    imageUrl: '',
    category: '',
    type: 'veg',
    description: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newCategory,setNewCategory]=useState<any>(null);
  const [isAnyFieldEdited,setFieldEdit]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    dispatch<any>(getMenuItems());
    dispatch<any>(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMenuItems(
      selectedCategory === "all"
        ? menuItems
        : menuItems.filter((item:any) => item.category === selectedCategory)
    );
  }, [selectedCategory, menuItems]);

  const filteredSearchMenuItems = filteredMenuItems.filter((item:any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (event:any) => {
    setSelectedCategory(event.target.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForm({
      name: '',
      price: '',
      imageUrl: '',
      availableItems:'',
      category: '',
      type: 'veg',
      description: '',
    });
    setErrors({});
    setIsEditMode(false);
    setEditingItem(null);
    setNewCategory(null);
  };
  

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setCategoryForm({ name: '' });
    setCategoryError('');
  };

  const validateCategoryField=(value:string)=>{
    if (!value){
      setCategoryError('Category name is required')
    }
  }

  const handleCategorySave = async () => {
    if (!categoryForm.name) {
      setCategoryError('Category name is required');
      return;
    }
    await setNewCategory(categoryForm.name)
    await setForm({...form,category:categoryForm.name})
    setOpenDialog(true)
    handleCloseCategoryDialog();
  };

  const handleSaveOrUpdate = async () => {

    const updatedErrors = {
      ...validateField('name', form.name),
      ...validateField('price', form.price),
      ...validateField('imageUrl', form.imageUrl),
      ...validateField('availableItems',form.availableItems),
      ...validateField('category', form.category),
      ...validateField('description', form.description),
    };
    const hasErrors = Object.values(updatedErrors).some((error) => error);
    setErrors(updatedErrors);

    if (hasErrors) {
      return;
    }

    if (!hasErrors) {
      handleCloseDialog();
      if (isEditMode && editingItem) {
        // Update existing item
        const response = await dispatch<any>(updateMenuItem({itemDetails: {...form,price:parseInt(form.price), availableItems:parseInt(form.availableItems)}, itemId: editingItem.itemId }));
        if (updateMenuItem.fulfilled.match(response)) {
          toast.success('Menu item updated successfully!');
          dispatch<any>(getMenuItems());
        } else {
          toast.error(response.payload || 'Failed to update menu item. Please try again.');
        }
        setFieldEdit(false)
      } else {

        // Add new item and category
        if(newCategory){
          try{
            const response= await dispatch<any>(addCategory(newCategory));
            if(addCategory.fulfilled.match(response)){
              toast.success('Category added successfully!')
              dispatch<any>(getAllCategories());
            }else{
              toast.error(response.payload || 'Failed to add category. Please try again.');
            }
          }catch(err){
            toast.error("An error occurred while adding category");
          }
          setNewCategory(null);
        }
        
        const response = await dispatch<any>(addMenuItem({ ...form, availability: true }));
        if (addMenuItem.fulfilled.match(response)) {
          toast.success('Menu item added successfully!');
          dispatch<any>(getMenuItems());
        } else {
          toast.error(response.payload || 'Failed to add menu item. Please try again.');
        }
      }
      
    }
  };
  

  const handleDeleteItem = (itemId: any) => {
    setItemToDelete(itemId);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteItem = async () => {
    setIsLoading(true)
    setOpenDeleteDialog(false);
    if (itemToDelete) {
      const response=await dispatch<any>(deleteMenuItem(itemToDelete));
      if(deleteMenuItem.fulfilled.match(response)){
        toast.success('Menu item deleted successfully!');
        dispatch<any>(getMenuItems());
      }else{
        toast.error(response.payload || "Failed to delete item. Please try again!");
      }
      setItemToDelete(null);
      setIsLoading(false)
    }
  };

  const handleEmptyCartButton=async ()=>{
    await setNewCategory(selectedCategory)
    await setForm({...form,category:selectedCategory})
    setOpenDialog(true)
  }

  const handleEditItem = (item: any) => {
    setForm({
      name: item.name,
      price: item.price,
      availableItems:item.availableItems,
      imageUrl: item.imageUrl,
      category: item.category,
      type: item.type.toLowerCase(),
      description: item.description,
      itemId:item.itemId
    })
    setEditingItem({
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      availableItems:item.availableItems,
      category: item.category,
      type: item.type.toLowerCase(),
      description: item.description,
      itemId:item.itemId
    })
    setIsEditMode(true);
    setOpenDialog(true);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev:any) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    if (isEditMode){
      setFieldEdit(true)
    }
    let error = '';
    switch (field) {
      case 'name':
        if (!value) error = 'Name is required';
        break;
      case 'price':
        if (!value || isNaN(Number(value)) || Number(value) <= 0) error = 'Enter a valid price';
        break;
      case 'availableItems':
        if (!value || isNaN(Number(value)) || Number(value) < 0 || Number(value)>50) error = 'Enter a valid Quantity';
        break;
      case 'imageUrl':
        if (!value) error = 'Image URL is required';
        break;
      case 'category':
        if (!value) error = 'Category is required';
        break;
      case 'description':
        if (!value) error = 'Description is required';
        break;
      default:
        break;
    }
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return { ...errors, [field]: error };
  };
  

  const renderSkeletonRows = (rowCount = 5) => {
    return Array.from(new Array(rowCount)).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton variant="text" width="60%" /></TableCell>
        <TableCell><Skeleton variant="text" width="40%" /></TableCell>
        <TableCell>
          <Skeleton variant="circular" width={24} height={24} sx={{ mx: 1 }} />
          <Skeleton variant="circular" width={24} height={24} sx={{ mx: 1 }} />
        </TableCell>
      </TableRow>
    ));
  };

  const validateLength = (fieldName: string, value: string) => {
    if (value.length < 10) {
      setErrors((prevErrors:any) => ({
        ...prevErrors,
        description: 'Description must be at least 10 characters.',
      }));
    } else if (value.length > 100) {
      setErrors((prevErrors:any) => ({
        ...prevErrors,
        description: 'Description cannot exceed 100 characters.',
      }));
    } else {
      setErrors((prevErrors:any) => ({
        ...prevErrors,
        description: '',
      }));
    }
  };
  

  return (
    <Box p={3} sx={{display:'flex',flexDirection:'column'}}>
      <ToastContainer theme="dark" newestOnTop={true} position="top-right" autoClose={3000} />

      <Box display="flex" justifyContent="flex-start" alignItems="center" mb={3}>
        <Box display="flex" gap={2}>
          <BorderedButton triggerClick={()=>setOpenDialog(true)} text="Add Menu Item"/>
          <BorderedButton triggerClick={() => setOpenCategoryDialog(true)} text="Add Category"/>    
        </Box>  
      </Box>
      
      <Box sx={{width:'100%', display:'flex',justifyContent:'space-between', alignItems:'center'}}>
        <TextField
          label="Search Menu"
          variant="outlined"
          size="small"
          value={searchQuery}
          sx={{width:'50%'}}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <SearchIcon sx={{ color: 'gray', marginRight: 1 }} />
            ),
          }}
          
        />
        <Box 
            display="flex" 
            overflow="auto" 
            sx={{
            backgroundColor:'trnsparent',padding:'5px', borderRadius:'5px', maxWidth: 400, whiteSpace: 'nowrap', '&::-webkit-scrollbar': { display: 'none' },
            boxShadow:'1px 1px 4px 2px #e0dede',
            backgroundAttachment:'fixed',
            border:'1px solid var(--primary-color)'
          }}
          >
            <Button 
              onClick={() => handleCategoryChange({ target: { value: 'all' } })} 
              sx={{ color:'black',border:'1px solid #b3b2b1', mx: 0.5, borderRadius: '5px',minWidth:'auto',  px: 2 , backgroundColor:`${selectedCategory === 'all' ? 'var(--primary-color)' : 'white'}`}}
            >
              All
            </Button>
            {categories.map((category: any) => (
              <Button 
                key={category.category}  
                onClick={() => handleCategoryChange({ target: { value: category.category } })} 
                sx={{color:'black',border:'1px solid #b3b2b1', mx: 0.5, borderRadius: '5px', px: 2 ,minWidth:'auto', backgroundColor:`${selectedCategory === category.category ? 'var(--primary-color)' : 'white'}`}}
                >
                {category.category}
              </Button>
            ))}
        </Box>
      </Box>
      
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 20px" }}>
        <thead>
          <tr>
            <th>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 10px",
                  borderRadius: "10px",
                  backgroundColor: '#e8e8e8',
                }}
              >
                <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start' }}>
                  <span>Item</span>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <span>Price</span>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <span>Quantity</span>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <span>Actions</span>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {status === "loading"
            ? renderSkeletonRows()
            : filteredSearchMenuItems.length === 0 ? (
              <EmptyMenuView message="No items found" actionLabel="Add Menu Item" onAction={handleEmptyCartButton} />
            ) : filteredSearchMenuItems.map((item: any) => (
              <tr key={item.id}>
                <td colSpan={3} style={{ padding: 0, border: "none" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      border: "2px solid #dee0e3",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      opacity: itemToDelete === item.itemId ? '0.5' : '10',
                      position: 'relative',
                    }}
                    className="row-container"
                  >
                    <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'white',
                          borderRadius: '5px',
                          width: 30,
                          height: 30,
                          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                          mr: 2,
                        }}
                      >
                        {/* Green signal for veg, red signal for non-veg */}
                        <CircleIcon
                          sx={{
                            color: item.type?.toLowerCase() === "veg" ? "#4caf50" : "#f44336", // Green for veg, red for non-veg
                            fontSize: "20px",
                          }}
                        />
                      </Box>
                      <span>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            marginRight: "10px",
                            border: "4px solid #dee0e3",
                          }}
                        />
                        {item.name}
                      </span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <span>{item.availableItems}</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <span>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "blue",
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                          onClick={() => handleEditItem(item)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteItem(item.itemId)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </span>
                    </div>
                    {isLoading && itemToDelete === item.itemId && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 1,
                        }}
                      >
                        <LoadingView size={24} />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    

      {/* Dialog for adding/updating menu item */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Menu Item</DialogTitle>
        <DialogContent>
        <TextField
            label="Name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={(e)=>validateField('name',e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            onBlur={(e)=>validateField('price',e.target.value)}
            error={Boolean(errors.price)}
            helperText={errors.price}
            fullWidth
            margin="normal"
            type='number'
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Available Items"
            value={form.availableItems}
            onChange={(e) => handleChange('availableItems', e.target.value)}
            onBlur={(e)=>validateField('availableItems',e.target.value)}
            error={Boolean(errors.availableItems)}
            helperText={errors.availableItems}
            fullWidth
            margin="normal"
            type='number'
            inputProps={{ min: 0, max:50 }}
          />
          <TextField
            label="Image URL"
            value={form.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            onBlur={(e)=>validateField('imageUrl',e.target.value)}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl}
            fullWidth
            margin="normal"
          />
          {
            !newCategory ?
            (
              <Select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  onBlur={(e)=>validateField('category',e.target.value)}
                  displayEmpty
                  fullWidth
                  margin="dense"
                  error={Boolean(errors.category)}
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map((category: any) => (
                    <MenuItem key={category.category} value={category.category}>
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
            ):
            (
              <TextField
                value={form.category}
                fullWidth
                margin="normal"
              />
            )
          }
          
          <RadioGroup
            row
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <FormControlLabel value="veg" control={<Radio />} label="veg" />
            <FormControlLabel value="non-veg" control={<Radio />} label="non-veg" />
          </RadioGroup>
          <TextField
          label="Description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          onBlur={(e) => {
            validateField('description', e.target.value);
            validateLength('description', e.target.value); // Custom validation for length
          }}
          helperText={
            errors.description
          }
          error={
            Boolean(errors.description)
          }
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
          <Button onClick={handleSaveOrUpdate} variant="contained" sx={{ backgroundColor: 'var(--primary-color)' }} disabled={isEditMode && !isAnyFieldEdited}>
            {isEditMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding category */}
      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={categoryForm.name}
            onChange={(e) => setCategoryForm({ name: e.target.value })}
            onBlur={(e)=>validateCategoryField(e.target.value)}
            error={Boolean(categoryError)}
            helperText={categoryError}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'black', borderColor:'var(--primary-color)'}} onClick={handleCloseCategoryDialog} variant="outlined">Cancel</Button>
          <Button onClick={handleCategorySave} variant="contained" sx={{backgroundColor:'var(--primary-color)'}}>
            Add Category
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for delete confirmation */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined">Cancel</Button>
          <Button onClick={confirmDeleteItem} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};





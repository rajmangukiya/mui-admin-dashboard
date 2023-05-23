/* eslint-disable */
import './item.css'

import { CloseOutlined, PlusSquareOutlined  } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

import { ApiGet, ApiPatch, ApiPost } from 'utils/ApiData';
import { uploadFile } from '../../utils/uploadFile.js';
import AnimateButton from 'components/@extended/AnimateButton';

const Item = () => {

  const { state:oldItem } = useLocation();
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [item, setItem] = useState({
    name: oldItem?.name,
    price: oldItem?.price,
    discountedPrice: oldItem?.discountedPrice,
    images: oldItem?.images,
    category: oldItem?.category,
    details: oldItem?.details,
  })

  const fetchCategories = async () => {
    const { data } = await ApiGet('category/getCategories')
    setCategories(data)
  }
  
  const editItem = async () => {
    let URLs = []
    if (selectedFiles.length) URLs = await uploadFile(selectedFiles);
    console.log('firebase urls', URLs);
    if(oldItem) {
      await ApiPatch(`item/editItem/${oldItem._id}`, {
        ...item,
        category: item.category._id,
        images: [...item.images, ...URLs]
      });
    }
    else {
      await ApiPatch('item/editItem/ADD', {
        ...item,
        category: item.category._id,
        images: URLs
      });
    }
    navigate("/catalog")
  }

  const deleteItem = async () => {
    const { data } = await ApiGet('category/getCategories')
    setCategories(data)
  }

  const handleChange = (value) => {
    setItem(prev => {
      return {
        ...prev,
        ...value
      }
    })
  }

  const handleCategoryInput = ({ target: { value }}) => {
    setCategoryInput(value)
  }

  const deleteImage = (index) => {
    setItem(prev => {
      return ({
        ...prev,
        images: prev.images.filter((image, i) => index != i),
      })
    })
  }

  const deleteFile = (index) => {
    setSelectedFiles(prev => prev.filter((file, i) => i != index))
  }

  const addCategory = async () => {
    try {
      const { data } = await ApiPost('category/addCategory', {
        name: categoryInput,
        images: []
      })
      setItem(prev => {
        return {
          ...prev,
          category: data
        }
      })
      setCategories(prev => [...prev, data])
      setCategoryInput('')
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    console.log('categories', categories);
    console.log('categoryInput', categoryInput);
    console.log('item', item);
  }, [categories, categoryInput, item])
  

  return (
    <div className='d-flex flex-column align-items-center'>
      <div className='bg-white w-75 p-5 my-5 rounded-2 border border-1 d-flex flex-column align-items-center'>
        <div className='d-flex flex-column mb-5 w-100'>
          <div className='mb-2' htmlFor="name">Item name*</div>
          <input 
            type="name" 
            id="name" 
            onChange={(e) => handleChange({name: e.target.value})} 
            value={item.name} 
            placeholder="Enter your name" 
            className='p-3 rounded-3 border border-1'
          />
        </div>
        <div className='d-flex flex-column mb-5 w-100'>
          <div className='mb-2' htmlFor="name">Photos</div>
          <div className='d-flex flex-wrap'>
            {
              item?.images?.map((url, index) => {
                return (
                  <div key={index} className='add-item-image-container' >
                    <CloseOutlined onClick={() => deleteImage(index)} style={{ zIndex: '10' }} className='position-absolute end-0 m-2 m-2 fs-5 bg-dark text-light p-2 rounded-2' height={40} width={40} />
                    <img alt='go ahed' src={url}></img>
                  </div>
                )
              })
            }
            {
              selectedFiles.map((file, index) => {
                const objectUrl = URL.createObjectURL(file);
                return (
                  <div key={index} className='add-item-image-container' >
                    <CloseOutlined onClick={() => deleteFile(index)} style={{ zIndex: '10' }} className='position-absolute end-0 m-2 m-2 fs-5 bg-dark text-light p-2 rounded-2' height={40} width={40} />
                    <img alt='go ahed' src={objectUrl}></img>
                  </div>
                )
              })
            }
            <div className='add-item-image-container d-flex justify-content-center border border-1'>
              <label style={{ cursor: 'pointer' }} className='h-100 w-100 d-flex justify-content-center align-items-center' htmlFor="file">
                <PlusSquareOutlined style={{fontSize: '70px', color: 'rgb(226, 226, 226)'}} />
              </label>
              <input onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  return;
                }
                setSelectedFiles(prev => [...prev, e.target.files[0]]);
              }} className='d-none' type="file" id="file" />
            </div>
          </div>
        </div>
        <div className='d-flex flex-column mb-5 w-100'>
          <div className='mb-2'>Price</div>
          <input 
            id="price" 
            onChange={(e) => handleChange({price: e.target.value})}  
            value={item.price} 
            placeholder="Enter Price" 
            className='p-3 rounded-3 border border-1'
          />
        </div>
        <div className='d-flex flex-column mb-5 w-100'>
          <div className='mb-2' >Discounted Price</div>
          <input 
            id="discountedPrice" 
            onChange={(e) => handleChange({discountedPrice: e.target.price})}  
            value={item.discountedPrice} 
            placeholder="Enter discounted price" 
            className='p-3 rounded-3 border border-1'
          />
        </div>
        <div className='d-flex flex-column mb-5 w-100'>
          {/* <div className='mb-3' htmlFor="category">Category</div> */}
          <FormControl className='p-0' fullWidth>
            <InputLabel id="demo-simple-select-label" className='h-50 d-flex align-items-center'>Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.category}
              label="deliveryStatus"
              className='p-2 rounded-2'
              onChange={(e) => handleChange({category: e.target.value})}
            >
              {
                categories.map((categ, index) => (
                  <MenuItem key={index} value={categ}>{categ.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='mb-2 w-100' >Add new category</div>
        <div value='no value' className='bg-light d-flex w-100 justify-content-between py-4 px-5 mb-5 rounded-3'>
          <input 
            id="price" 
            onChange={handleCategoryInput}  
            value={categoryInput} 
            placeholder="Enter category name" 
            className='px-3 rounded-1 w-100 me-3 border border-1'
          />
          <AnimateButton>
            <div role='button' onClick={addCategory} className='bg-dark px-5 py-2 rounded-1 text-light'>{oldItem ? 'EDIT' : 'ADD'}</div>
          </AnimateButton>
        </div>
        <div className='d-flex flex-column mb-5 w-100'>
          <div className='mb-2' htmlFor="details">Details</div>
          <textarea
            style={{ resize: 'none' }} 
            className="p-3 rounded-3 border border-1" 
            onChange={(e) => handleChange({details: e.target.value})} value={item.details} 
            placeholder="Enter details" 
            id="details" 
            rows="8"
          />
        </div>
        <div className='d-flex'>
          <AnimateButton>
            <div role='button' onClick={editItem} className='bg-dark px-5 py-3 rounded-1 me-5 text-light'>{oldItem ? 'EDIT' : 'ADD'}</div>
          </AnimateButton>
          <AnimateButton>
            {oldItem ? <div role='button' onClick={deleteItem} className='bg-danger px-5 py-3 rounded-1 text-light'>DELETE</div> : <></>}
          </AnimateButton>
        </div>
      </div>
    </div>
  );
};

export default Item;

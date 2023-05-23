/* eslint-disable */
import './catalogItems.css'

import {
  Grid,
  Button
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';

import { ApiGet, ApiPatch } from 'utils/ApiData';

const CatalogItems = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate()

  const fetchItems = async () => {
    const { data } = await ApiGet('item/getItems?category=ALL')
    setItems(data)
  }

  const handleSwitchChange = (item) => async () => {
    try {
      await ApiPatch(`item/editItem/${item._id}`, { isDisabled: !(item.isDisabled)})
      setItems(prev => prev.map(itm => {
        console.log(item._id, itm._id);
        if(itm._id == item._id) {
          return {
            ...itm,
            isDisabled: !(itm.isDisabled)
          }
        }
        else return itm
      }))
    } catch (error) {
      console.log(error);
    }
  }

  const openItemPage = (itemData) => () => {
    navigate(`/item`, {state: itemData})
  }

  useEffect(() => {
    fetchItems()
  }, [])
  

  return (
    <div className='catalog-items-container'>
      <Grid item className="align-self-end mb-3">
        <AnimateButton>
          <Button 
            onClick={openItemPage()} 
            disableElevation 
            size="large" 
            type="submit" 
            variant="contained" 
            color="primary"  
          >
            Add Item
          </Button>
        </AnimateButton>
      </Grid>
      <div style={{width: '100%'}} className='d-flex flex-column align-items-center bg-white py-4 rounded-3 border border-1'>
        <div style={{height: '20px'}} className='w-100 d-flex justify-content-between px-4 mb-4' >
          <div style={{width: '7%', fontWeight: 'bold', fontSize: '1.05rem'}}>image</div>
          <div style={{width: '20%', fontWeight: 'bold', fontSize: '1.05rem'}}>title</div>
          <div style={{width: '30%', fontWeight: 'bold', fontSize: '1.05rem'}}>description</div>
          <div style={{width: '10%', fontWeight: 'bold', fontSize: '1.05rem'}}>price</div>
          <div style={{width: '10%', fontWeight: 'bold', fontSize: '1.05rem'}}>status</div>
        </div>
        {
          items.map(item => (
            <>
              <div className='catalog-line'></div>
              <div className='catalog-item px-4 py-2' key={item._id}>
                <img onClick={openItemPage(item)} alt='no image1' src={item.images[0]} />
                <div style={{width: '20%'}}>{item.name}</div>
                <div style={{width: '30%'}}>{item.details}</div>
                <div style={{width: '10%'}}>₹{item.discountedPrice}</div>
                <div style={{width: '10%'}}>  
                  <Switch
                    checked={!(item.isDisabled)}
                    onChange={handleSwitchChange(item)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
              </div>
            </>
          ))
        }
        </div>
    </div>
  );
};

export default CatalogItems;

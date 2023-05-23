/* eslint-disable */
import { Grid, Typography } from '@mui/material';
import './orderDetails.css'

import { useLocation } from 'react-router-dom';

const OrderDetails = () => {
  const { state:orderDetails } = useLocation()

  return (
    <>
      <div className='order-container bg-white border border-1 rounded-2 p-4 pe-5 mb-4'>
        <div className='order-image-container'>
          <img alt='go ahed' src={orderDetails?.item.images[0]}/>
          <div className='h-100'>
            <div className='fs-6 mb-1'>WEAR TO 3 WAY OUTFIT</div>
            <div>Variant: GRAY SHADE</div>
            <div>Qty: 1</div>
          </div>
          <div className='fs-4' id="price" >₹1199</div>
        </div>
        <div className='order-line w-100 my-4'></div>
        <div className='w-100 d-flex justify-content-between mb-3 px-2'>
          <div>Item(s) Total</div>
          <div>₹{orderDetails?.item.discountedPrice}</div>
        </div>
        <div className='w-100 d-flex justify-content-between px-2'>
          <div>Delivery fees</div>
          <div>₹0</div>
        </div>
        <div className='order-line w-100 my-4'></div>
        <div className='w-100 d-flex justify-content-between px-2'>
          <h5>Grand Total</h5>
          <h3>₹{orderDetails?.item.discountedPrice}</h3>
        </div>
      </div>
      <Grid item xs={12} sx={{ mb: 2.25 }}>
        <Typography variant="h5">Address Details</Typography>
      </Grid>
      <div className='order-container bg-white border border-1 rounded-2 p-4 pe-5'>
        <div className='mb-3 px-2'>
          <div className='opacity-50'>Name & Mobile</div>
          <div>{orderDetails?.addressDetails.name} | {orderDetails?.addressDetails.mobile}</div>
        </div>
        <div className='mb-3 px-2'>
          <div className='opacity-50'>Delivery Address</div>
          <div>{orderDetails?.addressDetails.deliveryAddress}</div>
        </div>
        <div className='mb-3 px-2'>
          <div className='opacity-50'>Landmark</div>
          <div>{orderDetails?.addressDetails.landmark}</div>
        </div>
        <div className='mb-3 px-2'>
          <div className='opacity-50'>City & Pincode</div>
          <div>{orderDetails?.addressDetails.city} {orderDetails?.addressDetails.pincode}</div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;

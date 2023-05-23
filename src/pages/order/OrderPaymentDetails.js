import './orderDetails.css'

import { useLocation } from 'react-router-dom';

const OrderPaymentDetails = () => {
  const { state:orderDetails } = useLocation()

  return (
    <div className='bg-white border border-1 rounded-2 p-4 pe-5 mb-4 d-flex flex-column align-items-center'>
      <div className='mt-5'>Bill Amount</div>
      <h2 className='mb-5'>₹{orderDetails?.item.discountedPrice}</h2>
      <div className='w-100 d-flex justify-content-between px-2'>
        <div>Bill Amount</div>
        <h6>₹{orderDetails?.item.discountedPrice}</h6>
      </div>
      <div className='w-100 d-flex justify-content-between px-2'>
        <div>Transaction Charges (0%)</div>
        <h6>₹0</h6>
      </div>
      <div className='w-100 d-flex justify-content-between align-items-center px-2 py-2 my-2 rounded-2'>
        <h6>Amount Settled</h6>
        <h6>₹{orderDetails?.item.discountedPrice}</h6>
      </div>
      <div className='w-100 d-flex justify-content-between px-2 mt-5'>
        <div>Payment Mode</div>
        <h6>UPI</h6>
      </div>
    </div>
  );
}

export default OrderPaymentDetails;

import {
  Grid,
  Typography
} from '@mui/material';

import OrderStatusDetails from './OrderStatusDetails';
import OrderDetails from './OrderDetails';
import OrderPaymentDetails from './OrderPaymentDetails';

const OrderDefault = () => {

  return (
    <Grid className='pb-5' container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Order Info</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={12}>
        <OrderStatusDetails />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <Grid item xs={12} md={7} lg={8}>
        <Grid container sx={{ mb: 2.25}}>
          <Grid item>
            <Typography variant="h5">Order Details</Typography>
          </Grid>
        </Grid>
        <OrderDetails />
      </Grid>
      <Grid item xs={12} md={5} lg={4} >
        <Grid container sx={{ mb: 2.25}}>
          <Grid item>
            <Typography variant="h5">Payment Details</Typography>
          </Grid>
        </Grid>
        <OrderPaymentDetails />
      </Grid>
    </Grid>
  );
};

export default OrderDefault;

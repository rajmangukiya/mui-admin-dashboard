import PropTypes from 'prop-types';

import { 
  Box, 
  Grid, 
  Stack, 
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

import MainCard from 'components/MainCard';
import { useState } from 'react';
import { deliveryStatus } from 'utils/constant';
import { useLocation } from 'react-router-dom';
import { ApiPatch } from 'utils/ApiData';

const OrderStatusDetails = () => {
  const { state:orderDetails } = useLocation();

  const [selectedStatus, setSelectedStatus] = useState(orderDetails?.status);

  const handleSelectChange = async ({target: {value}}) => {
    setSelectedStatus(value)
    await ApiPatch('order/changeStatus', {
      orderId: orderDetails?._id,
      status: value
    })
  }
  

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack direction='row' spacing={0.5}>
        <Grid container style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Grid item>
            <Typography variant="h4" color="inherit">
              Delivery Status
            </Typography>
          </Grid>
          <FormControl sx={{minWidth: 200}}>
            <InputLabel id="demo-simple-select-label">Delivery Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedStatus}
              label="deliveryStatus"
              onChange={handleSelectChange}
            >
              {
                Object.keys(deliveryStatus).map((status, index) => (
                  <MenuItem key={index} value={status}>{status}</MenuItem>
                ))
              }
            </Select>
        </FormControl>
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          Customer paid on: 02/05/23
        </Typography>
      </Box>
    </MainCard>
  );
}

OrderStatusDetails.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

OrderStatusDetails.defaultProps = {
  color: 'primary'
};

export default OrderStatusDetails;

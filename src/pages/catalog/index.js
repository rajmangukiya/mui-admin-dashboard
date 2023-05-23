import {
  Grid,
} from '@mui/material';
import CatalogItems from 'components/cards/catalog/CatalogItems';

const CatalogDefault = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <CatalogItems />
    </Grid>
  );
};

export default CatalogDefault;

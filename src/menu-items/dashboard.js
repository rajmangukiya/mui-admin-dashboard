// assets
import { DashboardOutlined, UnorderedListOutlined, AppstoreAddOutlined  } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined 
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'catalog',
      title: 'Catalog',
      type: 'item',
      url: '/catalog',
      icon: icons.UnorderedListOutlined,
      target: false
    },
    {
      id: 'add_item',
      title: 'Add Item',
      type: 'item',
      url: '/item',
      icon: icons.AppstoreAddOutlined ,
      target: false
    }
  ]
};

export default dashboard;

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { menuList } from './sidebarItems';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import src from 'src/client/assets/Forestoken logo.png';
import Image from 'next/image';

const drawerWidth = 300;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const DrawerMenu = ({ open, toggleDrawer }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: [1],
        }}
      >
        <>
          <Image src={src} alt="Forestoken" sx={styles.logo} height={40} width={40}/>
          <span sx={styles.title}>Forestoken</span>
        </>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">{menuList}</List>
    </Drawer>
  );
};

const styles = {
  logo: {
    minWidth: 'auto',
    width: '50px',
    height: '50px',
  },
  title: {
    padding: '20px 10px',
    fontFamily: 'logo',
    fontSize: '18px',
    color: 'text',
    fontWeight: '400',
    lineHeight: '1.2',
  },
};

export default DrawerMenu;

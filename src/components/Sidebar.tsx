import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Dashboard, AttachMoney, Savings, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)"); // ✅ Deteksi ukuran layar

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/" onClick={toggleDrawer}>
          <ListItemIcon sx={{ color: "white" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/transactions" onClick={toggleDrawer}>
          <ListItemIcon sx={{ color: "white" }}>
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary="Transaksi" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/savings" onClick={toggleDrawer}>
          <ListItemIcon sx={{ color: "white" }}>
            <Savings />
          </ListItemIcon>
          <ListItemText primary="Tabungan" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <>
      {/* Tombol Menu untuk Mobile */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            color: "white",
            backgroundColor: "#1976d2",
            zIndex: 1201, // Agar di atas elemen lain
          }}
        >
          <Menu />
        </IconButton>
      )}

      {/* Drawer untuk Desktop (permanen) & Mobile (bisa ditutup) */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: isMobile ? "auto" : 20,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Spacer agar konten tidak tertutup di desktop */}
      {!isMobile && <Box sx={{ width: 240 }} />}
    </>
  );
};

export default Sidebar;

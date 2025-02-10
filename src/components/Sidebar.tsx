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
  useTheme,
  Slide,
} from "@mui/material";
import { Dashboard, AttachMoney, Savings, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // ✅ Gunakan tema breakpoints

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
            position: "fixed",
            top: 15,
            left: 15,
            color: "white",
            backgroundColor: "#1976d2",
            zIndex: 1300, // ✅ Pastikan selalu di atas
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          <Menu />
        </IconButton>
      )}

      {/* Animasi Slide untuk Sidebar Mobile */}
      <Slide direction="right" in={mobileOpen} mountOnEnter unmountOnExit>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen || !isMobile} // ✅ Drawer tetap terbuka di desktop
          onClose={toggleDrawer}
          transitionDuration={{ enter: 400, exit: 300 }} // ✅ Tambahkan animasi masuk & keluar
          sx={{
            width: isMobile ? "auto" : 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#1976d2",
              color: "white",
              transition: "transform 0.3s ease-in-out", // ✅ Tambahkan transisi
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Slide>

      {/* Spacer agar konten utama tidak tertutup */}
      {!isMobile && <Box sx={{ width: 240 }} />}
    </>
  );
};

export default Sidebar;

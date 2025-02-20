import { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box, useMediaQuery, useTheme, Toolbar, } from "@mui/material";
import { Dashboard, AttachMoney, Savings, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
var Sidebar = function () {
    var _a = useState(false), mobileOpen = _a[0], setMobileOpen = _a[1];
    var theme = useTheme();
    var isMobile = useMediaQuery(theme.breakpoints.down("md")); // ✅ Sidebar akan berubah di mobile
    var toggleDrawer = function () {
        setMobileOpen(!mobileOpen);
    };
    var drawerContent = (<Box sx={{ width: 240 }}>
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon sx={{ color: "white" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/transactions" onClick={toggleDrawer}>
            <ListItemIcon sx={{ color: "white" }}>
              <AttachMoney />
            </ListItemIcon>
            <ListItemText primary="Transaksi"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/savings" onClick={toggleDrawer}>
            <ListItemIcon sx={{ color: "white" }}>
              <Savings />
            </ListItemIcon>
            <ListItemText primary="Tabungan"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>);
    return (<>
      {/* Tombol Menu hanya muncul di mobile */}
      {isMobile && (<IconButton onClick={toggleDrawer} sx={{
                position: "fixed",
                top: 15,
                left: 15,
                color: "white",
                backgroundColor: "#1976d2",
                zIndex: 1300, // ✅ Agar tidak tertutup elemen lain
                "&:hover": { backgroundColor: "#1565c0" },
            }}>
          <Menu />
        </IconButton>)}

      {/* Sidebar Mobile dengan Animasi */}
      <Drawer variant={isMobile ? "temporary" : "permanent"} // ✅ Sidebar permanen di desktop, bisa ditutup di mobile
     open={isMobile ? mobileOpen : true} // ✅ Di desktop, sidebar selalu terbuka
     onClose={toggleDrawer} ModalProps={{
            keepMounted: true, // ✅ Optimasi performa untuk mobile
        }} sx={{
            "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                backgroundColor: "#1976d2",
                color: "white",
            },
        }}>
        {drawerContent}
      </Drawer>

      {/* Spacer agar konten utama tidak tertutup sidebar */}
      {!isMobile && <Box sx={{ width: 240 }}/>}
    </>);
};
export default Sidebar;

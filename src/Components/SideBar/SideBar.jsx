// src/components/Menu.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <List>
      <ListItem button component={Link} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/orders">
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button component={Link} to="/add-product">
        <ListItemText primary="Add Product" />
      </ListItem>
      <ListItem button component={Link} to="/products">
        <ListItemText primary="Products" />
      </ListItem>
      {/* Add more items as needed */}
    </List>
  );
};

export default Menu;

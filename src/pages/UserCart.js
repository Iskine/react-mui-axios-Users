import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const UserCart = () => {
  const [userCarts, setUserCarts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    fetchUserCarts();
  }, [userId]);

  const fetchUserCarts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${userId}/carts`);
      const { carts } = response.data;
      setUserCarts(carts);
    } catch (error) {
      console.error(error);
    }
  };

  if (userCarts.length === 0) {
    return <div>No carts available for this user.</div>;
  }

  return (
    <Box>
      <Typography variant="h2" component="h2" gutterBottom>
        User Carts
      </Typography>
      {userCarts.map((cart) => (
        <Box key={cart.id}>
          <Typography variant="h4" component="h3" gutterBottom>
            Cart ID: {cart.id}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Discount Percentage</TableCell>
                  <TableCell>Discounted Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.total}</TableCell>
                    <TableCell>{product.discountPercentage}</TableCell>
                    <TableCell>{product.discountedPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography>Total: {cart.total}</Typography>
          <Typography>Discounted Total: {cart.discountedTotal}</Typography>
          <Typography>Total Products: {cart.totalProducts}</Typography>
          <Typography>Total Quantity: {cart.totalQuantity}</Typography>
        </Box>
      ))}
    </Box>
  );
};

UserCart.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserCart;

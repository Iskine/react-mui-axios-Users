import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@mui/material';

const UserTodo = () => {
  const [userTodos, setUserTodos] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    fetchUserTodos();
  }, [userId]);

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${userId}/todos`);
      const { todos } = response.data;
      setUserTodos(todos);
    } catch (error) {
      console.error(error);
    }
  };

  if (userTodos.length === 0) {
    return <div>No todo available for this user.</div>;
  }

  return (
    <Box>
      <Typography variant="h2" component="h2">
        User Todo
      </Typography>
      <List>
        {userTodos.map((todo) => (
          <ListItem key={todo.id} disablePadding>
            <ListItemIcon>
              <Checkbox edge="start" checked={todo.completed} />
            </ListItemIcon>
            <ListItemText primary={todo.todo} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

UserTodo.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserTodo;

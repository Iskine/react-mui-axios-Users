import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const UserPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${userId}/posts`);
      const { posts } = response.data;
      setUserPosts(posts);
    } catch (error) {
      console.error(error);
      // Handle the error if the post data fetching fails
    }
  };

  if (userPosts.length === 0) {
    return <div>No posts available for this user.</div>;
  }

  return (
    <Box>
      <Typography variant="h2" component="h2" gutterBottom>
        User Posts
      </Typography>
      {userPosts.map((post) => (
        <Box key={post.id} marginBottom={2}>
          <Typography variant="h4" component="h3" gutterBottom>
            {post.title}
          </Typography>
          <Typography>{post.body}</Typography>
          <Typography>Reactions: {post.reactions}</Typography>
        </Box>
      ))}
    </Box>
  );
};

UserPost.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserPost;

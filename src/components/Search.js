import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

const Search = ({ searchQuery, setSearchQuery, handleSearchSubmit }) => {
  return (
    <Box display="flex" justifyContent="center" marginBottom="1rem">
      <form onSubmit={handleSearchSubmit}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "600px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
    </Box>
  );
};


Search.propTypes = {
	searchQuery: PropTypes.string.isRequired,
	setSearchQuery: PropTypes.func.isRequired,
	handleSearchSubmit: PropTypes.func.isRequired,
  };

  
export default Search;

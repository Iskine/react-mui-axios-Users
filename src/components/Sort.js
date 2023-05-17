import React from 'react';
import { ButtonGroup, Select, MenuItem, Box } from '@mui/material';
import PropTypes from 'prop-types';


const Sort = ({ sortCriteria, handleSortChange }) => {
  return (
    <Box display="flex" justifyContent="center" marginTop="1rem" width="100%" placeholder="Sort" marginBottom={"3rem"}>
      <ButtonGroup>
        <Select
          value={sortCriteria}
          onChange={handleSortChange}
          variant="outlined"
          color="primary"
          sx={{ width: '300px' }}
          displayEmpty 
          renderValue={(selected) => (selected ? 'Sort by ' + selected : 'Sort')} 
        >
          <MenuItem value="" disabled>
            <em>Sort</em>
          </MenuItem>
          <MenuItem value="ID">Sort by ID</MenuItem>
          <MenuItem value="Name">Sort by Name</MenuItem>
          <MenuItem value="Age (Low to High)">Sort by Age (Low to High)</MenuItem>
          <MenuItem value="Age (High to Low)">Sort by Age (High to Low)</MenuItem>
          <MenuItem value="Gender (Female)">Sort by Gender (Female)</MenuItem>
          <MenuItem value="Gender (Male)">Sort by Gender (Male)</MenuItem>
        </Select>
      </ButtonGroup>
    </Box>
  );
};


Sort.propTypes = {
	sortCriteria: PropTypes.string.isRequired,
	handleSortChange: PropTypes.func.isRequired,
  };

export default Sort;

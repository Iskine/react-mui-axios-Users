import React from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage, setCurrentPage }) => {
  return (
    <Box display="flex" justifyContent="center" marginTop="1rem">
      <ButtonGroup>
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          sx={{
            backgroundColor: '#1565c0',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          Previous Page
        </Button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <Button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            disabled={currentPage === idx + 1}
            sx={{
              backgroundColor: currentPage === idx + 1 ? '#bbdefb' : 'white',
              color: currentPage === idx + 1 ? 'white' : 'black',
              '&:hover': {
                backgroundColor: currentPage === idx + 1 ? '#1e88e5' : '#f0f0f0',
              },
            }}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{
            backgroundColor: '#1565c0',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          Next Page
        </Button>
      </ButtonGroup>
    </Box>
  );
};

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	handlePreviousPage: PropTypes.func.isRequired,
	handleNextPage: PropTypes.func.isRequired,
	setCurrentPage: PropTypes.func.isRequired,
  };

export default Pagination;

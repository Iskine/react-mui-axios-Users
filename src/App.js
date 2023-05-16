import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, ButtonGroup } from '@mui/material';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users?limit=100');
      const { users } = response.data;
      setUsers(users);
      setSearchResults(users);
      setTotalPages(Math.ceil(users.length / 20));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);

    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredResults = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;

      return (
        user.id.toString().includes(lowercaseQuery) ||
        fullName.toLowerCase().includes(lowercaseQuery) ||
        user.age.toString().includes(lowercaseQuery) ||
        user.gender.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.phone.toLowerCase().includes(lowercaseQuery)
      );
    });

    setSearchResults(filteredResults);
    setTotalPages(Math.ceil(filteredResults.length / 20));
  };

  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;
  const paginatedUsers = searchResults.slice(startIndex, endIndex);

  return (
    <Box padding={4}>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          label="Search users..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{width: '500px'}}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Age Category</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedUsers.map((user, index) => {
            const rowStyle = index % 2 === 0 ? { backgroundColor: '#e1f5fe' } : { backgroundColor: 'white' };

            let ageCategory;

            if (user.age < 1) {
              ageCategory = 'วัยแรกเกิด';
            } else if (user.age <= 22) {
              ageCategory = 'วัยเรียน';
            } else if (user.age <= 60) {
              ageCategory = 'วัยทำงาน';
            } else {
              ageCategory = 'วัยเกษียณ';
            }

            return (
              <TableRow key={user.id} style={rowStyle}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{ageCategory}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            );
          })}

          </TableBody>
        </Table>
      </TableContainer>
      <div>
    <ButtonGroup>
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        sx={{}}
      >
        Previous Page
      </Button>
      {Array.from({ length: totalPages }, (_, idx) => (
        <Button
          key={idx + 1}
          onClick={() => setCurrentPage(idx + 1)}
          disabled={currentPage === idx + 1}
          sx={{
            bgcolor: currentPage === idx + 1 ? '#1e88e5' : 'white',
            color: currentPage === idx + 1 ? 'white' : 'black',
          }}
        >
          {idx + 1}
        </Button>
      ))}
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{}}
        >
        Next Page
      </Button>
    </ButtonGroup>
      </div>
    </Box>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, ButtonGroup, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');

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



  const sortUsers = (criteria) => {
    let sortedUsers = [...searchResults];

    switch (criteria) {
      case 'name':
        sortedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'age-asc':
        sortedUsers.sort((a, b) => a.age - b.age);
        break;
      case 'age-desc':
        sortedUsers.sort((a, b) => b.age - a.age);
        break;
      case 'gender-female':
        sortedUsers = sortedUsers.filter((user) => user.gender === 'female');
        break;
      case 'gender-male':
        sortedUsers = sortedUsers.filter((user) => user.gender === 'male');
        break;
      default:
        break;
    }

    setSearchResults(sortedUsers);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
    sortUsers(event.target.value);
  };

  return (
    <Box paddingX={10} paddingY={9}>

      <Typography display="flex" justifyContent="center" variant="h2" component="h1" gutterBottom>
        User List
      </Typography>

      <Box display="flex" justifyContent="center" marginBottom="1rem">
        <form onSubmit={handleSearchSubmit}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "600px"}}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>
      </Box>


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
            <MenuItem value="Name">Sort by Name</MenuItem>
            <MenuItem value="Age (Low to High)">Sort by Age (Low to High)</MenuItem>
            <MenuItem value="Age (Hight to Low)">Sort by Age (High to Low)</MenuItem>
            <MenuItem value="Gender (Female)">Sort by Gender (Female)</MenuItem>
            <MenuItem value="Gender (Male)">Sort by Gender (Male)</MenuItem>
          </Select>
        </ButtonGroup>
      </Box>


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
          backgroundColor: currentPage === idx + 1 ? '#1e88e5' : 'white',
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

      </div>

    </Box>
  );
};

export default App;

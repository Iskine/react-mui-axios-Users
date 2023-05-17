import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Sort from './components/Sort';
import UserPost from './pages/UserPost';
import UserTodo from './pages/UserTodo';
import UserCart from './pages/UserCart';

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
      setTotalPages(Math.ceil(users.length / 10));
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

  const getAgeCategory = (age) => {
    if (age < 1) {
      return 'วัยแรกเกิด';
    } else if (age <= 22) {
      return 'วัยเรียน';
    } else if (age <= 60) {
      return 'วัยทำงาน';
    } else {
      return 'วัยเกษียณ';
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);

    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredResults = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      const ageCategory = getAgeCategory(user.age);

      return (
        user.id.toString().includes(lowercaseQuery) ||
        fullName.toLowerCase().includes(lowercaseQuery) ||
        user.age.toString().includes(lowercaseQuery) ||
        ageCategory.toLowerCase().includes(lowercaseQuery) ||
        user.gender.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.phone.toLowerCase().includes(lowercaseQuery)
      );
    });

    setSearchResults(filteredResults);
    setTotalPages(Math.ceil(filteredResults.length / 10));
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedUsers = searchResults.slice(startIndex, endIndex);

  const sortUsers = (criteria) => {
    let filteredUsers = [...users];

    switch (criteria) {
      case 'ID':
        filteredUsers.sort((a, b) => a.id - b.id);
        break;
      case 'Name':
        filteredUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'Age (Low to High)':
        filteredUsers.sort((a, b) => a.age - b.age);
        break;
      case 'Age (High to Low)':
        filteredUsers.sort((a, b) => b.age - a.age);
        break;
      case 'Gender (Female)':
        filteredUsers = users.filter((user) => user.gender === 'female');
        break;
      case 'Gender (Male)':
        filteredUsers = users.filter((user) => user.gender === 'male');
        break;
      default:
        break;
    }

    setSearchResults(filteredUsers);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
    sortUsers(event.target.value);
  };

  
  

  return (
    <Router>
      <Box marginX={4} marginY={4}>

        <Routes>
          
          <Route path="/user/:userId/post" element={<UserPost users={users} />} />
          <Route path="/user/:userId/todo" element={<UserTodo />} />
          <Route path="/user/:userId/cart" element={<UserCart />} />
        </Routes>

        <Typography display="flex" justifyContent="center" variant="h2" component="h1" gutterBottom>
          User List
        </Typography>

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchSubmit={handleSearchSubmit} />

        <Sort sortCriteria={sortCriteria} handleSortChange={handleSortChange} />

        <UserTable users={paginatedUsers} getAgeCategory={getAgeCategory} />


        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          setCurrentPage={setCurrentPage}
        />


      </Box>
    </Router>
  );
};

export default App;

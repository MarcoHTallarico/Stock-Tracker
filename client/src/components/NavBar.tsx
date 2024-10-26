import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react';
import { logOut } from '../services/auth';

const NavBar = () => {
    return (
        <Flex
        h="80px"
        as="nav"
        align="center"
        justify="space-between"
        padding="2rem"
        bg="teal.500"
        color="white"
    >
        <Box>
          <Text fontSize="2xl" fontWeight="bold" >
            Stock Tracker
          </Text>
        </Box>
        <Box>
          <Button as={Link} to="/dashboard" colorScheme="teal" >
            Dashboard
          </Button>
          <Button as={Link} to="/search" colorScheme="teal">
            Search
          </Button>
          <Button as={Link} to="/" colorScheme="teal" onClick={logOut}>
            Log Out
          </Button>
        </Box>
      </Flex>
    )
}

export default NavBar
import React, { useContext } from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { logInWithGoogle } from '../services/auth'
import { GlobalContext } from '../contexts/GlobalContext'
import { Navigate } from 'react-router'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const { state } = useContext(GlobalContext)
    const navigate = useNavigate()

    if (state.isAuthenticated == null) return <></>;
    return state.isAuthenticated ? <Navigate to={"/dashboard"}/> : (
        <Box h='100vh' overflow='auto'>
            <Flex 
                flexDirection='column'
                alignItems='center'
                gap={10}
                mt={40}
            >
                <Heading mb={8}>
                    Stock Tracker Application
                </Heading>
                <Text>
                    Stock Projections Tracker Web Application for viewing and managing portfolio investments
                </Text>
                <Flex 
                    flexDirection='column' 
                    gap={3}
                    w='300px'
                >
                    <Button
                        onClick={logInWithGoogle}
                        colorScheme='teal' 
                        display='block'
                    >
                        Continue with Google
                    </Button>
                    <Text m={1}>or</Text>
                    <Button p="2" onClick={() => { navigate('/login') }}>Login using Email</Button>
                    <Button p="2" onClick={() => { navigate('/register') }}>Register using Email</Button>
                </Flex>
                
            </Flex>
        </Box>
    )
}

export default Landing
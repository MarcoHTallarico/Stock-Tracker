import React, { useState, useContext } from 'react'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { GlobalContext } from '../contexts/GlobalContext'
import { Navigate } from 'react-router'
import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/auth'

const Register = () => {
    const { state } = useContext(GlobalContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)
    
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (email === "" || password === "" || confirmPassword === "") {
            return setErrorMsg("One or more fields were not filled")   
        }
        if (password !== confirmPassword) {
            return setErrorMsg("Passwords do not match") 
        }

        try {
            const isRegistered = await register(email, password)
            if (!isRegistered) setErrorMsg("Invalid credentials used");        
        } catch(e) {
            setErrorMsg("An unexpected error occured");
        }     
    }

    if (state.isAuthenticated == null) return <></>;
    return state.isAuthenticated ? <Navigate to={"/dashboard"}/> : (
        <Box h='100vh' overflow='auto'>
            <Flex 
                flexDirection='column'
                alignItems='center'
                justifyContent="center"
                h="100%"
            >            
                <FormControl 
                    display="flex" 
                    flexDir="column"
                    maxW="450px"
                    isRequired 
                    isInvalid={errorMsg !== ''}
                >
                    <Flex justifyContent="space-between">
                        <IconButton 
                            w="20px" 
                            mb="50px" 
                            aria-label='back' 
                            icon={<ArrowBackIcon/>} 
                            onClick={() => { navigate('/') }}
                        />
                        <Text fontSize="3xl" fontWeight="bold" mb="30px">Registration</Text>
                        <Box w="40px"></Box>
                    </Flex>
                    <FormLabel>Email address</FormLabel>
                    <Input 
                        mb="30px" 
                        variant='filled' 
                        type='email' 
                        value={email} 
                        onChange={handleEmailChange} 
                        placeholder='Enter your email address...'
                    />
                    <FormLabel>Password</FormLabel>
                    <Input 
                        mb="30px" 
                        variant='filled' 
                        type='password' 
                        value={password} 
                        onChange={handlePasswordChange} 
                        placeholder='Enter your password...'
                    />
                    <FormLabel>Confirm Password</FormLabel>
                    <Input 
                        mb="100px" 
                        variant='filled' 
                        type='password' 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                        placeholder='Enter your password again...'
                    />
                    <Button type='submit' onClick={handleSubmit}>Submit</Button>
                    <FormErrorMessage alignSelf="center">{errorMsg}</FormErrorMessage>
                </FormControl>
            </Flex>
        </Box>
    )
}

export default Register
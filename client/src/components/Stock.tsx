import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Stock = ({stock}: {stock: never}) => {
    const navigate = useNavigate()
    return (
        <Flex 
            w="300px" 
            h="200px" 
            flexDir="column" 
            textAlign="left" 
            border="1px solid"
            borderColor="gray.300"
            gap="5px" 
            borderRadius="20px" 
            pt="25px" 
            pl="20px" 
            pr="20px"
            boxShadow="rgba(99, 99, 99, 0.15) 0px 2px 8px 0px"
            _hover={{backgroundColor: "gray.100", cursor: "pointer"}}
            _active={{backgroundColor: "gray.300"}}
            onClick={() => { navigate(`/stock/${stock["symbol"]}`) }}
        >
            <Text noOfLines={1}>
                <Text fontWeight="bold" as="span">Company: </Text> 
                {stock["name"]}
            </Text>
            <Text noOfLines={1}>
                <Text fontWeight="bold" as="span">Ticker: </Text> 
                {stock["symbol"]}
            </Text>
            <Text noOfLines={1}>
                <Text fontWeight="bold" as="span">Country: </Text> 
                {stock["country"]}
            </Text>
            <Text noOfLines={1}>
                <Text fontWeight="bold" as="span">Currency: </Text> 
                {stock["currency"]}
            </Text>
            <Text noOfLines={1}>
                <Text fontWeight="bold" as="span">Exchange: </Text> 
                {stock["exchange"]}
            </Text>
        </Flex>
    )
}

export default Stock
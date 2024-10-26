import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { fetchPortfolioStocks, fetchTrendingStocks } from '../services/stocks';
import { GlobalContext } from '../contexts/GlobalContext';

const Dashboard: React.FC = () => {
    const { state } = useContext(GlobalContext)
    const [portfolioStocks, setPortfolioStocks] = useState([]);
    const [trendingStocks, setTrendingStocks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (state.uid === null) return;

            setPortfolioStocks(await fetchPortfolioStocks(state.uid))
            setTrendingStocks(await fetchTrendingStocks())
        }

        fetchData();
    }, [state.uid]); // Empty dependency array to run only once when the component mounts

    const formatNums = (number: string) => {
        return parseFloat(number).toFixed(2)
    }

    return (
        <Box>
        <Flex mt="8" p="4" ml="2">
            {/* My Portfolio Section */}
            <Box flex="1" mr="4">
                <Text fontSize = "xl" mb="4" textAlign={'left'}>My Portfolio</Text>
                <Flex flexDirection='column' gap={3} w='500px' mb="4">
                    {
                        portfolioStocks.map((stock, i) => {
                            return (
                                <Button 
                                    key={i}
                                    p="2" 
                                    h="150px" 
                                    fontSize="xl" 
                                    color={stock["change"] >= 0 ? "green" : "red"} 
                                    as={Link} 
                                    to={`/stock/${stock["symbol"]}`}
                                >
                                    {stock["symbol"]}&nbsp;
                                    {formatNums(stock["close"])}&nbsp;
                                    {formatNums(stock["change"])}&nbsp;
                                    {`(${formatNums(stock["percent_change"])}%)`}
                                </Button>
                            )
                        })
                    }
                    {portfolioStocks.length === 0 && <Text textAlign="left">No stocks in your portfolio...</Text>}
                </Flex>
            </Box>

            {/* Trending Stocks Section */}
            <Box flex="1">
            <Text fontSize="xl" mb="4" textAlign={'left'}>
                Trending Stocks
            </Text>
            <Flex flexDirection='column' gap={3} w='500px' mb="4">
                {
                    trendingStocks.map((stock, i) => {
                        return (
                            <Button 
                                key={i}
                                p="2" 
                                h="150px" 
                                fontSize="xl" 
                                color={stock["change_amount"] >= 0 ? "green" : "red"} 
                                as={Link} 
                                to={`/stock/${stock["ticker"]}`}
                            >
                                {stock["ticker"]}&nbsp;
                                {formatNums(stock["price"])}&nbsp;
                                {formatNums(stock["change_amount"])}&nbsp;
                                {`(${formatNums(stock["change_percentage"])}%)`}
                            </Button>
                        )
                    })
                }
                {trendingStocks.length === 0 && <Text textAlign="left">No stocks currently trending...</Text>}
            </Flex>
            </Box>
        </Flex>
        </Box>
    );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Input, Button, Grid } from '@chakra-ui/react';
import { fetchStocks } from '../services/stocks';
import Pagination from '../components/Pagination';
import Stock from '../components/Stock';

const Search = () => {
  const [stocks, setStocks] = useState([]);
  const [pages, setPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState<string>('')

    const fetchData = async (searchString: string = "", page: number = 1, count: number = 9) => {
        const stocksData = await fetchStocks(searchString, page, count)
        setStocks(stocksData["stocks"])
        setPages(stocksData["pages"])
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onPageChange = (page: number) => {
        if (page < 1 || page > pages) return
        setCurrPage(page)
        fetchData(search, page)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        fetchData(search)
        setCurrPage(1)
    }

    return (
        <Box overflow='auto'>
            <Flex ml="auto" mr="auto" mt="30px" maxW="1000px" h="100%" flexDirection='column' alignItems='center'>
                <Flex w="100%" gap="5px" mb="40px">
                    <Input flexGrow="1" placeholder="Query for stock by ticker or name..." value={search} onChange={handleSearchChange}/>
                    <Button onClick={handleSubmit}>Search</Button>
                </Flex>
                
                { stocks.length === 0 
                    ? <Text ml="auto" mr="auto" mb="30px" textAlign="center">No stocks were found</Text>
                    : (
                        <Grid gridTemplateColumns="repeat(3, 1fr)" gridGap="10px" mb="30px">
                            {
                                stocks.map((stock, i) => {
                                    return (
                                        <Stock key={i} stock={stock}/>
                                    )
                                })
                            }
                        </Grid>
                    )
                }
                <Pagination
                    currentPage={currPage}
                    totalPages={pages}
                    onPageChange={onPageChange}
                />
            </Flex>
        </Box>
    );
};

export default Search;

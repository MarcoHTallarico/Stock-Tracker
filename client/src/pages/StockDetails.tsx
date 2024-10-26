import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import { fetchStock } from '../services/stocks';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { GlobalContext } from '../contexts/GlobalContext';
import { addToPortfolio, isStockInPortfolio, removeFromPortfolio } from '../services/portfolio';
import { LinkIcon } from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useToast } from '@chakra-ui/react'

const StockDetails = () => {
    const { ticker } = useParams();
    const { state } = useContext(GlobalContext)
    const [stock, setStock] = useState(null)
    const [history, setHistory] = useState(null)
    const [inPortfolio, setInPortfolio] = useState(false)
    const [graphTitle, setGraphTitle] = useState("Last Month") 

    const toast = useToast()

    const fetchData = async (interval: string = "1day") => {
        const stockData = ticker ? await fetchStock(ticker, interval) : {}
        if (Object.keys(stockData).length !== 0) {
            setStock(stockData["meta"])
            setHistory(stockData["values"])
        }
    }

    useEffect(() => {
        const fetchInPortfolio = async () => {
            if (state.uid === null || ticker === undefined) return; 
            setInPortfolio(await isStockInPortfolio(state.uid, ticker))
        }

        fetchInPortfolio()
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticker, addToPortfolio, removeFromPortfolio])
    
    const handleSubmit = async (action: 'delete' | 'add') => {
        if (state.uid === null || ticker === undefined ) return;
        if (action === "add") {
            return setInPortfolio(await addToPortfolio(state.uid, [ticker]))
        }
        
        setInPortfolio(!await removeFromPortfolio(state.uid, [ticker]))
        
    }

    if (stock === null || history === null) return <></>;
    return (
        <Flex flexDir="column" alignItems="center" w="100vw" p="20px 50px">
            <Flex w="100%" justifyContent="flex-end" gap="10px">
                { !inPortfolio ?
                    <Button onClick={() => {handleSubmit("add")}}>Add to portfolio</Button>
                    :
                    <Button onClick={() => {handleSubmit("delete")}}>Remove from portfolio</Button>
                }
                <CopyToClipboard text={window.location.href}>
                    <IconButton 
                        aria-label='link' 
                        icon={<LinkIcon />} 
                        onClick={() => 
                            toast({
                                title: 'URL copied to clipboard',
                                variant: "subtle",
                                duration: 1000,
                                isClosable: true,
                            })
                        }
                    />
                </CopyToClipboard>
                
            </Flex>
            <Flex flexDirection="column" gap="8px" mb="140px">
                <Text fontWeight="bold" fontSize="3xl" mb="10px">{stock["name"]}</Text>
                <Text noOfLines={1}>
                    <Text fontWeight="bold" as="span">Ticker: </Text> 
                    {stock["symbol"]}
                </Text>
                <Text noOfLines={1}>
                    <Text fontWeight="bold" as="span">Exchange Timezone: </Text> 
                    {stock["exchange_timezone"]}
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
            
            <Box>
                <Flex gap="5px" mb="25px" justifyContent="flex-end">
                    <Button size='xs' onClick={() => { fetchData("1h"); setGraphTitle("Last Day"); }}>1D</Button>
                    <Button size='xs' onClick={() => { fetchData("1day"); setGraphTitle("Last Month"); }}>1M</Button>
                    <Button size='xs' onClick={() => { fetchData("1month"); setGraphTitle("Last Year"); }}>1Y</Button>
                </Flex>

                <AreaChart width={900} height={300} data={history}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2C7A7B" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#2C7A7B" stopOpacity={0.5}/>
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="close" 
                        stroke="#2C7A7B" 
                        fill="url(#chartColor)"
                        fillOpacity={1} 
                        strokeWidth={0.5}
                    />
                    <Tooltip />
                    <XAxis dataKey="datetime"/>
                    <YAxis domain={["low", "high"]}/>
                </AreaChart>
                <Text fontWeight="Bold">{graphTitle}</Text>
            </Box>
        </Flex>
    )
}

export default StockDetails
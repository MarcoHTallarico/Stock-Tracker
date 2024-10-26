import { fetchPortfolio } from "./portfolio";

export const fetchStocks = async (searchString: string, page: number, count: number) => {
    try {
        const res = await fetch('stocks.json')
        const data = await res.json();
        const stocks = data["data"]
        const regex = new RegExp(`^${searchString}.*`, 'g');

        const filteredStocks = stocks.filter((stock: { [x: string]: string; }) => {
            return regex.test(stock["symbol"]) || regex.test(stock["name"])
        })

        const start = (page - 1) * count
        const end = start + count

        return { 
            stocks: filteredStocks.slice(start, end), 
            pages: filteredStocks.length !== 0 ? Math.ceil(filteredStocks.length / count) : 1
        }
    } catch(e) {
        return { stocks: [], pages: 1 }
    }
}

export const fetchStock = async (ticker: string, interval: string) => {
    try {
        const res = await fetch('https://api.twelvedata.com/time_series?' + new URLSearchParams({
            apikey: "7ef3b4554c8b47a9add367f789f5ec29",
            exchange: "NASDAQ",
            symbol: ticker,
            interval: interval
        }))
        
        const data = await res.json();
        data.values = data.values.reverse()
        data.meta.name = await fetchStockNameByTicker(ticker)
        return data
    } catch(e) {
        return null
    }
}

const fetchStockNameByTicker = async (ticker: string) => {
    try {
        const res = await fetch('../stocks.json')
        const data = await res.json();
        const stocks = data["data"]
       
        const stock = stocks.find((stock: { [x: string]: string; }) => { 
            return stock["symbol"] === ticker 
        })

        return stock["name"]
    } catch(e) {
        return ""
    }
}

export const fetchPortfolioStocks = async (uid: string) => {
    try {
        const tickers = await fetchPortfolio(uid)
        if (tickers.length === 0) return [];

        const res = await fetch('https://api.twelvedata.com/quote?' + new URLSearchParams({
            apikey: "7ef3b4554c8b47a9add367f789f5ec29",
            symbol: tickers.toString()
        }))
        
        const data = await res.json();
        if (tickers.length == 1) {
            return [data] as never[]
        }
        
        return Object.values(data) as never[]
    } catch(e) {
        return []
    }
}

export const fetchTrendingStocks = async () => {
    try {
        const response = await fetch('https://www.alphavantage.co/query?' + new URLSearchParams({
            apikey: "GQ9OGDSAVXTJA5FR",
            function: "TOP_GAINERS_LOSERS",
         }))
        const data = await response.json();
        return data["top_gainers"] !== undefined ? data["top_gainers"].slice(0,10) : fetchStaticTrending()
    } catch (error) {
        console.error('Error fetching data:', error);
        return []
    }
};

export const fetchStaticTrending = async () => {
    try {
        const res = await fetch('trending.json')
        const data = await res.json();
        const trendingStocks = data["top_gainers"]
        return trendingStocks.slice(0,10)
    } catch (error) {
        console.error('Error fetching data:', error);
        return []
    }
};
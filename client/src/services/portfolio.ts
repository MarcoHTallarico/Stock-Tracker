import { axiosInstance } from "./axios"

export const fetchPortfolio = async (uid: string) => {
    try {
        const res = await axiosInstance.get(`/users/${uid}/portfolio`)
        const tickers = res.data["portfolio"]
        return tickers
    } catch(e) {
        return []
    }
}

export const addToPortfolio = async (uid: string, items: string[]) => {
    try {
        await axiosInstance.post(`/users/${uid}/portfolio`, { tickers: items })
        return true
    } catch(e) {
        return false
    }
}

export const removeFromPortfolio = async (uid: string, items: string[]) => {
    try {
        await axiosInstance.post(`/users/${uid}/portfolio/delete`, { tickers: items })
        return true
    } catch(e) {
        return false
    }
}

export const isStockInPortfolio = async (uid: string, ticker: string) => {
    try {
        const res = await axiosInstance.get(`/users/${uid}/portfolio/${ticker}`)
        return res.data["in_portfolio"]
    } catch(e) {
        return false
    }
}
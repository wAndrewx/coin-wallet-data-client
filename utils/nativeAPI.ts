import axios from "axios"

const getDaily = async () => {
    let res = await axios.get(`${process.env.API_HOST}/coin/daily`)
    return res.data.query
}

const getTotal = async () => {
    let res = await axios.get(`${process.env.API_HOST}/coin/total`)
    return res.data.query
}

const incrementCoin = async (ticker: string, token: string) => {
    if (ticker && token) {
        try {
            let res = await axios.patch(`${process.env.API_HOST}/coin/total`, {}, { params: { ticker: ticker, token: token } })

        } catch (error) {
            console.log(error)
        }
    }
}
export { getDaily, getTotal, incrementCoin }
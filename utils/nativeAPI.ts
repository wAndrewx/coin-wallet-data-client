import axios from "axios"

const connection = 'http://localhost:8080'

const getDaily = async () => {
    let res = await axios.get(`${connection}/coin/daily`)
    // console.log(res.data)
    return res.data.query
}

const getTotal = async () => {
    let res = await axios.get(`${connection}/coin/total`)
    console.log(res.data)
    return res.data.query
}

const incrementCoin = async (ticker: string, token: string) => {
    if (ticker && token) {
        try {
            let res = await axios.patch(`${connection}/coin/total`, {}, { params: { ticker: ticker, token: token } })

        } catch (error) {
            console.log(error)
        }
    }
}
export { getDaily, getTotal, incrementCoin }
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
export { getDaily, getTotal }
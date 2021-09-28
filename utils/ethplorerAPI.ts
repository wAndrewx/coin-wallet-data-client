import axios, { AxiosResponse } from 'axios'
const BALANCE_DIVIDER = 1000000000000000000

let ethplorer = 'https://api.ethplorer.io'

let getWallet = async (account: string): Promise<any> => {
    let res = await axios.get(`${ethplorer}/getAddressInfo/${account}/?apiKey=freekey`)
    return res.data
}
// [{ name: string, value: number }]
let balanceParser = (coins: Array<Object>): any => {
    if (coins) {
        try {
            let ethBal = (<any>coins[0]).balance
            let ethRate = (<any>coins[0]).tokenInfo.price.rate
            let output = coins.slice(1).map((item: any, index) => {
                return { value: (item.balance / BALANCE_DIVIDER * item.tokenInfo.price.rate).toFixed(2), id: item.tokenInfo.symbol, label: item.tokenInfo.symbol }
            })

            return [{ value: (ethBal * ethRate).toFixed(2), id: "ETH", label: "ETH" }, ...output]
        } catch (error) {
            console.log("Connect")
        }
    }
}

export { getWallet, balanceParser }
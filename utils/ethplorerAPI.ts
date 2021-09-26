import Web3 from 'web3'
import axios, { AxiosResponse } from 'axios'
let ethplorer = 'https://api.ethplorer.io'

let getWallet = async (account: string): Promise<any> => {
    let res = await axios.get(`${ethplorer}/getAddressInfo/${account}/?apiKey=freekey`)
    return res.data
}

export { getWallet }
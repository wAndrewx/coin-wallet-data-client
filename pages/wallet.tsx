import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useEffect, useState } from "react";

import Web3 from "web3";
import Navigation from "../components/Navigation";

import { CoinInfo } from "../components/wallet/CoinInfo";
import { CoinSelector } from "../components/wallet/CoinSelector";
import { DonutChart } from "../components/wallet/DonutChart";
import { ProjectInfo } from "../components/wallet/ProjectInfo";
import WebsiteStats from "../components/wallet/WebsiteStats";
import { balanceParser, getWallet } from "../utils/ethplorerAPI";
import { incrementCoin } from "../utils/nativeAPI";

declare let window: any;

const Wallet = () => {
  const [isWeb3, setIsWeb3] = useState(false);
  const [isEthMain, setIsEthMain] = useState(true);

  const [displayAccount, setDisplayAccount] = useState("");
  const [wallet, setWallet] = useState("");

  const [coins, setCoins] = useState<any[]>([]);
  const [infoDisplayed, setInfoDisplayed] = useState<Object>({});

  let web3: Web3 = new Web3();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async (accounts: Array<string>) => {
        setDisplayAccount(
          accounts[0].slice(0, 6) +
            "..." +
            accounts[0].slice(accounts[0].length - 5, accounts[0].length - 1)
        );
        await handleGetCoinsWallet(await accounts[0]);
        setWallet(await accounts[0]);
      });
      window.ethereum.on("chainChanged", async (chain: string) => {
        setIsEthMain(chain.includes("0x1"));
        await handleConnect();
        await handleGetCoinsWallet(wallet);
      });
    }
  }, [wallet]);

  let handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      web3 = new Web3(window.ethereum);
      let connect = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // let connect = []

      setWallet(await connect[0]);
      setDisplayAccount(
        connect[0].slice(0, 6) +
          "..." +
          connect[0].slice(connect[0].length - 5, connect[0].length - 1)
      );
      setIsWeb3(true);

      if (
        (await web3.eth.getChainId()) === 1 ||
        (await web3.eth.net.getNetworkType()).match("main")
      ) {
        setIsEthMain(true);
      } else {
        setIsEthMain(false);
      }
      await handleGetCoinsWallet(await connect[0]);

      return true;
    } else {
      return false;
    }
  };

  let handleChainID = async () => {
    if (isWeb3 && !isEthMain) {
      try {
        let switchChain = await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
        setIsEthMain(true);
      } catch (error) {
        setIsEthMain(false);
      }
    }
  };

  let handleGetCoinsWallet = async (account: string) => {
    if (account) {
      let res = await getWallet(account);
      let eth = res.ETH;
      let ethPrice = res.ETH.price;
      let ethObject = {
        ...eth,
        tokenInfo: { name: "Ethereum", symbol: "ETH", price: ethPrice },
      };
      if (res.tokens) {
        let tokens = res.tokens;
        let walletCoins: any[] = [ethObject, ...tokens].filter(
          (item) => item.tokenInfo.price
        ); // filter out items with no market data
        setCoins(walletCoins);
        handleCoinSelectHelper(walletCoins[0].tokenInfo);
      } else {
        setCoins([ethObject]);
        handleCoinSelectHelper(ethObject.tokenInfo);
      }
    }
  };

  const handleCoinSelectHelper = (coin: { name: string; symbol: string }) => {
    setInfoDisplayed(coin);
    incrementCoin(coin.symbol, coin.name); //(ticker, token)
  };

  let handleSelect = (e: Event) => {
    let eventHandler = e.target as HTMLInputElement;
    if (coins) {
      try {
        handleCoinSelectHelper(
          coins[parseInt(eventHandler.value, 10)].tokenInfo
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const MetaButtons = (): ReactJSXElement => {
    return (
      <Box>
        <Button
          onClick={() => {
            handleChainID();
          }}
          display={isEthMain ? "none" : "inline"}
          border="1px"
          mx="4"
        >
          Switch to Eth network
        </Button>
        <Button
          onClick={() => {
            handleConnect();
          }}
          border="1px"
        >
          {!isWeb3 && "Connect"}
          {isWeb3 && displayAccount}
        </Button>
      </Box>
    );
  };

  return (
    <Flex w="100vw" h='100vh' direction="column">
      <Navigation rightFunc={<MetaButtons />} />
      <Flex
        minH="92vh"
        h='100%'
        w="100%"
        px="4"
        direction={["column", "column", "column", "row"]}
        bg="whitesmoke"
      >
        <Box h="100%" minWidth="368px" p="4">
          <WebsiteStats wallet={wallet} />
        </Box>
        <Flex h="100%" minWidth="368px" direction="column">
          <Box p="4">
            <CoinSelector
              isWeb3={isWeb3}
              coins={coins || null}
              selectorFunc={handleSelect}
            />
          </Box>
          <Box h="100%" p="4">
            <CoinInfo infoDisplayed={infoDisplayed} isWeb3={isWeb3} />
          </Box>
        </Flex>

        <Flex h="100%" minWidth="368px" direction="column">
          <Box h="100%" p="4">
            <DonutChart data={coins ? balanceParser(coins) : []} />
          </Box>
          <Box p="4">
            <ProjectInfo />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Wallet;

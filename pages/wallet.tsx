import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useEffect, useState } from "react";

import Web3 from "web3";
import Navigation from "../components/Navigation";
import { CoinInfo } from "../components/wallet/CoinInfo";
import { CoinSelector } from "../components/wallet/CoinSelector";
import { PieChart } from "../components/wallet/PieChart";
import WebsiteStats from "../components/wallet/WebsiteStats";
import { balanceParser, getWallet } from "../utils/ethplorerAPI";
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
      });
      window.ethereum.on("chainChanged", async (chain: string) => {
        console.log(chain);
        setIsEthMain(chain.includes("0x1"));
        await handleConnect();
        await handleGetCoinsWallet(wallet);
      });
    }
  }, [wallet]);

  let handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      web3 = new Web3(window.ethereum);
      let connect = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

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
        await handleGetCoinsWallet(await connect[0]);
      } else {
        setIsEthMain(false);
      }

      return true;
    } else {
      console.log("Please install Metamask");
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
      let tokens = res.tokens;
      let walletCoins: object[] = [
        {
          ...eth,
          tokenInfo: { name: "Ethereum", symbol: "ETH", price: ethPrice },
        },
        ...tokens,
      ];
      setCoins(walletCoins);
    }
  };

  let handleSelect = (e: Event) => {
    let eventHandler = e.target as HTMLInputElement;
    if (coins) {
      try {
        setInfoDisplayed(coins[parseInt(eventHandler.value, 10)].tokenInfo);
      } catch (error) {
        console.log("selection error:", error);
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
    <Box bg="whitesmoke" h="100vh">
      <Navigation rightFunc={<MetaButtons />} />
      <Flex direction={["column", "row"]} m="8" wrap="wrap">
        <Box h="85vh" mx="4" w="368px">
          <WebsiteStats wallet={wallet} />
        </Box>
        <Box>
          <CoinSelector
            isWeb3={isWeb3}
            coins={coins || null}
            selectorFunc={handleSelect}
          />
          <CoinInfo infoDisplayed={infoDisplayed} isWeb3={isWeb3} />
        </Box>
        <PieChart data={coins ? balanceParser(coins) : []} />
      </Flex>
    </Box>
  );
};

export default Wallet;

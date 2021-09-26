import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useEffect, useState } from "react";

import Web3 from "web3";
import Navigation from "../components/Navigation";
import WebsiteStats from "../components/wallet/WebsiteStats";
import { getWallet } from "../utils/ethplorerAPI";
declare let window: any;

const Wallet = () => {
  const [isWeb3, setIsWeb3] = useState(false);
  const [isEthMain, setIsEthMain] = useState(true);
  const [displayAccount, setDisplayAccount] = useState("");
  const [wallet, setWallet] = useState("");
  const [coins, setCoins] = useState<Object[]>();

  let web3: Web3 = new Web3();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async (accounts: Array<string>) => {
        setDisplayAccount(
          accounts[0].slice(0, 6) +
            "..." +
            accounts[0].slice(accounts[0].length - 5, accounts[0].length - 1)
        );
        setWallet(accounts[0]);
        await handleWallet(wallet);
      });

      window.ethereum.on("chainChanged", async (chain: string) => {
        console.log(chain);
        setIsEthMain(chain.includes("0x1"));
        await handleWallet(wallet);
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
        await handleWallet(await connect[0]);
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

  let handleWallet = async (account: string) => {
    if (account) {
      let res = await getWallet(account);
      let eth = res.ETH;
      let tokens = res.tokens;
      let walletCoins: object[] = [
        { ...eth, tokenInfo: { name: "Ethereum", symbol: "ETH" } },
        ...tokens,
      ];
      console.log(walletCoins);
      setCoins(walletCoins);
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
      <Flex direction={["column", "row"]} justify="space-evenly" m="8">
        <Box
          h="85vh"
          w="368px"
          boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
          borderRadius="xl"
        >
          <WebsiteStats wallet={wallet} />
        </Box>
        <Box>
          <Heading fontSize="2xl">Coins in wallet </Heading>
          <Select
            placeholder="Select option"
            onClick={(e) => {
              console.log(e.target.value);
            }}
          >
            {coins?.map((item, index) => {
              return <option key={index} value={item}>{item.tokenInfo.name}</option>;
            })}
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};

export default Wallet;

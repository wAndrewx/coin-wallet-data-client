import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Navigation from "../components/Navigation";
import WebsiteStats from "../components/wallet/WebsiteStats";
import { getCoin } from "../utils/ethplorerAPI";

declare let window: any;

const Wallet = () => {
  const [isWeb3, setIsWeb3] = useState(false);
  const [isEthMain, setIsEthMain] = useState(true);
  const [displayAccount, setDisplayAccount] = useState("");
  const [wallet, setWallet] = useState("");

  let web3: Web3 = new Web3();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
        setDisplayAccount(
          accounts[0].slice(0, 6) +
            "..." +
            accounts[0].slice(accounts[0].length - 5, accounts[0].length - 1)
        );
        setWallet(accounts[0]);
      });

      window.ethereum.on("chainChanged", (chain: string) => {
        console.log(chain);
        setIsEthMain(chain.includes("0x1"));
      });
    }
  }, []);

  let handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      web3 = new Web3(window.ethereum);
      let connect = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setDisplayAccount(
        connect[0].slice(0, 6) +
          "..." +
          connect[0].slice(connect[0].length - 5, connect[0].length - 1)
      );
      setWallet(connect[0]);
      setIsWeb3(true);
      if (
        (await web3.eth.getChainId()) === 1 ||
        (await web3.eth.net.getNetworkType()).match("main")
      ) {
        setIsEthMain(true);
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

  let handleCoins = async () => {
    let walletInfo = await getCoin(wallet);
    let ethHoldings = walletInfo.ETH;
    let tokenHoldings: never[] = walletInfo.tokens;
    console.log(ethHoldings);
    // setInfo(tokenHoldings);
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
      <Flex direction={["column", "row"]} justify="space-evenly" m="8" h='85%'>
        {/* <Button onClick={handleCoins} w="100vw">
          Get info
        </Button> */}
        <Box
          w="368px"
          boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
          borderRadius="xl"
          h="100%"
        >
          <WebsiteStats wallet={wallet} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Wallet;

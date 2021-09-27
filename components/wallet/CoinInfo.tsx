import { Flex, Heading } from "@chakra-ui/layout";

export const CoinInfo = (props: { infoDisplayed: Object; isWeb3: boolean }) => {
  console.log(props.infoDisplayed);
  return (
    <Flex
      w="368px"
      boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
      borderRadius="xl"
      h="43vh"
      mx="4"
    >
      {/* <Heading> {props.coin.tokenInfo.name || "Coin"} </Heading> */}
    </Flex>
  );
};

import { Flex, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export const CoinInfo = (props: { infoDisplayed: any; isWeb3: boolean }) => {
  const [name, setName] = useState<string>("/");
  const [ticker, setTicker] = useState<string>("/");
  const [price, setPrice] = useState<Number>(0);
  const [supply, setSupply] = useState<Number>(0);
  const [diff1, setDiff1] = useState<Number>(0);
  const [diff7, setDiff7] = useState<Number>(0);
  const [diff30, setDiff30] = useState<Number>(0);

  const [volume, setVolume] = useState<Number>(0);

  useEffect(() => {
    // console.log("INFO TO BE DISPLAYED:", props.infoDisplayed.price);

    if (props.infoDisplayed.price) {
      setName(props.infoDisplayed.name);
      setTicker(props.infoDisplayed.symbol);
      setPrice(props.infoDisplayed.price.rate);
      setSupply(props.infoDisplayed.price.availableSupply);
      setVolume(props.infoDisplayed.price.volume24h);
      setDiff1(props.infoDisplayed.price.diff);
      setDiff7(props.infoDisplayed.price.diff7d);
      setDiff30(props.infoDisplayed.price.diff30d);
    }
  }, [props.isWeb3, props.infoDisplayed]);
  return (
    <Flex
      boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
      borderRadius="xl"
      direction="column"
      h='50%'
      p='2'
    >
      <Heading py="4" fontSize="xl" px="4">
        {"Market data" && name + " Market Data "}
      </Heading>
      <Table colorScheme="green" variant="unstyled" size="sm" fontWeight="bold">
        <Tbody>
          <Tr>
            <Td>Ticker</Td>
            <Td>$ {ticker}</Td>
          </Tr>
          <Tr>
            <Td>Supply</Td>
            <Td>{supply.toFixed()}</Td>
          </Tr>
          <Tr>
            <Td>Price</Td>
            <Td>$ {price.toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Volume</Td>
            <Td>$ {volume.toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Change 24 Hour</Td>
            <Td color={diff1 < 0 ? "red" : "green"}>% {diff1.toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Change 7 Day</Td>
            <Td color={diff7 < 0 ? "red" : "green"}>% {diff7.toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Change 30 Day</Td>
            <Td color={diff30 < 0 ? "red" : "green"}>
              % {diff30 ? diff30.toFixed(2) : 0 || "-"}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  );
};

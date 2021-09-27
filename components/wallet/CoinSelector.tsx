import { Divider, Flex, Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";

export const CoinSelector = (props: {
  isWeb3: boolean;
  coins: Object[] | null;
  selectorFunc: (e: Event) => void;
}) => {
  return (
    <Flex
      direction="column"
      w="368px"
      align="center"
      boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
      borderRadius="xl"
      h="50%"
      mx="4"
      marginBottom="4"
    >
      <Heading fontSize="xl" py="4">
        Coins in wallet{" "}
      </Heading>
      <Divider />
      <Select
        placeholder={props.isWeb3 ? "" : "Please connect"}
        onClick={props.selectorFunc}
        p="2"
        variant="flushed"
        focusBorderColor="orange.300"
      >
        {props.coins?.map((item, index) => {
          return (
            <option key={index} value={index}>
              {item.tokenInfo.name}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
};

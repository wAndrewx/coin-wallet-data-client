import { Divider, Flex, Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";

export const CoinSelector = (props: {
  isWeb3: boolean;
  coins: Object[] | null;
  selectorFunc: (e: any) => void;
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
      borderRadius="xl"
      h="inherit"
    >
      <Heading fontSize="xl" py="4">
        Coins in wallet{" "}
      </Heading>
      <Divider />
      <Select
        onClick={props.selectorFunc}
        p="2"
        variant="flushed"
        focusBorderColor="orange.300"
        defaultValue="0"
      >
        {props.coins?.map((item: any, index) => {
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

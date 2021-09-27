import { Box, Flex } from "@chakra-ui/layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export const RankPlacement = (props: {
  rank: number | string;
  tokenTicker: string;
  visits: number | string;
}): ReactJSXElement => {
  return (
    <Flex direction="row" justify="space-evenly" p="2" my="1">
      <Box textAlign="center" w="33%">
        {props.rank}
      </Box>
      <Box textAlign="center" w="33%">
        {props.tokenTicker}
      </Box>
      <Box textAlign="center" w="33%">
        {props.visits}
      </Box>
    </Flex>
  );
};

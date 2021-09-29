import { Button } from "@chakra-ui/button";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Heading, Link, Text } from "@chakra-ui/layout";

export const ProjectInfo = () => {
  return (
    <Box
      boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
      borderRadius="xl"
      h="inherit"
      px="4"
    >
      <Heading fontSize="xl" py="4">
        Project Disclaimer
      </Heading>
      <Text>
        This project does not collect any personal information. You can check
        out the code for the front end and the backend code at the buttons
        below, with instructions on how to set up the database locally. This was
        a fun project to work with Metamask{"'"}s library and to learn SQL. The
        backend will be hosted on a AWS EC2 server and SQL database will be
        hosted on AWS{"'"}s RDS. The front end is hosted on Vercel developed
        using NextJS, with Nivo for the chart. It also used ETHPlorer{"'s"} API
        to get current holdings.
      </Text>
      <footer style={{ marginTop: "16px" }}>
        <Button variant="outline" colorScheme="whatsapp" mr="2">
          Front end
        </Button>
        <Button variant="outline" colorScheme="whatsapp" ml="2">
          Back end
        </Button>
      </footer>
    </Box>
  );
};

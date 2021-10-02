import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import projectIcon from "../public/project.png";
import React from "react";

import Image from "next/image";

const Navigation = (props: { rightFunc?: ReactJSXElement }) => {
  return (
    <Flex
      color="black"
      justifyContent="space-between"
      px="8"
      py="4"
    >
      <Flex align="center">
        <Image
          src={projectIcon}
          layout="fixed"
          alt="Icon"
          width="32px"
          height="32px"
        ></Image>
        <Text pl='2' fontSize="xl" fontWeight="bold">
          Coin Balance
        </Text>
      </Flex>
      {props.rightFunc}
    </Flex>
  );
};

export default Navigation;

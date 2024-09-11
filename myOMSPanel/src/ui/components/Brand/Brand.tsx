import {
  Flex,
  Icon,
  useBreakpointValue,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GrDocumentStore } from "react-icons/gr";

export default function Brand() {
  return (
    <Flex gap={1}>
    <Icon
      h="20px"
      w="20px"
      color={useColorModeValue("gray.800", "white")}
      as={GrDocumentStore}
      me={0.5}
    />
    <Text
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      fontWeight={'bold'}
      color={useColorModeValue("gray.800", "white")}
      flexGrow={1}
    >
      MYOMS <Text as="sub"  color={"red"}>v1.0.0</Text>
    </Text>
  </Flex>
  
  );
}

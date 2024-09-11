import { Flex, Icon, Heading, Text } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";

export function NoPageFound() {
  return (
    <Flex align="center" justify="center" h="100vh">
      <Flex direction="column" align="center" textAlign="center">
        <Icon as={MdErrorOutline} boxSize={12} color="red.500" />
        <Heading size="xl" mt={4} color="red.500">
          Page Not Found
        </Heading>
        <Text mt={2} color="gray.600">
          The page you are looking for does not exist.
        </Text>
      </Flex>
    </Flex>
  );
}

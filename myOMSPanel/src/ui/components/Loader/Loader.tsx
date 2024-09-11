// Loader.js
import React from "react";
import {
  Spinner,
  Box,
  Center,
  VStack,
  Text,
  Image,
  keyframes,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
const spinWithColorChange = keyframes`
  0% {
    transform: rotate(0deg);
    border-color: red;
  }
  25% {
    border-color: red;
  }
  50% {
    transform: rotate(180deg);
    border-color: blue;
  }
  75% {
    border-color: blue;
  }
  100% {
    transform: rotate(360deg);
    border-color: green;
  }
`;

const animateShadow = keyframes`
  0% {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
  50% {
    box-shadow: rgba(60, 64, 67, 0.5) 0px 4px 8px 0px, rgba(60, 64, 67, 0.3) 0px 4px 8px 1px;
  }
  100% {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
`;
const Loader = ({
  size = "xl",
  thickness = "4px",
  speed = "0.65s",
  color = "blue.500",
  // loaderText = "Loading Please Wait..",
  ...props
}) => {
  let bgColor = useColorModeValue("white", "navy.800");
  let textColor = useColorModeValue("white", "navy.800");

  const {active,loaderText} = useSelector((state:RootState) => state.loader);
  

  if (!active) return null;
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="9999"
      bg="rgba(0, 0, 0, 0.8)"
    >
      <Center height="100vh">
        <Box
          // bg="rgba(0, 0, 0, 0.75)"
          bg={bgColor}
          p={8}
          borderRadius="xl"
          textAlign="center"
          // boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
          animation={`${animateShadow} 2s ease-in-out infinite`}
        >
          <VStack spacing={4}>
            <Image
              width="100px"
              height="100px"
              boxSize="200px"
              src={"../assets/gif/loader.gif"}
              alt={"logoAlt"}
              objectFit="contain" 
  
            />
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              // border="8px solid"
              // borderColor="red" // Initial color
              // borderRadius="50%"
              // animation={`${spinWithColorChange} 2s linear infinite`}
            />
            <Text fontSize="xl"  fontWeight={"bold"}>
              {loaderText}
            </Text>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
};

export default Loader;

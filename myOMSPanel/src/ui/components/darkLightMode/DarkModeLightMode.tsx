// Chakra Imports
import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
// Custom Icons
import { IoMdMoon, IoMdSunny } from "react-icons/io";

export default function DarkModeLightMode(props: any) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      {...rest}
      aria-label={""}
      onClick={toggleColorMode}
      icon={
        <Icon
        boxSize={6}
          // size="10px" // backgroundColor="gray.100" // Set your desired background color
          // _hover={{ bg: "gray.200" }} // Set your desired hover background color
          // borderRadius="md"
          // margin="5px"
          // p="px" // Padding inside the button
          
          as={colorMode === "light" ? BsSun:  BsMoonStarsFill }
        />
      }
    />
  );
}

import {
  Box,
  HStack,
  useColorModeValue,
  VStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import { Link, Route, Routes } from "react-router-dom";
// import DashBoard from "../../../../views/dashboard/DashBoard";
import * as dynamicFunctions from "../../../../script/myAppsScript";
// import { IconType } from 'react-icons';
// import * as Icons from 'react-icons/fi';

import DynamicIcon from "../../../../utils/app/renderDynamicIcons";

interface actions {
  onClick?: any;
  onHover?: any;
}
interface Menu {
  key: string;
  label: string;
  icon: any;
  path: string;
  actions?: actions;
  component: any;
}

interface MenuLinkInterFace {
  menuConfig: Menu;
  showFullSideBarMenu: boolean;
}

export default function MenuLink(props: MenuLinkInterFace) {
  const { menuConfig, showFullSideBarMenu } = props;
  const { colorMode } = useColorMode();
  // let maxWidth = showFullSideBarMenu ? "200px" : "50px";
  // let fontSize = showFullSideBarMenu ? "0.8rem" : "0.5rem";
  // let textColor = useColorModeValue("secondaryGray.700", "white");
  // let hoverBg = useColorModeValue("brandTabs.100", "gray.700");
  // function mode(arg0: string, arg1: string) {
  //   throw new Error("Function not implemented.");
  // }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (menuConfig?.actions?.onClick && menuConfig?.actions?.onClick !== "") {
        if (typeof menuConfig.actions["onClick"] == "function") {
          menuConfig.actions["onClick"]();
        } else {
          const actionName = menuConfig.actions["onClick"];
          if (actionName in dynamicFunctions) {
            // Call the dynamic function
            (dynamicFunctions as any)[actionName](e, menuConfig); // Cast to any to access the function
          } else {
            console.log(
              `%c===CHECK YOUR METHOD ${menuConfig.actions["onClick"]}() NOT FOUND IN 'script/myAppsScript'===`,
              "color:red"
            );
          }
        }
      }
    } catch (error) {
      console.log("%c===ERROR===",error);
      
    }
  };

  const commonProps = {
    align: "center",
    cursor: "pointer",
    w: "full",
    p: 2,
    borderRadius: "md",
    _hover: {
      bg: mode("secondaryGray.400", "whiteAlpha.200")({ colorMode }),
    },
  };

  const content = showFullSideBarMenu ? (
    <HStack {...commonProps}>
      <Box as={DynamicIcon(menuConfig.icon)} size="24px" />
      <Text fontSize="0.8rem" fontWeight="600" isTruncated w="full">
        {menuConfig.label}
      </Text>
    </HStack>
  ) : (
    <VStack {...commonProps}>
      <Box as={DynamicIcon(menuConfig.icon)} size="24px" />
      <Text fontSize="0.5rem" fontWeight="600" textAlign="center">
        {menuConfig.label}
      </Text>
    </VStack>
  );

  return menuConfig.path ? (
    <Link to={menuConfig.path} style={{ width: "100%" }}>
      {content}
    </Link>
  ) : (
    <div style={{ width: "100%" }} onClick={handleClick}>
      {content}
    </div>
  );

  // return (
  //   <Link to={menuConfig.path} style={{ width: "100%" }} >
  //     {showFullSideBarMenu ? (
  //       <HStack
  //         align="center"
  //         cursor={"pointer"}
  //         w="full"
  //         p={2}
  //         borderRadius="md"
  //         _hover={{
  //           bg: mode("secondaryGray.400", "whiteAlpha.200")({ colorMode }),
  //         }}
  //       >
  //         <Box as={DynamicIcon(menuConfig.icon)} size="24px" />
  //         <Text fontSize="0.8rem" fontWeight={"600"} isTruncated w="full">
  //           {menuConfig.label}
  //         </Text>
  //       </HStack>
  //     ) : (
  //       <VStack
  //         align="center"
  //         cursor={"pointer"}
  //         w="full"
  //         p={2}
  //         borderRadius="md"
  //         _hover={{
  //           bg: mode("secondaryGray.400", "whiteAlpha.200")({ colorMode }),
  //         }}
  //       >
  //         <Box as={DynamicIcon(menuConfig.icon)} size="24px" />
  //         <Text
  //           fontSize="0.5rem"
  //           fontWeight={"600"}
  //           textAlign="center"
  //           whiteSpace="normal"
  //         >
  //           {menuConfig.label}
  //         </Text>
  //       </VStack>
  //     )}
  //   </Link>
  // );
}

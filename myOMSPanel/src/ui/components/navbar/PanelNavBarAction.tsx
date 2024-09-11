import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { MdNotificationsNone } from "react-icons/md";
import DarkModeLightMode from "../darkLightMode/DarkModeLightMode";
import { useAuth } from "../../../auth/AuthProvider";
import { useSelector } from "react-redux";
import React from "react";
import MenuLink from "../sidebar/components/MenuLink";

export default function PanelNavBarAction() {
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const { colorMode } = useColorMode();
  const auth = useSelector((state: any) => state.auth);
  // console.log("auth", auth);

  const { logoutUser } = useAuth();
  const actionList = [
    {
      label: "User Account",
      icon: "FiUser",
      // path: "/user/account",
    },
    {
      label: "Logout",
      icon: "FiLogOut",
      actions: {
        onClick: logoutUser,
      }
    },
  ];

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems={"center"}
      justifyContent={"end"}
      flexDirection="row"
    >
      <Menu>
        <DarkModeLightMode
          // marginEnd="7px"
          // boxShadow={shadow}
          cursor="pointer"
          color={navbarIcon}
          // borderRadius="8px"
        />
      </Menu>
      <Menu>
        <IconButton
          as={MenuButton}
          // marginEnd="7px"
          aria-label={""}
          icon={
            <Icon
              boxSize={6}
              // size="10px" // backgroundColor="gray.100" // Set your desired background color
              // _hover={{ bg: "gray.200" }} // Set your desired hover background color
              // borderRadius="md"
              // margin="5px"
              // p="px" // Padding inside the button

              as={MdNotificationsNone}
            />
          }
        />
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Flex justify="space-between" w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={textColorBrand}
              ms="auto"
              cursor="pointer"
            >
              Mark all read
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              {/* <ItemContent info="Horizon UI Dashboard PRO" aName="Alicia" /> */}
            </MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              {/* <ItemContent
                info="Horizon Design System Free"
                aName="Josh Henry"
              /> */}
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>
          <Avatar
            boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
            _hover={{ cursor: "pointer" }}
            color="white"
            name={auth.loginInfo ? auth.loginInfo.userFullName : "GUEST"}
            bg="#90cdf4"
            borderRadius="4px"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          borderRadius="20px"
          boxShadow={shadow}
          mt="22px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey,{" "}
              {auth.loginInfo
                ? auth.loginInfo.userFullName.slice(0, 5)
                : "GUEST"}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px" gap="5px">
            {actionList.map((child: any, index: number) => (
              // <DesktopSubNav key={child} subMenu={child} />
              <React.Fragment key={index}>
                <MenuLink menuConfig={child} showFullSideBarMenu={true} />
              </React.Fragment>
              // <MenuLink</MenuLink>
            ))}
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

import {
  useColorModeValue,
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerContent,
  Icon,
  useDisclosure,
  Divider,
  IconButton,
  VStack,
} from "@chakra-ui/react";

import SideNavMenuBuilder from "./SideNavMenuBuilder";
import { MdMenu } from "react-icons/md";
import Brand from "../Brand/Brand";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { APP_CONFIG_STATE } from "../../../types/appConfigInterface";

export default function PanelSideBar(props: any) {
  const { showSidebar, togglesidebar, SHOW_SIDEBAR, ...rest } = props;
  // if(!SHOW_SIDEBAR)return null
  console.log("showSidebar", showSidebar);

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
    "unset"
  );
  // 45px 76px 113px 7px rgba(112, 144, 176, 0.08)
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidenav = () => {
    setIsExpanded(!isExpanded);
  };
  let sidebarMargins = "0px";
  const {DISPLAY_TYPE,FEATURE}: APP_CONFIG_STATE = useSelector(
    (state: RootState) => state.app.AppConfigState
  );
 

  if(!DISPLAY_TYPE?.SHOW_SIDE_NAV_MENU || FEATURE.length==0)return null
  return (
    <Box
      display={{ base: "none", sm: "none", xl: "block" }}
      //   w="100%"
      //   position="fixed"
      minH="100%"
      p={"0px"}
      boxShadow={shadow}
    >
      <Box
        {...rest}
        bg={sidebarBg}
        transition={variantChange}
        p={"0px"}
        // w="100%"
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
      >
        <Flex
          direction="column"
          height="100%"
          pt="25px"
          px="16px"
          borderRadius="30px"
        >
          <SideNavMenuBuilder showFullSideBarMenu={showSidebar} />
        </Flex>
        {/* <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}>
          <Content routes={routes} />
        </Scrollbars> */}
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive(props: any) {
  const { DISPLAY_TYPE,FEATURE, ...rest } = props;
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {DISPLAY_TYPE,FEATURE}: APP_CONFIG_STATE = useSelector(
  //   (state: RootState) => state.app.AppConfigState
  // );
  // if(FEATURE.length==0)return null
  return (
    <Flex
      display={{ base: "flex", md: "flex", xl: "none" }}
      alignItems="center"
      justifyContent={"center"}
    >
      <Flex w="max-content" h="max-content" onClick={onOpen}>
        <IconButton
          aria-label="Menu"
          icon={<Icon as={MdMenu} h="20px" w="20px" />}
          cursor="pointer"
        />
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} placement={"left"}>
        {/* <DrawerOverlay /> */}
        <DrawerContent maxW="200px" bg={sidebarBackgroundColor}>
          {/* <DrawerCloseButton
            zIndex='3'
            // onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          /> */}
          <Flex alignItems={"center"} justifyContent={"start"} gap={2} p={3}>
            <Box paddingStart={3}>
              <IconButton
                // mb={2}
                aria-label="Menu"
                icon={<Icon as={MdMenu} h="20px" w="20px" />}
                // variant="ghost"
                cursor="pointer"
                onClick={onClose}
              />
            </Box>
            <Box>
              <Brand />
            </Box>
          </Flex>
          <Divider />
          <DrawerBody maxW="200px" px="0rem" pb="0">
            <Flex
              direction="column"
              height="100%"
              pt="25px"
              px="16px"
              borderRadius="30px"
              p={{ pt: "0", px: "16px" }}
              // w={"200px"}
            >
              <VStack spacing={4} align="stretch">
                <SideNavMenuBuilder showFullSideBarMenu={true} />
              </VStack>
              {/* <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Content routes={routes} />
            </Scrollbars> */}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

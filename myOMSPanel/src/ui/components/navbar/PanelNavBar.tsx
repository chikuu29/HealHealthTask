import {
  Box,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import PanelNavBarAction from "./PanelNavBarAction";
import { MdMenu } from "react-icons/md";
import { SidebarResponsive } from "../sidebar/PanelSideBar";
import Brand from "../Brand/Brand";
import TopNavMenuBuilder from "./TopNavMenuBuilder";

export default function PanelNavBar(props: any) {
  // const [scrolled, setScrolled] = useState(false);
  const {
    togglesidebar,
    requiredSideBar = true,
    DISPLAY_TYPE,
    FEATURE,
  } = props;
  // useEffect(() => {
  //   window.addEventListener("scroll", changeNavbar);
  //   return () => {
  //     window.removeEventListener("scroll", changeNavbar);
  //   };
  // });

  // const { secondary, message, brandText } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)

  // let navbarPosition = "fixed";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow =
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;";

  // let navbarBg = useColorModeValue(
  //   "rgba(244, 247, 254, 0.2)",
  //   "rgba(11,20,55,0.5)"
  // );

  let navbarBg = useColorModeValue("white", "navy.800");
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  // return (<></>);
  return (
    <Box
      bg={navbarBg}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backgroundPosition="center"
      backgroundSize="cover"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={"flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      mx="auto"
      // pt="8px"
      // top={{ base: "12px", md: "16px", lg: "20px", xl: "20px" }}
      w="100%"
    >
      <Flex
        // position="fixed"
        minH="75px"
        bg={navbarBg}
        zIndex={999}
        position={"fixed"}
        ps={5}
        pe={7}
        w="100%"
        flexDirection={{
          sm: "row",
          md: "row",
        }}
        alignItems={"center"}
        justify={"space-between"}
        // mb={gap}
      >
        <Flex alignItems={"center"} gap={2}>
          <Box>
            {DISPLAY_TYPE.SHOW_SIDE_NAV_MENU && (
              <IconButton
                aria-label="Menu"
                icon={<Icon as={MdMenu} h="20px" w="20px" />}
                display={{ base: "none", sm: "none", xl: "block" }}
                cursor="pointer"
                onClick={togglesidebar}
              />
            )}
            {FEATURE.length > 0 && <SidebarResponsive   FEATURE_LIST={FEATURE}/>}
          </Box>
          <Box>
            <Brand />
          </Box>
        </Flex>
        <TopNavMenuBuilder
          FEATURE_LIST={FEATURE}
          SHOW_TOP_NAV_MENU={DISPLAY_TYPE.SHOW_TOP_NAV_MENU}
        />
        <PanelNavBarAction />
      </Flex>
    </Box>
  );
}

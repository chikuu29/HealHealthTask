import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Footer from "../../components/footer/FooterAuth";
import { NavLink, Outlet } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import FixedPlugin from "../../components/fixedPlugin/FixedPlugin";

export default function Auth(props: any) {
  console.log("===== THIS IS AUTH VIEW =======");

  // console.log(props);
  const {  illustrationBackground } = props;
  return (
    <Flex position="relative" h="max-content">
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w="100%"
        maxW={{ md: "66%", lg: "1313px" }}
        mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent="start"
        direction="column"
      >
        {/* <NavLink
          to="/"
          style={() => ({
            width: "fit-content",
            marginTop: "40px",
          })}
        >
          <Flex
            align="center"
            ps={{ base: "25px", lg: "0px" }}
            pt={{ lg: "0px", xl: "0px" }}
            w="fit-content"
          >
            <Icon
              as={FaChevronLeft}
              me="12px"
              h="13px"
              w="8px"
              color="secondaryGray.600"
            />
            <Text ms="0px" fontSize="sm" color="secondaryGray.600">
              Back to Home
            </Text>
          </Flex>
        </NavLink> */}

        <Outlet />

        <Box
          display={{ base: "none", md: "none" }}
          h="100%"
          minH="100vh"
          w={{ lg: "50vw", "2xl": "44vw" }}
          position="absolute"
          right="0px"
        >
          <Flex
            bg={`url(${illustrationBackground})`}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}
          ></Flex>
        </Box>
        {/* <Footer /> */}
      </Flex>
      <FixedPlugin />
    </Flex>
  );
}

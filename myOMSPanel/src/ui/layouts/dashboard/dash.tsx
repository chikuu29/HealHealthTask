import { Flex, VStack } from "@chakra-ui/react";
import Navbar from "../../components/navbar/PanelNavBar";
import PanelSideBar from "../../components/sidebar/PanelSideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_CONFIG_STATE } from "../../../types/appConfigInterface";
import { RootState } from "../../../app/store";
function dash() {
  console.log("%c====EXECUTE DASHBOARD LAYOUT=====","color:green");
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const {DISPLAY_TYPE,FEATURE}: APP_CONFIG_STATE = useSelector(
    (state: RootState) => state.app.AppConfigState
  );

  return (
    <Flex h="100vh" flexDirection="column">
      <Navbar showSidebar={showSidebar} togglesidebar={toggleSidebar} FEATURE={FEATURE} DISPLAY_TYPE={DISPLAY_TYPE} />
      {/* Main Content */}
      <Flex flex="1">
        <PanelSideBar
          showSidebar={showSidebar}
          togglesidebar={toggleSidebar}
        />
        {/* Main Content */}
        <VStack flex="1" spacing={4} align="stretch">
          <Outlet></Outlet>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default dash;

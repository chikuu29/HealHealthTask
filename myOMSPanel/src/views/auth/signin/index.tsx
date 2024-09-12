// Chakra imports
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { HSeparator } from "../../../ui/components/separator/Separator";
import { publicAPI } from "../../../app/handlers/axiosHandlers";
// import { AxiosError } from "axios";
import { useAuth } from "../../../auth/AuthProvider";
import { useDispatch } from "react-redux";
import { login } from "../../../app/slices/auth/authSlice";
import { GETAPI } from "../../../app/api";
import { fetchAppConfig } from "../../../app/slices/appConfig/appConfigSlice";
import { AppDispatch } from "../../../app/store";
// import { setAppConfig } from "../../../app/slices/appConfig/appConfigSlice";
interface AlertProps {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error";
  isVisible: boolean;
  onClose?: () => void;
}

export default function signin() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertProps>({
    title: "",
    description: "",
    status: "info",
    isVisible: false,
  });
  const navigate = useNavigate();

  const location = useLocation();
  // console.log("location", location);
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl: any = searchParams.get("redirect");
  // console.log("redirectUrl", redirectUrl);
  const [userCredentials, setUseCredentials] = useState({
    loginId: "",
    password: "",
  });

  const { loading, authInfo, setLoginAuthInfo } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUseCredentials({
      ...userCredentials,
      [name]: value,
    });
  };
  const dispatch = useDispatch<AppDispatch>();
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("userCredentials", userCredentials);
    setLoading(true);
    try {
      const response = await publicAPI.post("/auth/login", userCredentials);
      console.log(response);
      if (response.status === 200) {

        // GETAPI({
        //   path: "app/app-configuration",
        //   enableCache: true,
        // }).subscribe((res: any) => {
        //   if (res.success) {
        //     dispatch(setAppConfig(res["result"][0]));
        //   }
        // });
        setLoading(false);
        const responseInfo: any = response["data"];
        console.log("AuthInfo", responseInfo);
        setLoginAuthInfo(responseInfo);
        dispatch(fetchAppConfig());
        dispatch(login(responseInfo))
        setShowAlert({
          title: response?.statusText,
          description: responseInfo["message"],
          status: "success",
          isVisible: true,
        });
        // console.log("redirectUrl",redirectUrl);
        navigate(redirectUrl || "/myApps");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      if (error.message === "Network Error") {
        setShowAlert({
          title: error?.message,
          description: "Please Check Your Internet Connections",
          status: "error",
          isVisible: true,
        });
      } else {
        setShowAlert({
          title: error?.statusText,
          description: error?.response["data"]["message"],
          status: "error",
          isVisible: true,
        });
      }
    }
  };
  useEffect(() => {
    if (!loading && authInfo && authInfo.success) {
      // Uncomment if you have logic to set a redirect URL
      // setRedirectUrl(location.pathname);
      navigate(redirectUrl || "/myApps", { replace: true });
    }
  }, [loading]);
  return (
    <Flex
      maxW={{ base: "100%", md: "max-content" }}
      w="100%"
      mx={{ base: "auto", lg: "auto" }}
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{ base: "30px", md: "60px" }}
      px={{ base: "25px", md: "0px" }}
      mt={{ base: "40px", md: "14vh" }}
      flexDirection="column"
    >
      <Box me="auto">
        <Heading color={textColor} fontSize="36px" mb="10px">
          Sign in
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Enter your email and password to sign in!
        </Text>
      </Box>
      <Flex
        zIndex="2"
        direction="column"
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: "auto", lg: "unset" }}
        me="auto"
        mb={{ base: "20px", md: "auto" }}
      >
        {/* <Button
          fontSize="sm"
          me="0px"
          mb="26px"
          py="15px"
          h="50px"
          borderRadius="16px"
          bg={googleBg}
          color={googleText}
          fontWeight="500"
          _hover={googleHover}
          _active={googleActive}
          _focus={googleActive}
        >
          <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
          Sign in with Google
        </Button> */}
        {/* <Flex align="center" mb="25px">
          <HSeparator />
          <Text color="gray.400" mx="14px">
            or
          </Text>
          <HSeparator />
        </Flex> */}
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              required={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="loginId"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <InputRightElement
                display="flex"
                alignItems="center"
                mt="4px"
                onClick={handleClick}
              >
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                />
              </InputRightElement>
            </InputGroup>
            {/* <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  Forgot password?
                </Text>
              </NavLink>
            </Flex> */}
            {showAlert.isVisible && (
              <Alert
                status={showAlert.status}
                marginBottom={"8px"}
                borderRadius={"8px"}
              >
                <AlertIcon />
                {showAlert.description}
              </Alert>
            )}

            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
              loadingText="Authentication Process Started.."
              isLoading={isLoading}
            >
              Login
            </Button>
          </FormControl>
        </form>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          maxW="100%"
          mt="0px"
        >
          <Text color={textColorDetails} fontWeight="400" fontSize="14px">
            Not registered yet?
            <NavLink to="/auth/sign-up">
              <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                Create an Account
              </Text>
            </NavLink>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

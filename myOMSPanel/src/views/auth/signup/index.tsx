// Chakra imports
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  // Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// import { NavLink } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";
// import AuthService from "../../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { POSTAPI } from "../../../app/api";
// import { HSeparator } from "../../../components/separator/Separator";

export default function signup() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  // const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  // const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  // const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  // const googleText = useColorModeValue("navy.700", "white");
  // const googleHover = useColorModeValue(
  //   { bg: "gray.200" },
  //   { bg: "whiteAlpha.300" }
  // );
  // const googleActive = useColorModeValue(
  //   { bg: "secondaryGray.300" },
  //   { bg: "whiteAlpha.200" }
  // );
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isLoading, startLoading] = useState(false);
  const [showAlert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    startLoading(true);

    // Do something with formData, like submit it to a server
    try {

      POSTAPI({
        path:'auth/register',
        data:formData,
        isPrivateApi:false
      }).subscribe((res:any)=>{
        console.log(res);
        
        if(res.success){
          setAlert({
                type: "success",
                show: true,
                message: res.message,
              });
              startLoading(false);
              setTimeout(() => {
                navigate("/auth/sign-in");
              }, 2000);
        }else{
          startLoading(false);
            setAlert({
              type: "error",
              show: true,
              message: res.errorInfo.response.data.message,
            });
        }
      })
      // const data = await AuthService.register(formData);
      // if (data.success) {
      //   setAlert({
      //     type: "success",
      //     show: true,
      //     message: data.message,
      //   });
      //   startLoading(false);
      //   setTimeout(() => {
      //     navigate("/auth/sign-in");
      //   }, 2000);
      // } else {
      //   startLoading(false);
      //   setAlert({
      //     type: "error",
      //     show: true,
      //     message: data.message,
      //   });
      // }
      // Redirect to dashboard or perform any other actions upon successful login
    } catch (error) {
      startLoading(false);
      console.log(error);

      // Handle login error (e.g., display error message to user)
      setAlert({
        type: "error",
        show: true,
        message: "Somethings Went Wrong!",
      });
    }
  };

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
      // mt={{ base: "40px", md: "14vh" }}
      flexDirection="column"
    >
      <Box me="auto">
        <Heading color={textColor} fontSize="36px" mb="10px">
          Register
        </Heading>
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
        {showAlert.show && showAlert.type == "error" && (
          <Alert status="error" marginBottom={2}>
            <AlertIcon />
            {showAlert.message}
          </Alert>
        )}
        {showAlert.show && showAlert.type == "success" && (
          <Alert status="success" marginBottom={2}>
            <AlertIcon />
            {showAlert.message}
          </Alert>
        )}

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
              First Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="First Name"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="fname"
              onChange={handleInputChange}
            />
             <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Last Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Last Name"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="lname"
              onChange={handleInputChange}
            />
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
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="email"
              onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {/* <Select
              isRequired={true}
              fontSize="sm"
              placeholder="Select Role"
              variant="auth"
              mb="24px"
              size="lg"
              name="role"
              onChange={handleInputChange}
            >
              <option value="USER">USER</option>
              <option value="HR">HR</option>
            </Select> */}
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
              isLoading={isLoading}
            >
              Register
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
          {/* <Text color={textColorDetails} fontWeight="400" fontSize="14px">
            Not registered yet?
            <NavLink to="/auth/sign-up">
              <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                Create an Account
              </Text>
            </NavLink>
          </Text> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

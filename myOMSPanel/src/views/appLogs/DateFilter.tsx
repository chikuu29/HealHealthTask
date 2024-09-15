import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO } from "date-fns";
import axios from "axios";
// import API_ENDPOINTS from './config/apiConfig'; // Adjust the path as needed
import EndpointSelector from "./EndPointSelector"; // Adjust the path as needed
import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  VStack,
  Grid,
  GridItem,
  Center,
  useColorModeValue,
  Flex,
  HStack,
  Icon,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";
// Add other endpoints as needed
import { TbReportSearch } from "react-icons/tb";
import DynamicIcon from "../../utils/app/renderDynamicIcons";
import { FaFileAlt } from "react-icons/fa";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import { GETAPI } from "../../app/api";
interface AlertProps {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error";
  isVisible: boolean;
  onClose?: () => void;
}
interface Log {
  // Define the structure of your log object here
  [key: string]: any;
}

const statusColors = {
  success: "green.100",
  error: "red.100",
  default: "white",
};
const DateFilter: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [apiText, setApiText] = useState<String>("");
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [selectedEndpoint, setSelectedEndpoint] = useState<string>(
  //   API_ENDPOINTS.LOGS
  // ); // Default endpoint

  const handleFetchLogs = async () => {
    if (startDate === undefined || endDate === undefined || apiText == "") {
      setShowAlert({
        title: "Please Enter All Date",
        description:
          "Please Enter All Date It May :API PATH ,START DATE or END DATE",
        status: "warning",
        isVisible: true,
      });
      return;
    }

    setLoading(true);

    GETAPI({
      path: `api/logs/?start_date=${startDate
        .toISOString()
        .slice(0, 10)}&end_date=${endDate
        .toISOString()
        .slice(0, 10)}&path=${apiText}`,
      isPrivateApi: true,
    }).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        setShowAlert({
          title: "",
          description: "SUCCESS",
          status: "success",
          isVisible: true,
        });
        setLogs(res["logs"]);
      } else {
        setShowAlert({
          title: "",
          description: res["errorInfo"]["response"]["data"]["error"],
          status: "error",
          isVisible: true,
        });
      }
    });

    try {
      // const response = await axios.get(selectedEndpoint, {
      //   params: {
      //     startDate: formatISO(startDate),
      //     endDate: formatISO(endDate),
      //   },
      // });
      // setLogs(response.data.logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };
  const [showAlert, setShowAlert] = useState<AlertProps>({
    title: "",
    description: "",
    status: "info",
    isVisible: false,
  });
  let bg = useColorModeValue("white", "navy.800");
  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Center>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Filter Logs by Date
          </Text>
          <Box as={DynamicIcon("TbReportSearch")} size="25px" />
        </Center>
        <Box bg={bg} p={4} borderRadius={12}>
          <FormControl>
            <FormLabel htmlFor="api-endpoint">Enter API End Point</FormLabel>
            <Input
              // variant="auth"
              id="api-endpoint"
              required
              name="endpoint"
              variant="auth"
              placeholder="Enter API End Point Ex :/marketplace/products"
              onChange={(e) => {
                setApiText(e.target.value);
              }}
            />
          </FormControl>
          <Flex>
            <Box padding="8px">
              <DatePicker
                selected={startDate || undefined}
                onChange={(date: Date | null) =>
                  setStartDate(date ?? undefined)
                }
                selectsStart
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                dateFormat="yyyy/MM/dd"
                placeholderText="Start Date"
                className="date-picker-wrapper"
              />
            </Box>
            <Box padding="8px">
              <DatePicker
                selected={endDate || undefined}
                onChange={(date: Date | null) => setEndDate(date ?? undefined)}
                selectsEnd
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                minDate={startDate || undefined}
                dateFormat="yyyy/MM/dd"
                placeholderText="End Date"
                className="date-picker-wrapper"
              />
            </Box>
          </Flex>

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
            loadingText="Searching For Logs Please Wait..."
            onClick={handleFetchLogs}
            isLoading={loading}
          >
            Fetch Logs
          </Button>

          <Box
            mt={4}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg={bg}
            boxShadow="md"
          >
            <Text as="h2" fontSize="2xl" fontWeight="bold" mb={4}>
              Logs
            </Text>

            {logs.length === 0 ? (
              <HStack spacing={2}>
                <Icon as={MdErrorOutline} color="red.500" boxSize={6} />
                <Text fontSize="lg">
                  No logs found for the selected date range.
                </Text>
              </HStack>
            ) : (
              <List spacing={3}>
                {logs.map((log, index) => (
                  <ListItem
                    key={index}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="white"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md", bg: "gray.100" }}
                  >
                    <HStack spacing={4} overflowX={'scroll'} width="100%">
                      <Icon as={FaFileAlt} color="blue.500" boxSize={6} />
                      <Box flex="1">
                        <Text
                        verticalAlign={'center'}
                          borderRadius={8}
                          padding={2}
                          fontSize="md"
                          fontWeight="medium"
                          color={
                            log.log.response.status_code === 200
                              ? "white"
                              : "red.100"
                          }
                          bg={
                            log.log.response.status_code === 200
                              ? "green.600"
                              : "red.100"
                          }
                        >
                           <Icon
                            as={MdCheckCircleOutline}
                            color="green.500"
                            boxSize={5}
                            // ml="auto"
                          /> End Point:{" "}
                          <Text as="span" fontWeight="bold">
                            {log.log.path}
                          </Text>
                        
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Timestamp:{" "}
                          <Text as="span" fontWeight="bold">
                            {log.time}
                          </Text>
                        </Text>
                        <Box mt={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="teal.600"
                          >
                            Request:
                          </Text>
                          <Box
                            mt={1}
                            maxHeight="200px" // Adjust as needed
                            overflowY="auto"
                            borderWidth="1px"
                            borderRadius="md"
                            borderColor="gray.200"
                            p={2}
                          >
                            <Text
                              fontSize="sm"
                              color="gray.800"
                              whiteSpace="pre-wrap"
                            >
                              {JSON.stringify(log.log.request, null, 2)}
                            </Text>
                          </Box>
                        </Box>
                        <Box mt={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="teal.600"
                          >
                            Response:
                          </Text>
                          <Box
                            mt={1}

                            maxHeight="200px" // Adjust as needed
                            overflowY="auto"
                            borderWidth="1px"
                            borderRadius="md"
                            borderColor="gray.200"
                            p={2}
                          >
                            <Text
                              fontSize="sm"
                              color="gray.800"
                              // whiteSpace="pre-wrap"
                              whiteSpace="wrap"
                              
                            >
                              {JSON.stringify(log.log.response.body, null, 2)}
                            </Text>
                          </Box>
                        </Box>
                        <Box mt={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="purple.600"
                          >
                            Created by:
                          </Text>
                          <Text fontSize="sm" color="gray.800">
                            {JSON.stringify(log.logCreatedBy)}
                          </Text>
                        </Box>
                      </Box>
                    </HStack>
                    {/* <HStack spacing={4}>
                      <Icon as={FaFileAlt} color="blue.500" boxSize={6} />
                      <Box flex="1">
                        <Text
                          fontSize="md"
                          fontWeight="medium"
                          color="blue.600"
                        >
                          API Path:{" "}
                          <Text as="span" fontWeight="bold">
                            {log.log.path}
                          </Text>
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Timestamp:{" "}
                          <Text as="span" fontWeight="bold">
                            {log.time}
                          </Text>
                        </Text>
                        <Box mt={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="teal.600"
                          >
                            Request:
                          </Text>
                          <Text
                            fontSize="sm"
                            color="gray.800"
                            whiteSpace="pre-wrap"
                          >
                            {JSON.stringify(log.log.request, null, 2)}
                          </Text>
                        </Box>
                        <Box mt={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="teal.600"
                          >
                            Response:
                          </Text>
                          <Text
                            fontSize="sm"
                            color="gray.800"
                            whiteSpace="pre-wrap"
                          >
                            {JSON.stringify(log.log.response, null, 2)}
                          </Text>
                        </Box>
                        <Box mt={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="purple.600"
                          >
                            Created by:
                          </Text>
                          <Text fontSize="sm" color="gray.800">
                            {JSON.stringify(log.logCreatedBy)}
                          </Text>
                        </Box>
                      </Box>
                      <Icon
                        as={MdCheckCircleOutline}
                        color="green.500"
                        boxSize={5}
                        ml="auto"
                      />
                    </HStack> */}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default DateFilter;

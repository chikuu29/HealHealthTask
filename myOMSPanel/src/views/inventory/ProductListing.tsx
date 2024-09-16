import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  Grid,
  GridItem,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import ProductView from "./ProductView";
import { ViewIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { DELETEAPI, GETAPI } from "../../app/api";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

// const products = [
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
//   {
//     sku: "SKU",
//     name: "Aero Armour Typography Printed Pure Cotton T-shirt",
//     description: "Aero Armour Typography Printed Pure Cotton T-shirt b",
//     image:
//       "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//     price: 999,
//     special_price: 699,
//     variants: [
//       {
//         sku: "SKU-RED-S",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size S",
//         price: 999,
//         special_price: 78,
//         image: [
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQcD81znSWntHLY85B9dFL9l7ZiIYn9Ia01ZHLziPhygUKNC7yPw6UHi3-7W-7mnDd6V9n5IQOiCvJ7auOG17PrpB9Jg_M69wNjySIgHfW7hetrdHU8pDcuew",
//         ],
//         attributes: { color: "Red", size: "S" },
//       },
//       {
//         sku: "SKU-RED-M",
//         name: "Aero Armour Typography Printed Pure Cotton T-shirt - Red, Size M",
//         price: 1999,
//         special_price: 999,
//         image: [
//           "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/y/h/m-asaeots5174-arrow-sports-original-imah3g3utcy95h2t.jpeg?q=70",
//         ],
//         attributes: { color: "Red", size: "M" },
//       },
//     ],
//   },
// ];

const ProductListing = () => {
  const toast = useToast();
  const [isTableView, setIsTableView] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const handleScroll = () => {
      const header: any = headerRef.current;
      if (header) {
        const offsetTop = header.getBoundingClientRect().top;
        console.log(offsetTop);

        setIsSticky(offsetTop <= 184);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchProduct = () => {
      GETAPI({
        path: "marketplace/products",
        isPrivateApi: true,
        enableCache: false,
        cacheTTL: 300,
      }).subscribe(
        (res) => {
          console.log(res);

          if (res.success) {
            setProducts(res.result); // Assuming `result` contains the product object
          } else {
            // setError('Product not found');
          }

          // setLoading(false); // Stop the loading indicator after response
        },
        (err) => {
          console.error(err);
          // setError('Error fetching product');
          // setLoading(false);
        }
      );
    };
    fetchProduct();
  }, []);

  const deleteProduct = (e: any, sku: string) => {
    e.preventDefault();
    console.log("delete SKU", sku);
    DELETEAPI({
      path: `marketplace/product/${sku}`,
    }).subscribe((res: any) => {
      console.log("res", res);

      if (res.success) {
        toast({
          title: "Product Deleted Successfull!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top", // This will position the toast at the top of the screen
        });
        setProducts(products.filter((product) => product.sku !== sku));
      } else {
        toast({
          title: "Somethings Went Wroung",
          description: res.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top", // This will position the toast at the top of the screen
        });
      }
    });
  };
  let bg = useColorModeValue("white", "navy.800");
  return (
    <Box p={4}>
      {/* KPI Box */}
      <Box
        mb={4}
        display="flex"
        gap={2}
        position="sticky"
        top="77"
        // bg={isSticky ? "white" : 'transparent'}
        bg={bg}
        zIndex="99"
        boxShadow="md"
        p={4}
        borderRadius={12}
      >
        <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w={["100%", "48%", "23%"]}
        >
          <Box display="flex" alignItems="center">
            <Box as="span" fontSize="2xl" mr={2} color="teal.500">
              🛒 {/* You can replace this with a Chakra Icon */}
            </Box>
            <Heading size="md">Total Products: {products.length}</Heading>
          </Box>
        </Box>
        {/* <Box
          p={4}
          borderWidth="1px"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w={["100%", "48%", "23%"]}
        >
          <Box display="flex" alignItems="center">
            <Box as="span" fontSize="2xl" mr={2} color="orange.500">
              📝 
            </Box>
            <Heading size="md">Drafted Products: {draftProductCount}</Heading>
          </Box>
        </Box> */}
      </Box>
      {products.length === 0 ? (
        <Box textAlign="center" py={10} px={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, teal.400, teal.600)"
            backgroundClip="text"
          >
            No Product Found
          </Heading>
          <Text fontSize="xl" mt={4} mb={6}>
            We couldn't find the product you are looking for.
          </Text>
          <Button colorScheme="teal" variant="solid" as={Link} to="/inventory">
            Make Your Product List
          </Button>
        </Box>
      ) : (
        <>
          {isTableView ? (
            <Box
              borderRadius={12}
              overflowX="auto"
              overflowY="auto"
              maxH="400px" // Adjust height for vertical scrolling
            >
              <Table
                variant="simple"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                position="relative"
              >
                <Thead position="sticky" top={0} zIndex={1} bg={bg}>
                  <Tr>
                    <Th>Image</Th>
                    <Th>SKU</Th>
                    <Th>Total Variants</Th>
                   
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Creaeted By </Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product, index) => (
                    <Tr key={index}>
                      <Td>
                        <Image
                          boxSize="50px"
                          src={product.image}
                          alt={product.name}
                        />
                      </Td>
                      <Td>{product.sku}</Td>
                      <Td>{product.variants.length}</Td>
                      <Td>{product.name}</Td>
                      <Td>${product.price}</Td>
                      <Td>{product?.ownBY}</Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          variant={"outline"}
                          size="md"
                          mr={2}
                          leftIcon={<ViewIcon />}
                          as={Link}
                          to={`product/view/${product.sku}`}
                        >
                          View
                        </Button>

                        <Button
                          colorScheme="green"
                          variant={"outline"}
                          size="md"
                          leftIcon={<EditIcon />}
                          as={Link}
                          to={`product/edit/${product.sku}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant={"outline"}
                          size="md"
                          colorScheme="red"
                          mr={2}
                          leftIcon={<MdDelete />}
                          onClick={(e) => {
                            deleteProduct(e, product.sku);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {products.map((product, index) => (
                <GridItem key={index} p={4} borderRadius="md">
                  <ProductView product={product} />
                </GridItem>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductListing;
function toast(arg0: {
  title: string;
  description: any;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}

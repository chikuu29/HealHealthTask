import {
  Flex,
  Text,
  Box,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  List,
  ListIcon,
  ListItem,
  Grid,
  GridItem,
  HStack,
  Select,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as dynamicFunctions from "../../script/myAppsScript";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import ErrorComponent from "../../ui/components/Error/ErrorComponent";
import Loader from "../../ui/components/Loader/Loader";
import { useEffect, useState } from "react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import ProductView from "./ProductView";
import { FaCartPlus, FaEye } from "react-icons/fa";
import React from "react";
import { BiSave } from "react-icons/bi";
import { GETAPI, POSTAPI } from "../../app/api";
import {
  startLoading,
  stopLoading,
} from "../../app/slices/loader/appLoaderSlice";
import { MdDelete } from "react-icons/md";

const AddProduct = () => {
  const { sku, ...rest } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchProduct = () => {
      GETAPI({
        path: "marketplace/product/" + sku,
        isPrivateApi: true,
        enableCache: false,
        cacheTTL: 300,
      }).subscribe(
        (res) => {
          console.log(res);

          if (res.success) {
            setProduct(res.result); // Assuming `result` contains the product object
            // console.log("hii",rest['*']);
            console.log(pathname);

            if (pathname.includes("view")) {
              setMode("VIEW_ONLY");
            } else if (pathname.includes("edit")) {
              setMode("EDIT");
            }
          } else {
            setMode("NEW");
            // setError('Product not found');
          }

          // setLoading(false); // Stop the loading indicator after response
        },
        (err) => {
          setMode("NEW");
          console.error(err);
          // setError('Error fetching product');
          // setLoading(false);
        }
      );
    };

    if (sku) fetchProduct();
  }, [sku,pathname]);

  const [mode, setMode] = useState<"EDIT" | "NEW" | "VIEW_ONLY">("NEW");

  // Initialize the state with the correct structure
  const [product, setProduct] = useState<Product>({
    sku: "",
    name: "",
    description: "",
    image: "",
    price: 0,
    special_price: 0,
    variants: [],
  });

  const defualtVariant: ProductVariant = {
    sku: "",
    name: "",
    price: 0,
    special_price: 0,
    image: [],
    attributes: {
      color: "",
      size: "",
    },
  };

  const dispatch = useDispatch<AppDispatch>();

  const toast = useToast();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "price" || name === "special_price"
        ? parseFloat(value) || 0
        : value;
    setProduct({ ...product, [name]: parsedValue });
  };

  const handleVariantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    variantIndex: number,
    imgIndex?: number
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "price" || name === "special_price"
        ? parseFloat(value) || 0
        : value;
    // setVariant({ ...variant, [name]: value });
    if (["color", "size"].includes(name)) {
      const updatedVariants = [...product.variants];
      updatedVariants[variantIndex].attributes = {
        ...updatedVariants[variantIndex].attributes,
        [name]: parsedValue,
      };
      setProduct({ ...product, variants: updatedVariants });
    } else {
      const updatedVariants = [...product.variants];
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        [name]: parsedValue,
      };
      setProduct({ ...product, variants: updatedVariants });
    }
  };

  // Configuration object to define which fields are required
  const config = {
    sku: true,
    name: true,
    description: true,
    image: true,
    price: true,
    special_price: true,
    variants: true,
    variantSku: true,
    variantName: true,
    variantPrice: true,
    variantSpecialPrice: true,
    variantImage: true,
    variantColor: true,
    variantSize: true,
  };

  const showErrors = (errors: string[]) => {
    // const toast = useToast();
    errors.forEach((error) => {
      toast({
        title: "Validation Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };
  const validateForm = (formData: Product, config: any) => {
    const errors = [];
    const { sku, name, description, image, price, special_price, variants } =
      formData;

    // Check the main fields
    if (config.sku && !sku) {
      errors.push("SKU is required.");
    }
    if (config.name && !name) {
      errors.push("Name is required.");
    }

    if (config.description && !description) {
      errors.push("Description is required.");
    }

    if (config.image && !image) {
      errors.push("Image URL is required.");
    }

    if (config.price && price <= 0) {
      errors.push("Price must be greater than 0.");
    }

    if (config.special_price && special_price <= 0) {
      errors.push("Special price must be greater than 0.");
    }

    // Check variants if defined
    if (config.variants && Array.isArray(variants)) {
      for (let i = 0; i < variants.length; i++) {
        const { sku, name, price, special_price, image, attributes } =
          variants[i];

        if (config.variantSku && !sku) {
          errors.push(`Variant SKU is required (Variant ${i + 1}).`);
        }

        if (config.variantName && !name) {
          errors.push(`Variant name is required (Variant ${i + 1}).`);
        }

        if (config.variantPrice && price <= 0) {
          errors.push(
            `Variant price must be greater than 0 (Variant ${i + 1}).`
          );
        }

        if (config.variantSpecialPrice && special_price <= 0) {
          errors.push(
            `Variant special price must be greater than 0 (Variant ${i + 1}).`
          );
        }

        if (config.variantImage && image.length === 0) {
          errors.push(`Variant image is required (Variant ${i + 1}).`);
        }

        if (config.variantColor && !attributes.color) {
          errors.push(`Variant color is required (Variant ${i + 1}).`);
        }

        if (config.variantSize && !attributes.size) {
          errors.push(`Variant size is required (Variant ${i + 1}).`);
        }
      }
    }

    if (variants.length == 0) {
      console.log("hii");

      errors.push("Please Select Atleast One Variant of the product");
    }

    // Return the array of error messages. If empty, the form is valid.
    return errors;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add your submit logic here, e.g., sending data to the server
    product.variants.map((i: ProductVariant) => {
      i.image = i.image.filter((img: string) => img !== "");
      i.sku = generateSKU(product.sku, i.attributes.color, i.attributes.size);
      i.name =
        product.name +
        " - " +
        i.attributes.color +
        ", Size " +
        i.attributes.size;
    });
    const errors = validateForm(product, config);
    if (errors.length > 0) {
      showErrors(errors);
      console.log("error", errors);
    } else {
      dispatch(startLoading("Your Order Is Creating, please wait..."));
      POSTAPI({
        path: "marketplace/products",
        data: product,
        isPrivateApi: true,
        enableCache: false,
      }).subscribe((res: any) => {
        console.log(res);
        
        dispatch(stopLoading());
        if (res.success) {

          if (!res.message.includes("updated")) {
            setProduct({
              sku: "",
              name: "",
              description: "",
              image: "",
              price: 0,
              special_price: 0,
              variants: [],
            });
          }
          toast({
            title: res.message,
            status: "success",
            duration: 5000,
            isClosable: true,
            // position: "top" // This will position the toast at the top of the screen
          });
        } else {
          toast({
            title: res.errorInfo.response.data.message || res.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            // position: "top" // This will position the toast at the top of the screen
          });
        }
        console.log("res");
      });
    }
  };

  return (
    <Box margin={"auto"}>
      {/* Header */}
      <Box margin={"auto"} boxShadow="md" p={2}>
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          EXITED YOU DOING {mode} PRODUCT
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Good Know That You Are Trying To{" "}
          {mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()} your
          product
        </Text>
      </Box>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", // 1 column on small screens
          md: "repeat(2, 1fr)", // 2 columns on medium screens
          lg: "repeat(12, 1fr)", // 3 columns on large screens
          xl: "repeat(12, 1fr)", // 4 columns on extra-large screens
        }}
        gap={6}
        p={6}
      >
        {/* Form for Product Details */}

        <GridItem
          colSpan={{
            base: 12,
            md: 12,
            lg: 8,
            xl: 8,
          }}
        >
          <VStack
            spacing={4}
            p={4}
            align="stretch"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            borderColor="gray.300"
          >
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>SKU</FormLabel>
                <Input
                  required={true}
                  variant="auth"
                  fontSize="sm"
                  name="sku"
                  value={product.sku}
                  onChange={handleInputChange}
                  placeholder="Enter SKU"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  required={true}
                  name="name"
                  variant={"main"}
                  value={product.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  required={true}
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Price (MRP)</FormLabel>
                <Input
                  required={true}
                  variant={"main"}
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Special Price</FormLabel>
                <Input
                  required={true}
                  type="text"
                  name="special_price"
                  variant={"main"}
                  value={product.special_price}
                  onChange={handleInputChange}
                  placeholder="Enter special price"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Product Image URL</FormLabel>
                <Input
                  required={true}
                  name="image"
                  color={"lightblue"}
                  variant="main"
                  value={product.image}
                  onChange={handleInputChange}
                  placeholder="Enter main image URL"
                />
              </FormControl>
              <Box pb={2}>
                {product.variants.map(
                  (variant: ProductVariant, variantIndex) => (
                    <React.Fragment key={variantIndex}>
                      <Stack
                        spacing={4}
                        p={4}
                        m={2}
                        borderWidth="1px"
                        borderRadius="lg"
                        boxShadow="md"
                        borderColor={"red"}
                      >
                        <FormControl>
                          <FormLabel>Color</FormLabel>
                          <Select
                            name="color"
                            variant="main"
                            value={variant.attributes.color}
                            onChange={(e) =>
                              handleVariantChange(e, variantIndex)
                            }
                          >
                            <option value="Yellow">Yellow</option>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Green">Green</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Size</FormLabel>
                          <Select
                            name="size"
                            variant={"main"}
                            value={variant.attributes.size}
                            onChange={(e) =>
                              handleVariantChange(e, variantIndex)
                            }
                          >
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Product Name</FormLabel>
                          <Input
                            disabled
                            required={true}
                            name="name"
                            variant={"main"}
                            value={
                              product.name +
                              " - " +
                              variant.attributes.color +
                              ", Size " +
                              variant.attributes.size
                            }
                            onChange={(e) =>
                              handleVariantChange(e, variantIndex)
                            }
                            placeholder="Enter product name"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Price (MRP)</FormLabel>
                          <Input
                            required={true}
                            variant={"main"}
                            type="text"
                            name="price"
                            value={variant.price}
                            onChange={(e) =>
                              handleVariantChange(e, variantIndex)
                            }
                            placeholder="Enter price"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Special Price</FormLabel>
                          <Input
                            required={true}
                            type="text"
                            name="special_price"
                            variant={"main"}
                            value={variant.special_price}
                            onChange={(e) =>
                              handleVariantChange(e, variantIndex)
                            }
                            placeholder="Enter special price"
                          />
                        </FormControl>

                        <Box pb={2}>
                          <Stack spacing={4}>
                            {variant.image.map((url, index) => (
                              <FormControl key={index}>
                                <FormLabel>
                                  Product Image URL {index + 1}
                                </FormLabel>
                                <Input
                                  required
                                  name={`image-${index}`}
                                  color="lightblue"
                                  variant="outline"
                                  value={
                                    product.variants[variantIndex].image[index]
                                  }
                                  onChange={(event) => {
                                    const updatedVariants = [
                                      ...product.variants,
                                    ];
                                    updatedVariants[variantIndex].image[index] =
                                      event.target.value;
                                    setProduct({
                                      ...product,
                                      variants: updatedVariants,
                                    });
                                  }}
                                  placeholder={`Enter image URL ${index + 1}`}
                                />
                              </FormControl>
                            ))}
                            <Button
                              isDisabled={["VIEW_ONLY"].includes(mode)}
                              colorScheme="blue"
                              onClick={() => {
                                const updatedVariants = [...product.variants];
                                updatedVariants[variantIndex].image.push("");
                                setProduct({
                                  ...product,
                                  variants: updatedVariants,
                                });
                              }}
                              // setVariant({
                              //   ...variants,
                              //   image: [...variants.image, ""],
                              // })
                              // }
                            >
                              Add Another Image
                            </Button>
                          </Stack>
                        </Box>

                        <FormControl>
                          <FormLabel>SKU</FormLabel>
                          <Input
                            disabled
                            required={true}
                            variant="auth"
                            fontSize="sm"
                            // name={`sku-${index}`}
                            name="sku"
                            value={generateSKU(
                              product.sku + variantIndex + 1,
                              variant.attributes.color,
                              variant.attributes.size
                            )}
                            onChange={(e) =>
                              handleVariantChange(e, variantIndex)
                            }
                            placeholder="Enter SKU"
                          />
                        </FormControl>
                      </Stack>
                    </React.Fragment>
                  )
                )}

                <Button
                  // colorScheme="blue"
                  isDisabled={["VIEW_ONLY"].includes(mode)}
                  variant={"outline"}
                  onClick={() =>
                    setProduct({
                      ...product,
                      variants: [...product.variants, defualtVariant],
                    })
                  }
                  leftIcon={<AddIcon />}
                >
                  Add Product Variant
                </Button>
                <Button
                  isDisabled={
                    product.variants.length == 0 || ["VIEW_ONLY"].includes(mode)
                  }
                  variant={"outline"}
                  onClick={() =>
                    setProduct({
                      ...product,
                      variants: product.variants.slice(0, -1), // Removes the last variant
                    })
                  }
                  leftIcon={<MdDelete />} // You can use any icon or remove this if unnecessary
                >
                  Remove Product Variant
                </Button>
              </Box>

              <Button
                isDisabled={["VIEW_ONLY"].includes(mode)}
                fontSize="sm"
                variant="outline"
                fontWeight="500"
                w="100%"
                h="50"
                mt="24px"
                mb="24px"
                type="submit"
                // isLoading={isLoading}
                leftIcon={<FaCartPlus />}
              >
                Save & Submit
              </Button>
            </form>
          </VStack>
        </GridItem>

        <GridItem
          colSpan={{
            base: 12,
            md: 12,
            lg: 4,
            xl: 4,
          }}
        >
          <VStack
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
          >
            <HStack spacing={2} alignItems="center" mt={4}>
              <Icon as={FaEye} boxSize={6} color="teal.500" />
              <Text fontSize="md" fontWeight="bold">
                Preview
              </Text>
            </HStack>
            <ProductView product={product} />
          </VStack>
        </GridItem>

        {/* Real-Time Product Preview */}
      </Grid>
    </Box>
  );
};

const generateSKU = (baseSKU: string, color: string, size: string) => {
  // Mapping of color and size to codes
  const colorCode: any = {
    Red: "RED",
    Blue: "BLUE",
    Yellow: "YELLOW",
    // Add more color mappings as needed
  };

  const sizeCode: any = {
    S: "S",
    M: "M",
    L: "L",
    // Add more size mappings as needed
  };

  const skuid: string =
    `${baseSKU}-${colorCode[color]}-${sizeCode[size]}`.toUpperCase();
  return skuid;
};
// Define the props for the ProductVariantModal component
interface ProductVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default AddProduct;

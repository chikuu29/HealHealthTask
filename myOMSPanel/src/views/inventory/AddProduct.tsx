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
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import * as dynamicFunctions from "../../script/myAppsScript";
  
  import { useSelector } from "react-redux";
  import { RootState } from "../../app/store";
  import ErrorComponent from "../../ui/components/Error/ErrorComponent";
  import Loader from "../../ui/components/Loader/Loader";
import { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
  
//   export function AddProduct() {
//     const appConfig = useSelector(
//       (state: RootState) => state.app.appConfig
//     );
//     const loading = useSelector((state: RootState) => state.app.loading);
//     const error = useSelector((state: RootState) => state.app.error);
//     const navigate = useNavigate(); // Move useNavigate here
//     const appList = appConfig?.config?.appList || [];
//     // console.log("error in loadinf app ", error);
  
   
  
//     // if (loading === "loading") return <Loader loaderText="Loading App Configuration..."/>;
//     return (
    
//        <h1>HELLO</h1>
     
//     );
//   }
const AddProduct=()=>{
    const [product, setProduct] = useState({
        sku: '',
        name: '',
        description: '',
        image: '',
        price: '',
        specialPrice: '',
        variants: []
    });
    const [variant, setVariant] = useState({
        sku: '',
        name: '',
        price: '',
        specialPrice: '',
        attributes: {
            color: '',
            size: ''
        }
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleVariantChange = (e:any) => {
        const { name, value } = e.target;
        setVariant({ ...variant, [name]: value });
    };

    const handleAttributesChange = (e:any) => {
        const { name, value } = e.target;
        setVariant({
            ...variant,
            attributes: { ...variant.attributes, [name]: value }
        });
    };

    const addVariant = () => {
        // setProduct({
        //     ...product,
        //     variants: [...product.variants, variant]
        // });
        setVariant({
            sku: '',
            name: '',
            price: '',
            specialPrice: '',
            attributes: { color: '', size: '' }
        });
        onClose();
        toast({
            title: "Variant added.",
            description: "The variant has been added to the product.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // Add your submit logic here, e.g., sending data to the server
        console.log('Product Data:', product);
        toast({
            title: "Product added.",
            description: "The product has been added successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                <FormControl id="sku" isRequired>
                    <FormLabel>SKU</FormLabel>
                    <Input
                        type="text"
                        name="sku"
                        value={product.sku}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl id="name" isRequired>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl id="description">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl id="image">
                    <FormLabel>Image URL</FormLabel>
                    <Input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl id="price" isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl id="specialPrice">
                    <FormLabel>Special Price</FormLabel>
                    <Input
                        type="number"
                        name="specialPrice"
                        value={product.specialPrice}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <Button mt={4} colorScheme="teal" onClick={onOpen}>
                    Add Variant
                </Button>

                <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                    Add Product
                </Button>

                {/* Displaying added variants */}
                <Box mt={6}>
                    <Text fontSize="lg" mb={2}>
                        Added Variants ({product.variants.length})
                    </Text>
                    <List spacing={3}>
                        {product.variants.map((variant, index) => (
                            <ListItem key={index}>
                                <ListIcon as={CheckIcon} color="green.500" />
                                {/* <Text><strong>SKU:</strong> {variant.sku}</Text>
                                <Text><strong>Name:</strong> {variant.name}</Text>
                                <Text><strong>Price:</strong> ${variant.price}</Text>
                                <Text><strong>Special Price:</strong> ${variant.specialPrice}</Text>
                                <Text><strong>Color:</strong> {variant.attributes.color}</Text>
                                <Text><strong>Size:</strong> {variant.attributes.size}</Text> */}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Variant</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="variant-sku" mb={4}>
                            <FormLabel>Variant SKU</FormLabel>
                            <Input
                                type="text"
                                name="sku"
                                value={variant.sku}
                                onChange={handleVariantChange}
                            />
                        </FormControl>

                        <FormControl id="variant-name" mb={4}>
                            <FormLabel>Variant Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                value={variant.name}
                                onChange={handleVariantChange}
                            />
                        </FormControl>

                        <FormControl id="variant-price" mb={4}>
                            <FormLabel>Variant Price</FormLabel>
                            <Input
                                type="number"
                                name="price"
                                value={variant.price}
                                onChange={handleVariantChange}
                            />
                        </FormControl>

                        <FormControl id="variant-specialPrice" mb={4}>
                            <FormLabel>Variant Special Price</FormLabel>
                            <Input
                                type="number"
                                name="specialPrice"
                                value={variant.specialPrice}
                                onChange={handleVariantChange}
                            />
                        </FormControl>

                        <FormControl id="variant-color" mb={4}>
                            <FormLabel>Color</FormLabel>
                            <Input
                                type="text"
                                name="color"
                                value={variant.attributes.color}
                                onChange={handleAttributesChange}
                            />
                        </FormControl>

                        <FormControl id="variant-size" mb={4}>
                            <FormLabel>Size</FormLabel>
                            <Input
                                type="text"
                                name="size"
                                value={variant.attributes.size}
                                onChange={handleAttributesChange}
                            />
                        </FormControl>

                        <Box mt={4} p={4} borderWidth={1} borderRadius="md">
                            <Text fontWeight="bold" mb={2}>Variant Preview:</Text>
                            <Text><strong>SKU:</strong> {variant.sku}</Text>
                            <Text><strong>Name:</strong> {variant.name}</Text>
                            <Text><strong>Price:</strong> ${variant.price}</Text>
                            <Text><strong>Special Price:</strong> ${variant.specialPrice}</Text>
                            <Text><strong>Color:</strong> {variant.attributes.color}</Text>
                            <Text><strong>Size:</strong> {variant.attributes.size}</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={addVariant}>
                            Save Variant
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
)}

// const AddProduct=()=>{
//     const [product, setProduct] = useState({
//         sku: '',
//         name: '',
//         description: '',
//         image: '',
//         price: '',
//         specialPrice: '',
//         variants: []
//     });
//     const [variant, setVariant] = useState({
//         sku: '',
//         name: '',
//         price: '',
//         specialPrice: '',
//         attributes: {
//             color: '',
//             size: ''
//         }
//     });
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const toast = useToast();

//     const handleInputChange = (e:any) => {
//         const { name, value } = e.target;
//         setProduct({ ...product, [name]: value });
//     };

//     const handleVariantChange = (e:any) => {
//         const { name, value } = e.target;
//         setVariant({ ...variant, [name]: value });
//     };

//     const handleAttributesChange = (e:any) => {
//         const { name, value } = e.target;
//         setVariant({
//             ...variant,
//             attributes: { ...variant.attributes, [name]: value }
//         });
//     };

//     const addVariant = () => {
//         // setProduct({
//         //     ...product,
//         //     variants: [...product.variants, variant]
//         // });
//         setVariant({
//             sku: '',
//             name: '',
//             price: '',
//             specialPrice: '',
//             attributes: { color: '', size: '' }
//         });
//         onClose();
//         toast({
//             title: "Variant added.",
//             description: "The variant has been added to the product.",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//         });
//     };

//     const handleSubmit = (e:any) => {
//         e.preventDefault();
//         // Add your submit logic here, e.g., sending data to the server
//         console.log('Product Data:', product);
//         toast({
//             title: "Product added.",
//             description: "The product has been added successfully.",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//         });
//     };

//     return (
//         <Box p={4}>
//             <VStack spacing={4} align="stretch">
//                 <FormControl id="sku" isRequired>
//                     <FormLabel>SKU</FormLabel>
//                     <Input 
//                         type="text" 
//                         name="sku" 
//                         value={product.sku} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="name" isRequired>
//                     <FormLabel>Product Name</FormLabel>
//                     <Input 
//                         type="text" 
//                         name="name" 
//                         value={product.name} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="description">
//                     <FormLabel>Description</FormLabel>
//                     <Textarea 
//                         name="description" 
//                         value={product.description} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="image">
//                     <FormLabel>Image URL</FormLabel>
//                     <Input 
//                         type="text" 
//                         name="image" 
//                         value={product.image} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="price" isRequired>
//                     <FormLabel>Price</FormLabel>
//                     <Input 
//                         type="number" 
//                         name="price" 
//                         value={product.price} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="specialPrice">
//                     <FormLabel>Special Price</FormLabel>
//                     <Input 
//                         type="number" 
//                         name="specialPrice" 
//                         value={product.specialPrice} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <Button mt={4} colorScheme="teal" onClick={onOpen}>
//                     Add Variant
//                 </Button>

//                 <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
//                     Add Product
//                 </Button>
//             </VStack>

//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Add Variant</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <FormControl id="variant-sku" mb={4}>
//                             <FormLabel>Variant SKU</FormLabel>
//                             <Input 
//                                 type="text" 
//                                 name="sku" 
//                                 value={variant.sku} 
//                                 onChange={handleVariantChange} 
//                             />
//                         </FormControl>

//                         <FormControl id="variant-name" mb={4}>
//                             <FormLabel>Variant Name</FormLabel>
//                             <Input 
//                                 type="text" 
//                                 name="name" 
//                                 value={variant.name} 
//                                 onChange={handleVariantChange} 
//                             />
//                         </FormControl>

//                         <FormControl id="variant-price" mb={4}>
//                             <FormLabel>Variant Price</FormLabel>
//                             <Input 
//                                 type="number" 
//                                 name="price" 
//                                 value={variant.price} 
//                                 onChange={handleVariantChange} 
//                             />
//                         </FormControl>

//                         <FormControl id="variant-specialPrice" mb={4}>
//                             <FormLabel>Variant Special Price</FormLabel>
//                             <Input 
//                                 type="number" 
//                                 name="specialPrice" 
//                                 value={variant.specialPrice} 
//                                 onChange={handleVariantChange} 
//                             />
//                         </FormControl>

//                         <FormControl id="variant-color" mb={4}>
//                             <FormLabel>Color</FormLabel>
//                             <Input 
//                                 type="text" 
//                                 name="color" 
//                                 value={variant.attributes.color} 
//                                 onChange={handleAttributesChange} 
//                             />
//                         </FormControl>

//                         <FormControl id="variant-size" mb={4}>
//                             <FormLabel>Size</FormLabel>
//                             <Input 
//                                 type="text" 
//                                 name="size" 
//                                 value={variant.attributes.size} 
//                                 onChange={handleAttributesChange} 
//                             />
//                         </FormControl>
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme="teal" mr={3} onClick={addVariant}>
//                             Save Variant
//                         </Button>
//                         <Button variant="outline" onClick={onClose}>
//                             Cancel
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </Box>
//     );
// }

// const AddProduct = () => {
//     const [product, setProduct] = useState({
//         sku: '',
//         name: '',
//         description: '',
//         image: '',
//         price: '',
//         specialPrice: '',
//         variants: []
//     });
//     const [variant, setVariant] = useState({
//         sku: '',
//         name: '',
//         price: '',
//         specialPrice: '',
//         attributes: {
//             color: '',
//             size: ''
//         }
//     });
//     const toast = useToast();

//     const handleInputChange = (e:any) => {
//         const { name, value } = e.target;
//         setProduct({ ...product, [name]: value });
//     };

//     const handleVariantChange = (e:any) => {
//         const { name, value } = e.target;
//         setVariant({ ...variant, [name]: value });
//     };

//     const handleAttributesChange = (e:any) => {
//         const { name, value } = e.target;
//         setVariant({
//             ...variant,
//             attributes: { ...variant.attributes, [name]: value }
//         });
//     };

//     const addVariant = () => {
//         // setProduct({
//         //     ...product,
//         //     variants: [...product.variants, variant]
//         // });
//         setVariant({
//             sku: '',
//             name: '',
//             price: '',
//             specialPrice: '',
//             attributes: { color: '', size: '' }
//         });
//         toast({
//             title: "Variant added.",
//             description: "The variant has been added to the product.",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//         });
//     };

//     const handleSubmit = (e:any) => {
//         e.preventDefault();
//         // Add your submit logic here, e.g., sending data to the server
//         console.log('Product Data:', product);
//         toast({
//             title: "Product added.",
//             description: "The product has been added successfully.",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//         });
//     };

//     return (
//         <Box p={4}>
//             <VStack spacing={4} align="stretch">
//                 <FormControl id="sku" isRequired>
//                     <FormLabel>SKU</FormLabel>
//                     <Input 
//                         type="text" 
//                         name="sku" 
//                         value={product.sku} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="name" isRequired>
//                     <FormLabel>Product Name</FormLabel>
//                     <Input 
//                         type="text" 
//                         name="name" 
//                         value={product.name} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="description">
//                     <FormLabel>Description</FormLabel>
//                     <Textarea 
//                         name="description" 
//                         value={product.description} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="image">
//                     <FormLabel>Image URL</FormLabel>
//                     <Input 
//                         type="text" 
//                         name="image" 
//                         value={product.image} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="price" isRequired>
//                     <FormLabel>Price</FormLabel>
//                     <Input 
//                         type="number" 
//                         name="price" 
//                         value={product.price} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <FormControl id="specialPrice">
//                     <FormLabel>Special Price</FormLabel>
//                     <Input 
//                         type="number" 
//                         name="specialPrice" 
//                         value={product.specialPrice} 
//                         onChange={handleInputChange} 
//                     />
//                 </FormControl>

//                 <Box>
//                     <FormControl id="variant-sku">
//                         <FormLabel>Variant SKU</FormLabel>
//                         <Input 
//                             type="text" 
//                             name="sku" 
//                             value={variant.sku} 
//                             onChange={handleVariantChange} 
//                         />
//                     </FormControl>

//                     <FormControl id="variant-name">
//                         <FormLabel>Variant Name</FormLabel>
//                         <Input 
//                             type="text" 
//                             name="name" 
//                             value={variant.name} 
//                             onChange={handleVariantChange} 
//                         />
//                     </FormControl>

//                     <FormControl id="variant-price">
//                         <FormLabel>Variant Price</FormLabel>
//                         <Input 
//                             type="number" 
//                             name="price" 
//                             value={variant.price} 
//                             onChange={handleVariantChange} 
//                         />
//                     </FormControl>

//                     <FormControl id="variant-specialPrice">
//                         <FormLabel>Variant Special Price</FormLabel>
//                         <Input 
//                             type="number" 
//                             name="specialPrice" 
//                             value={variant.specialPrice} 
//                             onChange={handleVariantChange} 
//                         />
//                     </FormControl>

//                     <FormControl id="variant-color">
//                         <FormLabel>Color</FormLabel>
//                         <Input 
//                             type="text" 
//                             name="color" 
//                             value={variant.attributes.color} 
//                             onChange={handleAttributesChange} 
//                         />
//                     </FormControl>

//                     <FormControl id="variant-size">
//                         <FormLabel>Size</FormLabel>
//                         <Input 
//                             type="text" 
//                             name="size" 
//                             value={variant.attributes.size} 
//                             onChange={handleAttributesChange} 
//                         />
//                     </FormControl>

//                     <Button mt={4} colorScheme="teal" onClick={addVariant}>
//                         Add Variant
//                     </Button>
//                 </Box>

//                 <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
//                     Add Product
//                 </Button>
//             </VStack>
//         </Box>
//     );
// };

export default AddProduct;

  
 
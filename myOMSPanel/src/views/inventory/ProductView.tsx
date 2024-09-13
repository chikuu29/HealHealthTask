import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

// Example product data
// const product :Product= {
//   sku: "SKU123456",
//   name: "Product Name",
//   description: "This is a detailed description of the product.",
//   image:
//     "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//   price: 29.99,
//   special_price: 24.99,
//   variants: [
//     {
//       sku: "SKU123456-RED-S",
//       name: "Product Name - Red, Size S",
//       price: 29.99,
//       special_price: 24.99,
//       image: [
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//       ],
//       attributes: {
//         color: "Red",
//         size: "S",
//       },
//     },
//     {
//       sku: "SKU123456-BLUE-L",
//       name: "Product Name - Blue, Size L",
//       price: 34.99,
//       special_price: 29.99,
//       image: [
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYl2bM5rtNI-ApGUqqtqKadydd1iPFABm7nJjfJN0TFQfrQD36R_PcVQXF5XMVoIgljyd3TObthkhNnz9oGNInoDz9n_DdalkIzpIPRjSLd4bWmwDqn7o6",
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCSvbtQgdFm7aWlfuOFjaLkopNKhj0h1I0xJ6FaUtrp8wDk9i-hcOxyM6nF7RyclR88E52jm-8YQlQKiY1Ff49n5VZsDB7-OshRNrDq-OK85fYe2ZWgpuC",
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQze6ChRDRyi-klBAqOuNbS_Er89ff6psCa86vpCAeYDTYB05zMrkgi8XjA3cqY6dlzBJDyK0JKsk4LLYROn7vJjqKRb6c_YwB-l0PVa-3Adnc-z3andMvN",
//       ],
//       attributes: {
//         color: "Blue",
//         size: "L",
//       },
//     },
//   ],
// };
interface ProductViewProps {
  product: Product;
}

const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  console.log("Product View", product);

  // Handle missing or null product
  if (!product || !product.variants || product.variants.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="300px"
        bg="gray.100"
        borderRadius="lg"
        boxShadow="md"
        p={6}
        textAlign="center"
      >
        <VStack spacing={4}>
          {/* Icon to emphasize the message */}
          <Icon as={FiAlertTriangle} w={12} h={12} color="red.500" />

          {/* Message text */}
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            Oops! No product or variant data available.
          </Text>

          {/* Additional text for user guidance */}
          <Text fontSize="lg" color="gray.500">
            Please check back later or contact support for assistance.
          </Text>

          {/* Optional button to take action */}
          <Button
            size="lg"
            colorScheme="teal"
            onClick={() => window.location.reload()} // Example action: reload the page
          >
            Try Again
          </Button>
        </VStack>
      </Box>
    );
  }

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {}
  );
  const [mainImage, setMainImage] = useState(
    selectedVariant?.image && selectedVariant.image[0]
      ? selectedVariant.image[0]
      : product.image
  );

  useEffect(() => {
    // Update the main image if selectedVariant changes
    if (
      selectedVariant &&
      selectedVariant.image &&
      selectedVariant.image.length > 0
    ) {
      setMainImage(selectedVariant.image[0]);
    } else {
      setMainImage(product.image); // Fallback to product image if variant image is not available
    }
  }, [selectedVariant, product.image]);

  const handleVariantClick = (variant: any) => {
    setSelectedVariant(variant);
  };

  const handleImageClick = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        {/* Main Product Image */}
        <Image
          boxSize="300px"
          objectFit="cover"
          src={mainImage}
          alt={selectedVariant.name || product.name}
        />

        {/* Display all images if available */}
        {selectedVariant.image && selectedVariant.image.length > 0 ? (
          <HStack spacing={2}>
            {selectedVariant.image.map((imgSrc, index) => (
              <Image
                key={index}
                boxSize="50px"
                objectFit="cover"
                src={imgSrc}
                alt={`Thumbnail ${index + 1}`}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                cursor="pointer"
                onClick={() => handleImageClick(imgSrc)}
              />
            ))}
          </HStack>
        ) : (
          <Text>No additional images available</Text>
        )}

        {/* Product Name */}
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          {selectedVariant.name || product.name}
        </Text>

        {/* Product Description */}
        <Text fontSize="lg" color="gray.500" textAlign="center">
          {product.description}
        </Text>

        {/* Display MRP and Special Price */}
        <HStack spacing={2} alignItems="center">
          {selectedVariant.price ? (
            <>
              <Text
                fontSize="lg"
                color="gray.600"
                textDecoration="line-through"
              >
                MRP: ${selectedVariant.price || product.price}
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="red.500">
                ${selectedVariant.special_price || selectedVariant.price }
              </Text>
            </>
          ) : (
            <Text>Price not available</Text>
          )}
        </HStack>

        {/* SKU */}
        {selectedVariant.sku ? (
          <Text fontSize="md" color="gray.600">
            SKU: {selectedVariant.sku}
          </Text>
        ) : (
          <Text fontSize="md" color="gray.600">
            SKU: Not available
          </Text>
        )}

        {/* Variant Buttons */}
        {product.variants.length > 0 ? (
          <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>
            {product.variants.map((variant, index) => (
              <GridItem key={index}>
                <Button
                  variant="outline"
                  onClick={() => handleVariantClick(variant)}
                  w="full"
                  p={2}
                  textAlign="center"
                >
                  <Text fontSize="sm">
                    {variant.attributes?.color || "Color Not Available"} -{" "}
                    {variant.attributes?.size || "Size Not Available"}
                  </Text>
                </Button>
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text>No variants available</Text>
        )}
      </VStack>
    </Box>
  );
};

export default ProductView;

import { Box, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import ProductView from "../inventory/ProductView";
import { useEffect, useRef, useState } from "react";
import { GETAPI } from "../../app/api";

const MarketPlace = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = () => {
      GETAPI({
        path: "marketplace/getAllProducts",
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

  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const searchInputRef = useRef<HTMLInputElement>(null); // Create a ref for the input field

  useEffect(() => {
    // Focus the search input when the component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  return (
    <Box p={4}>
      <Input
        variant="auth"
        ref={searchInputRef}
        placeholder="Search products..."
        value={searchQuery}
        size="lg"
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <GridItem
              key={index}
              p={4}
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
            >
              <ProductView product={product} />
            </GridItem>
          ))
        ) : (
          <Text>No products found</Text>
        )}
      </Grid>
    </Box>
  );
};

export default MarketPlace;

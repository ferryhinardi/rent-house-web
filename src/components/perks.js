import {
  chakra,
  Box,
  Flex,
  SimpleGrid,
  Text,
  Image,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { fetchPerks } from "../api/perks";
import { LoadingGrid } from "./loading";

const Perks = () => {
  const { perks, isLoading, isError } = fetchPerks();

  if (isLoading) return <LoadingGrid />;
  if (isError) return <p></p>;

  return (
    <SimpleGrid columns={[2, null, 3]} spacing="10px" mb="30px">
      {perks &&
        perks.data.map((item) => (
          <Flex p={10} w="full" alignItems="top" justifyContent="center">
            <Box
              w="xs"
              bg={useColorModeValue("white", "gray.800")}
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              mx="auto"
            >
              <Image
                w="full"
                h={56}
                fit="cover"
                src={process.env.NEXT_PUBLIC_IMAGE_HOST + item.image}
                fallbackSrc="/scenery.jpeg"
                alt="perks image"
              />

              <Box px={2} py={5} textAlign="center">
                <Text
                  display="block"
                  fontSize="2xl"
                  color={useColorModeValue("gray.800", "white")}
                  fontWeight="bold"
                >
                  {item.title}
                </Text>
                <chakra.span
                  fontSize="sm"
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  {item.description}
                </chakra.span>
              </Box>
            </Box>
          </Flex>
        ))}
    </SimpleGrid>
  );
};

export { Perks };

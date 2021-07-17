import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  SimpleGrid,
  Heading,
  Button,
  Wrap,
  WrapItem,
  Image,
  VStack,
} from "@chakra-ui/react";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

const CallToAction = (props) => {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              Discover apartment,
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              No 1 site for Renters!
            </Text>
          </Heading>
          <Text color={"gray.500"}>{lorem}</Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
            >
              Get started
            </Button>
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              How It Works
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src="\banner.jpeg"
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

const Gallery = (props) => {
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="10px" mb="30px">
      {props.data.map((card) => (
        <Box key={card.id} d="flex" w={350} borderWidth="1px" borderRadius="lg">
          <Box w="150px">
            <Image src={"/" + card.imageSrc} alt="Scenery" />
          </Box>
          <VStack spacing={2} w="200px" align="left" pl="10px" pr="10px">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {card.name}
            </Box>
            <Box>
              <Text fontSize="xs">{card.description}</Text>
            </Box>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

const Process = (props) => {
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="10px" mb="30px">
      {props.data.map((card) => (
        <Box key={card.id} d="flex" w={200} borderWidth="1px" borderRadius="lg">
          <VStack spacing={2} w="200px" align="center" pl="10px" pr="10px">
            <Box w="150px">
              <Image
                borderRadius="full"
                boxSize="150px"
                src={"/" + card.imageSrc}
                alt="Scenery"
              />
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {card.name}
            </Box>
            <Box>
              <Text fontSize="xs">{card.description}</Text>
            </Box>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export { Process, Gallery, CallToAction };

import React from "react";
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Heading,
  Image,
  chakra,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import Header from "../src/components/header.";
import Footer from "../src/components/footer";

const aboutUsDescription = `Ryna is the next generation rental provider that built on the mission to empower women. Powered by technology, Ryna delivers a seamless rental experience and a sense of community/belonging designed to meet the ever changing lifestyle needs in major cities. `;

export default function AboutUs(props) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      <Header />

      <AboutUsSection />

      <StorySection />
      {props.children}
      <Footer />
    </Flex>
  );
}

const AboutUsSection = () => {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 10, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "3xl", lg: "5xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "10%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "primary.400",
                zIndex: -1,
              }}
            >
              Hi! We Are Ryna,
            </Text>
            <br />
          </Heading>
          <Text color={"gray.900"}>{aboutUsDescription}</Text>
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
              src="\apartment.jpg"
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

const StorySection = () => {
  const Feature = (props) => {
    return (
      <Flex>
        <Flex shrink={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            h={12}
            w={12}
            rounded="md"
            color="white"
          >
            <Icon
              boxSize={6}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {props.icon}
            </Icon>
          </Flex>
        </Flex>
        <Box ml={4}>
          <chakra.dt
            fontSize="lg"
            fontWeight="medium"
            lineHeight="6"
            boxShadow={"2xl"}
            color={useColorModeValue("gray.900")}
          >
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2} color={useColorModeValue("gray.500", "gray.400")}>
            {props.children}
          </chakra.dd>
        </Box>
      </Flex>
    );
  };
  return (
    <Container maxW={"7xl"} maxW={{ xl: "1200px" }} py={12}>
      <Flex
        justifyContent="center"
        alignItems="center"
        py={12}
        boxShadow={"2xl"}
        bg={useColorModeValue("white", "gray.800")}
        rounded="xl"
      >
        <Box mmx="auto">
          <Box textAlign={{ lg: "center" }}>
            <chakra.p
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
            >
              Our Story
            </chakra.p>
            <chakra.p
              mt={4}
              maxW="3xl"
              fontSize="xl"
              mx={{ lg: "auto" }}
              justifyContent="center"
              color={useColorModeValue("gray.500", "gray.400")}
            >
              We learned there’s so many women in their early, mid, and
              late-twenties/thirties looking for a place due to common factors.
              Women who are transitioning into a new career, new city, new stage
              of life, getting out of a breakup, getting out of a bad roommate
              situation, moving because their roomies are moving in with their
              partners. But finding a place in the city can be daunting, unsafe,
              and a whole job in and of itself. It’s hard to find even most of
              what you’re looking for: affordability, nice space, location,
              roommates, etc. Women have it hard enough as it is, without enough
              credit. (read more)
            </chakra.p>
          </Box>

          <Box mt={10}>
            <Stack
              spacing={{ base: 10, md: 0 }}
              display={{ md: "grid" }}
              gridTemplateColumns={{ md: "repeat(2,1fr)" }}
              gridColumnGap={{ md: 8 }}
              gridRowGap={{ md: 10 }}
            >
              <Feature title="Our Mission">
                We empower women to live their best lives.
              </Feature>

              <Feature title="Our Vision">
                Where everyone can find their tribe.
              </Feature>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

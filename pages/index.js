import { Button, Flex, Heading, Box, Text } from "@chakra-ui/react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Gallery, Process, CallToAction } from "./components/home";
import {Perks} from "./components/perks"

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

const profiles = [
  {
    id: 10,
    imageSrc: "person.jpeg",
    name: "Profile 1",
    description: lorem,
  },
  {
    id: 20,
    imageSrc: "person.jpeg",
    name: "Profile 2",
    description: lorem,
  },
  {
    id: 30,
    imageSrc: "person.jpeg",
    name: "Profile 3",
    description: lorem,
  },
];

const processes = [
  {
    id: 100,
    imageSrc: "tree.jpeg",
    name: "Step 1",
    description: lorem,
  },
  {
    id: 200,
    imageSrc: "tree.jpeg",
    name: "Step 2",
    description: lorem,
  },
  {
    id: 300,
    imageSrc: "tree.jpeg",
    name: "Step 3",
    description: lorem,
  },
];


export default function Home(props) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      <Header />
      <CallToAction />
      <Perks />

      <Heading as="h3" size="md" mb="20px">
        Ryna Process
      </Heading>
      <Process data={processes} />

      <Heading as="h3" size="md" mb="20px">
        Ryna Women
      </Heading>
      <Gallery data={profiles} />

      <Box
        mb="20px"
        height={300}
        alignItems="center"
        d="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading as="h2" size="lg" mb="20px">
          Ryna Women
        </Heading>
        <Button>
          <Text fontSize="xs">RENT WITH US</Text>
        </Button>
      </Box>

      {props.children}
      <Footer />
    </Flex>
  );
}

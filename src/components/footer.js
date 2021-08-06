import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

const Footer = (props) => {
  return (
    <Box bg="#798da3" w="100%" color="white" overflow="auto">
      <Container as={Stack} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={30} mb="30px">
          <Stack align={"flex-start"}>
            <Link href="/">Ryna Living</Link>
            <Link href="mailto:hello@theryna.com">Why Ryna</Link>
            <Link href="/">+1 437-900-1839</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Link href="/">About Us</Link>
            <Link href="/">Why Ryna</Link>
            <Link href="/">Partner With Us</Link>
            <Link href="/">Blogs</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Link href="/">Events</Link>
            <Link href="/">Rental Homes</Link>
            <Link href="/">Sign In</Link>
            <Link href="/">Community</Link>
          </Stack>
        </SimpleGrid>
        <Text>
          Copyright 2020 Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;

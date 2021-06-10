import Header from "./components/header";
import Footer from "./components/footer";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  Box,
  Flex,
  Heading,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <Box my={8} textAlign="left">
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email address" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>

        <Stack isInline justifyContent="space-between" mt={4}>
          <Box>
            <Link color={`teal.500`}>Forgot your password?</Link>
          </Box>
        </Stack>

        <Button
          width="full"
          mt={4}
          color={["primary.500", "primary.500", "white", "white"]}
          bg={["white", "white", "primary.500", "primary.500"]}
          _hover={{
            bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
          }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

const LoginWithSocialMediaForm = () => {
  return (
    <Box my={8} textAlign="left">
      <Button
        colorScheme="facebook"
        leftIcon={<FaFacebook />}
        width="full"
        mt={4}
      >
        Facebook
      </Button>
      <Button leftIcon={<FcGoogle />} width="full" mt={4}>
        Google
      </Button>
    </Box>
  );
};

export default function SignIn(props) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      <Header />

      <Flex
        minHeight="85vh"
        width="full"
        align="top"
        justifyContent="center"
        borderRadius={4}
      >
        <Stack width="full" maxWidth="500px"  >
          <Box textAlign="center" width="full" maxWidth="500px">
            <Heading as="h2" size="xl" mb="20px">
              Sign In
            </Heading>
          </Box>
          <Box px={4} textAlign="center" boxShadow="lg">
            <Box p={4}>
              <LoginForm />
              <LoginWithSocialMediaForm />
            </Box>
          </Box>
        </Stack>
      </Flex>

      {props.children}
      <Footer />
    </Flex>
  );
}

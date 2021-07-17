import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FacebookProvider, Login } from "react-facebook";
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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import Header from "../app/components/header";
import Footer from "../app/components/footer";

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

const LoginWithFacebook = ({ successLoginSetter, errorLoginSetter }) => {
  const handleResponse = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST + "/provider/facebook"}`,
      {
        body: JSON.stringify({
          provider_token: data.tokenDetail.accessToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const result = await res.json();

    typeof window !== "undefined" &&
      localStorage.setItem("token", result.token);

    successLoginSetter(true);
  };

  const handleError = async (error) => {
    errorLoginSetter(JSON.stringify(error));
  };

  return (
    <FacebookProvider appId={`${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}`}>
      <Login scope="email" onCompleted={handleResponse} onError={handleError}>
        {({ loading, handleClick, error, data }) => (
          <Button
            colorScheme="facebook"
            leftIcon={<FaFacebook />}
            width="full"
            mt={4}
            onClick={handleClick}
          >
            Facebook
          </Button>
        )}
      </Login>
    </FacebookProvider>
  );
};

function LoginWithGoogle({ successLoginSetter, errorLoginSetter }) {
  const onSuccess = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST + "/provider/google"}`,
      {
        body: JSON.stringify({
          provider_token: data.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const result = await res.json();

    typeof window !== "undefined" &&
      localStorage.setItem("token", result.token);

    successLoginSetter(true);
  };

  const onFailure = (error) => {
    errorLoginSetter(JSON.stringify(error));
  };

  return (
    <GoogleLogin
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}`}
      render={(renderProps) => (
        <Button
          leftIcon={<FcGoogle />}
          width="full"
          mt={4}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Google
        </Button>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={false}
    ></GoogleLogin>
  );
}

export default function SignIn(props) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const router = useRouter();

  if (typeof window !== "undefined" && localStorage.getItem("token")) {
    router.push("/profile");
  }

  useEffect(() => {
    if (loggedIn) {
      router.push("/profile");
    }
  }, [loggedIn]);

  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      <Header />

      <Alert status="success" hidden={loggedIn ? false : true}>
        <AlertIcon />
        Login Success
      </Alert>

      <Alert status="error" hidden={errorLogin.length > 0 ? false : true}>
        <AlertIcon />
        Login Failed : {errorLogin}
      </Alert>

      <Flex
        minHeight="85vh"
        width="full"
        align="top"
        justifyContent="center"
        borderRadius={4}
      >
        <Stack width="full" maxWidth="500px">
          <Box textAlign="center" width="full" maxWidth="500px">
            <Heading as="h2" size="xl" mb="20px">
              Sign In
            </Heading>
          </Box>
          <Box px={4} textAlign="center" boxShadow="lg">
            <Box p={4}>
              <LoginForm />
              <LoginWithFacebook
                successLoginSetter={setLoggedIn}
                errorLoginSetter={setErrorLogin}
              />
              <LoginWithGoogle
                successLoginSetter={setLoggedIn}
                errorLoginSetter={setErrorLogin}
              />
            </Box>
          </Box>
        </Stack>
      </Flex>

      {props.children}
      <Footer />
    </Flex>
  );
}

import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

class User extends React.Component {
  state = { user: null };

  async componentDidMount() {
    var token = localStorage.getItem("token");
    var bearer = `Bearer ` + token;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST + "/current-user"}`,
      {
        headers: {
          Authorization: bearer,
        },
        method: "GET",
      }
    );
    const data = await response.json();
    this.setState({ user: data });
  }

  render() {
    const user = this.state.user;
    if (user === null) {
      return (
        <Flex>
          <Text> Loading ...</Text>
        </Flex>
      );
    }

    return (
      <Flex>
        <Text>Profil Ala ala dulu \n name : {user.name}</Text>
      </Flex>
    );
  }
}

export default function Profile() {
  const router = useRouter();

  function logoutHandler() {
    localStorage.removeItem("token");
    router.push("/");
  }
  return (
    <Flex>
      <User />
      <Button onClick={logoutHandler}>logout</Button>
    </Flex>
  );
}

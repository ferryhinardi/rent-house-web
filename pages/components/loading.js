import { SimpleGrid, Skeleton } from "@chakra-ui/react";

function LoadingGrid() {
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="10px" width="full" mb="30px">
      <Skeleton
        height="20px"
        my="10px"
        p={10}
        w="full"
        alignItems="top"
        justifyContent="center"
      />
      <Skeleton
        height="20px"
        my="10px"
        p={10}
        w="full"
        alignItems="top"
        justifyContent="center"
      />
      <Skeleton
        height="20px"
        my="10px"
        p={10}
        w="full"
        alignItems="top"
        justifyContent="center"
      />
      <Skeleton
        height="20px"
        my="10px"
        p={10}
        w="full"
        alignItems="top"
        justifyContent="center"
      />
      <Skeleton
        height="20px"
        my="10px"
        p={10}
        w="full"
        alignItems="top"
        justifyContent="center"
      />
      <Skeleton
        height="20px"
        my="10px"
        p={10}
        w="full"
        alignItems="top"
        justifyContent="center"
      />
    </SimpleGrid>
  );
}

export { LoadingGrid };

import { Spinner, Center, Text } from '@chakra-ui/react';
export const Loading = () => {
  return (
    <>
      <Center h='80vh'>
        <Spinner
          thickness='20px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          w='56'
          h='56'
        />
      </Center>
      <Text
        fontSize='5xl'
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
      >
        Wait
      </Text>
    </>
  );
};

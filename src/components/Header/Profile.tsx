import { Avatar, Box, Flex, Text } from "@chakra-ui/react";


interface profileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: profileProps) {
  return (
    <Flex align="center">
      {showProfileData
        && (<Box mr="4" textAlign="right">
          <Text>Marcelino Mendes</Text>
          <Text color="gray.300" fontSize="small">marcelinoneto34@gmail.com</Text>
        </Box>)
      }
      <Avatar size="md" name="Marcelino Mendes" src="https://github.com/marcelinoNet.png" />
    </Flex>
  );
}
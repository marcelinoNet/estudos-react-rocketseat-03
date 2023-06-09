import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { SideBar } from "@/components/Sidebar";
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { useQuery } from 'react-query';

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
}


export default function UserList() {

  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json()
    
    const users = data.users.map((user: User) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      };
    });
    return users;
  },
    {
      staleTime: 1000 * 5, // 5 segundos
    }
  )

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            <Link href="/users/create" passHref>
              <Button

                size="sm"
                fontSize="sm"
                colorScheme="pink"

                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar Novo
              </Button>
            </Link>
          </Flex>

          {isLoading ?
            (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao recuperar dados do usuários</Text>
              </Flex>
            ) :
              (
                <>
                  <Table colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                          <Checkbox colorScheme="pink" />
                        </Th>
                        <Th>Usuários</Th>
                        {isWideVersion && <Th>Data de cadastro</Th>}
                        <Th width="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.map((user: User) => {
                        return (
                          <Tr key={user.id}>
                            <Td px={["4", "4", "6"]}>
                              <Checkbox colorScheme="pink" />
                            </Td>
                            <Td px="6">
                              <Box>
                                <Text fontWeight="bold">{user.name}</Text>
                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                              </Box>
                            </Td>
                            {isWideVersion && <Td px="6">
                              {user.created_at}
                            </Td>}
                            <Td>
                              {isWideVersion && (<Button

                                size="sm"
                                fontSize="sm"
                                colorScheme="purple"
                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                              >
                                Editar
                              </Button>)}
                            </Td>
                          </Tr>
                        )
                      })}

                    </Tbody>
                  </Table>

                  <Pagination />
                </>
              )}

        </Box>
      </Flex>
    </Box>
  );
}
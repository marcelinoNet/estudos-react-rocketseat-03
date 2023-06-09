import { Input } from '@/components/Form/Input';
import { Flex, Button, Stack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';


type SignInFormData = {
  email: string;
  password: string;

}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;
  console.log(errors)

  /*  function handleSingIn(values: any){
     console.log(values)
   } */

  const handleSingIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth="360px"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSingIn)}
      >
        <Stack spacing={4}>

          <Input
            label="Email"
            type="email"
            error={errors.email}
            {...register('email')}
          />
          <Input

            label="Senha"
            type="password"
            error={errors.password}
            {...register('password')}
          />


        </Stack>
        <Button
          type='submit'
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex >
  )

}

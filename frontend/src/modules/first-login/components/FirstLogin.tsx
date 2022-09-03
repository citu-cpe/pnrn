import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { UserDTO } from 'generated-api';
import { useRouter } from 'next/router';
import { useToast } from '../../../shared/hooks';
import { useGlobalStore } from '../../../shared/stores';
import { useLogout } from '../../index/hooks/useLogout';
import { ChangePasswordForm } from '../../settings/components/ChangePasswordForm';

export const FirstLogin = () => {
  const { getUser, setUser } = useGlobalStore();
  const logout = useLogout().mutate;
  const router = useRouter();
  const toast = useToast();

  const handleComplete = (userDTO: UserDTO) => {
    setUser(userDTO);

    toast({ title: 'Password changed successfully' });

    router.push('/');
  };

  return (
    <Flex
      direction='column'
      h='100vh'
      alignItems='stretch'
      justifyContent='center'
      gap={3}
      w='full'
      maxW='md'
      mx='auto'
      textAlign='center'
    >
      <Button
        onClick={() => logout()}
        position='absolute'
        top={4}
        left={4}
        color='current'
      >
        Logout
      </Button>

      <Heading as='h1'>Welcome {getUser()?.name}!</Heading>
      <Text mb={6}>Please change the your default password.</Text>
      <ChangePasswordForm onComplete={handleComplete} />
    </Flex>
  );
};

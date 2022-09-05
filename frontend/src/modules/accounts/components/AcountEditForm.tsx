import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Spacer,
  Checkbox as ChakraCheckbox,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { RegisterUserDTORolesEnum, UserDTO } from 'generated-api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { FormikResetEffect, Input } from '../../../shared/components/form';
import { useToast } from '../../../shared/hooks';
import { nameValidator } from '../../../shared/schemas';
import { useEdit } from '../hooks/useEdit';

interface AccountEditFormProps {
  initialUser: UserDTO;
  onComplete?: (userDTO: UserDTO) => void;
}

export const AccountEditForm = ({
  initialUser,
  onComplete,
}: AccountEditFormProps) => {
  const router = useRouter();
  const toast = useToast();
  const mutation = useEdit();

  const initialValues = {
    ...initialUser,
  };

  const validationSchema = Yup.object({
    name: nameValidator,
    roles: Yup.array()
      .min(1, 'Must include at least one role')
      .required('Required'),
  });

  const onSubmit = (userDTO: UserDTO) => {
    if (initialUser.name === userDTO.name) {
      toast({ title: 'No account changes', status: 'info' });
      router.push('/accounts');
    }

    mutation.mutate(userDTO);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      if (onComplete) {
        onComplete(mutation.data.data);
      }

      toast({ title: 'Edited account successfully' });
      router.push('/accounts');
    }
  }, [mutation, onComplete, toast, router]);

  /**
   * basic resetForm() function from `Formik` library
   * does not reset the values of all Field members of a Field group,
   * so we need to extend the reset functionality
   */
  const handleReset = () => {
    const checkboxIds = ['admin-role', 'staff-role', 'organizer-role'];

    checkboxIds.map((id) => {
      const checkbox = window.document.getElementById(
        `${id}`
      ) as HTMLInputElement | null;

      if (checkbox?.checked) {
        checkbox.click();
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form noValidate>
          <FormikResetEffect
            dependencies={[mutation]}
            condition={mutation.isError}
          />
          <FormikResetEffect
            dependencies={[mutation]}
            condition={mutation.isError}
            onReset={handleReset}
          />
          <Box mb='4'>
            <Field name='email' type='email' isReadOnly>
              {(fieldProps: FieldProps<string, UserDTO>) => (
                <Input
                  fieldProps={fieldProps}
                  name='email'
                  label='Email'
                  type='email'
                  id='email'
                  isReadOnly
                />
              )}
            </Field>
            <Flex as={FormControl} isRequired role='group' direction='column'>
              <FormLabel fontWeight='semibold'>Roles</FormLabel>
              <Flex direction='column'>
                <Field
                  name='roles'
                  type='checkbox'
                  value={RegisterUserDTORolesEnum.Admin}
                >
                  {(fieldProps: FieldProps<string, UserDTO>) => (
                    <Input
                      as={ChakraCheckbox}
                      fieldProps={fieldProps}
                      name='roles'
                      type='checkbox'
                      id='admin-role'
                    >
                      {fieldProps.field.value}
                    </Input>
                  )}
                </Field>
                <Field
                  name='roles'
                  type='checkbox'
                  value={RegisterUserDTORolesEnum.Staff}
                >
                  {(fieldProps: FieldProps<string, UserDTO>) => (
                    <Input
                      as={ChakraCheckbox}
                      fieldProps={fieldProps}
                      name='roles'
                      type='checkbox'
                      id='staff-role'
                    >
                      {fieldProps.field.value}
                    </Input>
                  )}
                </Field>
                <Field
                  name='roles'
                  type='checkbox'
                  value={RegisterUserDTORolesEnum.Organizer}
                >
                  {(fieldProps: FieldProps<string, UserDTO>) => (
                    <Input
                      as={ChakraCheckbox}
                      fieldProps={fieldProps}
                      name='roles'
                      type='checkbox'
                      id='organizer-role'
                    >
                      {fieldProps.field.value}
                    </Input>
                  )}
                </Field>
              </Flex>
            </Flex>
            <Field name='name' type='name'>
              {(fieldProps: FieldProps<string, UserDTO>) => (
                <Input
                  fieldProps={fieldProps}
                  name='name'
                  label='Name'
                  type='name'
                  id='name'
                />
              )}
            </Field>
          </Box>
          <Flex w='full' h='full'>
            <Button type='reset'>Clear Inputs</Button>
            <Spacer />
            <Button
              variant='solid'
              data-cy='edit-submit-btn'
              formNoValidate
              type='submit'
              isLoading={mutation.isLoading}
              loadingText='Editing...'
            >
              Edit Account
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
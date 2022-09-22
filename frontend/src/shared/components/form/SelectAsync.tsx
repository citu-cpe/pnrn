import {
  ChakraProps,
  Flex,
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  useToken,
} from '@chakra-ui/react';
import { FieldProps } from 'formik';
import { GroupBase, StylesConfig, Theme } from 'react-select';
import ReactSelectAsync, { AsyncProps } from 'react-select/async';
import { ErrorTooltip } from './ErrorTooltip';

interface CustomSelectAsyncProps {
  label?: string;
  tooltipLabel?: string;
  fieldProps: FieldProps;
  formLabelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
}

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    label?: string;
    tooltipLabel?: string;
    fieldProps?: FieldProps;
    formLabelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
  }
}

const SelectAsync = <
  OptionType,
  IsMulti extends boolean = true,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  fieldProps,
  label,
  tooltipLabel,
  formLabelProps,
  formControlProps,
  ...props
}: AsyncProps<OptionType, IsMulti, GroupType> & CustomSelectAsyncProps) => {
  const [
    selectedColor,
    hoverColor,
    foreground,
    neutral2,
    current,
    gray50,
    gray100,
    gray200,
    gray300,
    gray400,
    gray500,
    gray600,
    gray700,
    gray800,
    gray900,
  ] = useToken('colors', [
    'activeColor',
    'activeBg',
    'foreground',
    'neutral2',
    'current',
    'gray.50',
    'gray.100',
    'gray.200',
    'gray.300',
    'gray.400',
    'gray.500',
    'gray.600',
    'gray.700',
    'gray.800',
    'gray.900',
  ]);
  const [borderRadius] = useToken('radii', ['md']);

  const customStyles: StylesConfig<OptionType, IsMulti, GroupType> = {
    control: (base) => ({
      ...base,
      borderRadius: borderRadius,
      borderColor: '0px',
    }),
    container: (base) => ({
      ...base,
      width: '100%',
      backgroundColor: neutral2,
      borderRadius: borderRadius,
    }),
    valueContainer: (base) => ({
      ...base,
      backgroundColor: neutral2,

      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      transition: 'all linear 150ms',
      paddingLeft: '1rem',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      backgroundColor: neutral2,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: neutral2,
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: current,
    }),
    clearIndicator: (base) => ({
      ...base,
      color: current,
    }),
    loadingIndicator: (base) => ({
      ...base,
      color: current,
    }),
    placeholder: (base) => ({
      ...base,
      color: gray500,
    }),
    singleValue: (base) => ({
      ...base,
      color: current,
    }),
    option: (base, { isDisabled, isFocused, isSelected }) => {
      return {
        ...base,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? selectedColor
          : isFocused
          ? hoverColor
          : undefined,
      };
    },
  };

  const customTheme = (theme: Theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      // primary: brand500,
      // primary75: 'black',
      // primary50: 'black',
      // primary25: 'black',
      // danger: 'black',
      // dangerLight: 'black',
      neutral0: foreground,
      neutral5: gray50,
      neutral10: gray100,
      neutral20: gray200,
      neutral30: gray300,
      neutral40: gray400,
      neutral50: gray500,
      neutral60: gray600,
      neutral70: gray700,
      neutral80: gray800,
      neutral90: gray900,
    },
  });

  return (
    <>
      <FormControl
        as={Flex}
        justifyContent='center'
        alignItems='center'
        isInvalid={
          !!fieldProps?.form.errors[fieldProps?.field.name!] &&
          !!fieldProps?.form.touched[fieldProps?.field.name!]
        }
        isRequired={formControlProps?.isRequired}
      >
        {!!label && (
          <FormLabel
            htmlFor={formControlProps?.id}
            fontWeight='semibold'
            minW={20}
            m={0}
            p={0}
            pr={5}
            textAlign='right'
            {...formLabelProps}
          >
            {label}
          </FormLabel>
        )}

        <ErrorTooltip
          error={fieldProps?.form.errors[fieldProps?.field.name!]?.toString()}
          isInvalid={
            !!fieldProps?.form.errors[fieldProps?.field.name!] &&
            !!fieldProps?.form.touched[fieldProps?.field.name!]
          }
        >
          <Flex w='full' justifyContent='stretch' alignItems='stretch'>
            <ReactSelectAsync
              isSearchable
              name={fieldProps?.field.name}
              onBlur={fieldProps?.field.onBlur}
              styles={customStyles}
              theme={customTheme}
              {...props}
            />
          </Flex>
        </ErrorTooltip>
      </FormControl>
    </>
  );
};

export default SelectAsync;

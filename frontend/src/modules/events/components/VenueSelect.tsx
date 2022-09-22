import { FieldProps, Field } from 'formik';
import { EventCreateDTO } from 'generated-api';
import { useContext, useRef, useEffect } from 'react';
import { useMutation } from 'react-query';
import { MultiValue } from 'react-select';
import SelectAsync from '../../../shared/components/form/SelectAsync';
import { filterOptions } from '../../../shared/helpers/filter-options';
import { isOption } from '../../../shared/helpers/is-option';
import { ApiContext } from '../../../shared/providers/ApiProvider';
import { Option } from '../../../shared/types';
import { formLabelProps, requiredControlProp } from './EventAddForm';

export const VenueSelect = () => {
  const api = useContext(ApiContext);
  const venueOptions = useRef<Option[]>([]);

  useEffect(() => {
    fetchVenue.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVenue = useMutation(() => api.getVenues(), {
    onSuccess: (data) => {
      venueOptions.current = data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        } as Option;
      });
    },
  });

  /**
   * Options that allow for async/promise fetching
   * (but currently, just a simple filtering because we fetch our data on first render)
   */
  const promiseOptions = (inputValue: string) =>
    new Promise<Option[]>((resolve) => {
      resolve(filterOptions(inputValue, venueOptions.current));
    });

  const handleChange = (
    newValue: MultiValue<string | Option>,
    fieldProps: FieldProps
  ) => {
    if (newValue === null || undefined) {
      // replace `null` and `undefined` with empty string for Yup validation
      fieldProps.form.setFieldValue(fieldProps.field.name, '');
      return;
    }

    const formattedNewValues = newValue.map((item: Option | string) => {
      if (!!item && isOption(item)) {
        return item.value;
      }

      return item;
    });

    fieldProps.form.setFieldValue(fieldProps.field.name, formattedNewValues);
  };

  const getFieldValue = (fieldProps: FieldProps) => {
    return venueOptions.current
      ? venueOptions.current.find(
          (option) => option.value === fieldProps.field.value
        )
      : '';
  };

  return (
    <Field name='venueIds' id='venueIds' data-cy='venue-select' isRequired>
      {(fieldProps: FieldProps<string, EventCreateDTO>) => (
        <SelectAsync
          name='venueIds'
          label='Venues'
          id='venueIds'
          placeholder='Search...'
          data-cy='venue-select'
          formControlProps={requiredControlProp}
          formLabelProps={formLabelProps}
          fieldProps={fieldProps}
          cacheOptions
          isMulti
          isClearable
          closeMenuOnSelect={false}
          defaultOptions={venueOptions.current}
          loadOptions={promiseOptions}
          isLoading={fetchVenue.isLoading}
          onChange={(newValue: MultiValue<string | Option>) =>
            handleChange(newValue, fieldProps)
          }
          value={getFieldValue(fieldProps)}
        />
      )}
    </Field>
  );
};

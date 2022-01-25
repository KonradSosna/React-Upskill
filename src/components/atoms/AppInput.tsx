import React from 'react';

import { TextField } from '@mui/material';

export default function AppInput(props: {
  field: {
    value: string;
    label: string;
    valid: boolean;
    validationMessage: string;
    type: 'text';
  };
  onFieldChange: ({ value, key }: { value: string; key: string }) => void;
}) {
  //   const [valid, setValid] = useState(true);
  //   const [value, setValue] = useState<string>(props.initialValue || '');

  //   const handleChange = (e: any) => setValue(e.target.value);

  //   useEffect(() => {
  //     if (props.validator) {
  //       setValid(props.validator.validate(value));
  //     }
  //   }, [value, props.validator]);

  function handleChange({ value, key }: { value: string; key: string }) {
    props.onFieldChange({ value, key });
  }

  return (
    <TextField
      value={props.field.value}
      label={props.field.label}
      variant="standard"
      onChange={(e) =>
        handleChange({ value: e.target.value, key: props.field.label })
      }
      fullWidth
      helperText={!props.field.valid ? props.field.validationMessage : ''}
      error={!props.field.valid}
      type={props.field.type}
    />
  );
}

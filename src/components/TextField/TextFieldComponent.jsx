'use client';
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: 'rgba(57, 57, 55, 1)',
    border: '1px solid',
    borderColor: 'rgba(57, 57, 55, 1)',
    fontSize: 16,
    color: 'white',
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
}));

const TextFieldComponent = ({ value, ...props }) => {
  return <CustomInput value={value} {...props} />;
};

export default TextFieldComponent;

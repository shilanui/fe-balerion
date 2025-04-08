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
    backgroundColor: '#f5f5f5',
    border: '1px solid',
    borderColor: '#f5f5f5',
    fontSize: 11,
    color: 'black',
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
  '& .MuiInputBase-input::placeholder': {
    color: 'black', // or any color like '#aaa'
    opacity: 1, // optional, ensures it's visible
  },
}));

const TextAreaComponent = ({ value, ...props }) => {
  return <CustomInput value={value} {...props} />;
};

export default TextAreaComponent;

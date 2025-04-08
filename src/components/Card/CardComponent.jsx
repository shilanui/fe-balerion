'use client';
import { Card } from '@mui/material';

const CardComponent = ({ children, ...props }) => {
  return <Card {...props}>{children}</Card>;
};

export default CardComponent;

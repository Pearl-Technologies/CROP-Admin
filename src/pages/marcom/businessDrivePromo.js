import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345, margin:"5px" }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/images/businessDrive.png"
        title="green iguana"
      />
    </Card>
  );
}
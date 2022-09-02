import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler } from "react";

interface CardReservationProps {
  clientName: string;
  hotel: string;
  adults_count: number;
  child_count: number;
  inf_count: number;
  entry_date: string;
  exit_date: string;
  bedroom_type: string;
  pendient: boolean;
  denayPendientChange: MouseEventHandler;
}

const CardReservation: React.FC<CardReservationProps> = ({
  clientName,
  hotel,
  adults_count,
  child_count,
  inf_count,
  entry_date,
  exit_date,
  bedroom_type,
  pendient,
  denayPendientChange,
}) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardHeader title={clientName} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant='h6'>{hotel}</Typography>
        <Typography variant='h6'>Adultos: {adults_count}</Typography>
        <Typography variant='h6'>Niños: {child_count}</Typography>
        <Typography variant='h6'>Infantes: {inf_count}</Typography>
        <Typography variant='h6'>Entrada: {entry_date}</Typography>
        <Typography variant='h6'>Salida: {exit_date}</Typography>
        <Typography variant='h6'>
          Habitaciones {bedroom_type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Editar</Button>
        {pendient ? (
          <Button onClick={denayPendientChange} size='small'>
            Denegada
          </Button>
        ) : (
          <Button onClick={denayPendientChange} size='small'>
            Pendiente
          </Button>
        )}
        <Button size='small'>Con Voucher</Button>
      </CardActions>
    </Card>
  );
};

export default CardReservation;

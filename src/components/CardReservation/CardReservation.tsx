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
  voucher: boolean;
  payed?: boolean;
  send_not_payed?: boolean;
  denayPendientChange?: MouseEventHandler;
  voucherChange?: MouseEventHandler;
  deleteChange?: MouseEventHandler;
  notPayedChange?: MouseEventHandler;
  payedChange?: MouseEventHandler;
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
  voucher,
  payed,
  send_not_payed,
  denayPendientChange,
  voucherChange,
  deleteChange,
  notPayedChange,
  payedChange,
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
        {voucher ? (
          send_not_payed ? (
            <>
              <Button size='small' onClick={payedChange}>
                Pagado
              </Button>
            </>
          ) : payed ? (
            <>
              <Button size='small' onClick={deleteChange}>
                Eliminar
              </Button>
            </>
          ) : (
            <>
              <Button size='small' onClick={notPayedChange}>
                Sin Pago
              </Button>
              <Button size='small' onClick={payedChange}>
                Pagado
              </Button>
            </>
          )
        ) : pendient ? (
          <>
            <Button onClick={denayPendientChange} size='small'>
              Denegada
            </Button>
            <Button size='small' onClick={voucherChange}>
              Voucher
            </Button>
            <Button size='small' onClick={deleteChange}>
              Eliminar
            </Button>
          </>
        ) : (
          <>
            <Button size='small'>Editar</Button>
            <Button onClick={denayPendientChange} size='small'>
              Pendiente
            </Button>
            <Button size='small' onClick={deleteChange}>
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CardReservation;

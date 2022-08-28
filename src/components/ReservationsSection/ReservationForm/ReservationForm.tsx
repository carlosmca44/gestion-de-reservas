import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormControl } from "./styles";
import {
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

const ReservationForm: React.FC = () => {
  const navigate = useNavigate();

  //Client name
  const [name, setName] = useState("");
  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  //Hotel
  const [hotel, setHotel] = useState("");
  const handleChangeHotel = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHotel(event.target.value);
  };

  //Adults
  const [adults, setAdults] = useState("2");
  const handleChangeAdults = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdults(event.target.value);
  };

  //Childs
  const [childs, setChilds] = useState("0");
  const handleChangeChilds = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChilds(event.target.value);
  };

  //Infants
  const [infants, setInfants] = useState("0");
  const handleChangeInfants = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInfants(event.target.value);
  };

  //Double rooms
  const [dRooms, setDRooms] = useState("1");
  const handleChangeDRooms = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDRooms(event.target.value);
  };

  //Simple rooms
  const [sRooms, setSRooms] = useState("0");
  const handleChangeSRooms = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSRooms(event.target.value);
  };

  //Triple rooms
  const [tRooms, setTRooms] = useState("0");
  const handleChangeTRooms = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTRooms(event.target.value);
  };

  //entry date
  const [entryDateValue, setEntryDateValue] =
    React.useState<Date | null>(new Date("2022-08-18T21:11:54"));

  const handleEntryDataPicker = (newValue: Date | null) => {
    setEntryDateValue(newValue);
  };

  //exit date
  const [exitDateValue, setExitDateValue] =
    React.useState<Date | null>(new Date("2022-08-18T21:11:54"));

  const handleExitDataPicker = (newValue: Date | null) => {
    setExitDateValue(newValue);
  };

  //Set a new reservation
  const postNewReservation = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:4000/reservations/new", {
      method: "POST",
      body: JSON.stringify({
        client_name: name,
        hotel: hotel,
        adults_count: adults,
        child_count: childs,
        inf_count: infants,
        duble_rooms: dRooms,
        simple_rooms: sRooms,
        triple_rooms: tRooms,
        entry_date: entryDateValue,
        exit_date: exitDateValue,
      }),
      headers: { "Content-Type": "application/json" },
    });
    navigate("/reservations");
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      mt={2}
    >
      <Typography variant='h4'>
        {"Crear nueva reservación"}
      </Typography>
      <form method='POST' onSubmit={postNewReservation}>
        <Box display='flex' flexDirection='column' pt={1} gap={2}>
          <FormControl>
            <TextField
              id='outlined-basic'
              label='Nombre del cliente'
              variant='outlined'
              value={name}
              onChange={handleChangeName}
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              id='outlined-basic'
              label='Hotel'
              variant='outlined'
              value={hotel}
              onChange={handleChangeHotel}
              required
            />
          </FormControl>
          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            gap={1}
          >
            <FormControl>
              <TextField
                type='number'
                defaultValue={2}
                id='outlined-basic'
                label='Cantidad de adultos'
                variant='outlined'
                value={adults}
                onChange={handleChangeAdults}
              />
            </FormControl>
            <FormControl>
              <TextField
                type='number'
                defaultValue={0}
                id='outlined-basic'
                label='Cantidad de niños (-12 años)'
                variant='outlined'
                value={childs}
                onChange={handleChangeChilds}
              />
            </FormControl>
            <FormControl>
              <TextField
                type='number'
                defaultValue={0}
                id='outlined-basic'
                label='Cantidad de infantes (-2 años)'
                variant='outlined'
                value={infants}
                onChange={handleChangeInfants}
              />
            </FormControl>
          </Box>
          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            gap={1}
          >
            <FormControl>
              <TextField
                type='number'
                defaultValue={1}
                id='outlined-basic'
                label='Habitaciones doble'
                variant='outlined'
                value={dRooms}
                onChange={handleChangeDRooms}
              />
            </FormControl>
            <FormControl>
              <TextField
                type='number'
                defaultValue={0}
                id='outlined-basic'
                label='Habitaciones simples'
                variant='outlined'
                value={sRooms}
                onChange={handleChangeSRooms}
              />
            </FormControl>
            <FormControl>
              <TextField
                type='number'
                defaultValue={0}
                id='outlined-basic'
                label='Habitaciones triples'
                variant='outlined'
                value={tRooms}
                onChange={handleChangeTRooms}
              />
            </FormControl>
          </Box>
          <Box
            display='flex'
            flexDirection={{ xs: "column", md: "row" }}
            alignItems='space-between'
            gap={2}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label='Fecha de entrada'
                inputFormat='dd/MM/yyyy'
                value={entryDateValue}
                onChange={handleEntryDataPicker}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label='Fecha de salida'
                inputFormat='dd/MM/yyyy'
                value={exitDateValue}
                onChange={handleExitDataPicker}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Button onClick={() => navigate("/reservations")}>
          Cancelar
        </Button>
        <Button type='submit'>Aceptar</Button>
      </form>
    </Box>
  );
};

export default ReservationForm;

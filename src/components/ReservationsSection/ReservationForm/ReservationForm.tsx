import {
  Box,
  Fab,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { TransitionProps } from "@mui/material/transitions";
import { FormControl } from "./styles";
import {
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ReservationForm: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <Box>
      <Fab
        onClick={handleClickOpen}
        color='primary'
        aria-label='add'
        sx={{
          position: "fixed",
          bottom: 40,
          right: 40,
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{"Crear nueva reservación"}</DialogTitle>
        <DialogContent>
          <Box display='flex' pt={2} gap={2} flexWrap='wrap'>
            <FormControl>
              <TextField
                id='outlined-basic'
                label='Nombre del cliente'
                variant='outlined'
              />
            </FormControl>
            <FormControl>
              <TextField
                id='outlined-basic'
                label='Hotel'
                variant='outlined'
              />
            </FormControl>
            <Box
              display='flex'
              flexDirection={{ xs: "column", md: "row" }}
              gap={1}
            >
              <TextField
                type='number'
                defaultValue={2}
                id='outlined-basic'
                label='Cantidad de adultos'
                variant='outlined'
              />

              <TextField
                type='number'
                defaultValue={0}
                id='outlined-basic'
                label='Cantidad de niños (-12 años)'
                variant='outlined'
              />

              <TextField
                type='number'
                defaultValue={0}
                id='outlined-basic'
                label='Cantidad de infantes (-2 años)'
                variant='outlined'
              />
            </Box>
            <Box
              display='flex'
              flexDirection={{ xs: "column", md: "row" }}
              gap={1}
            >
              <TextField
                type='number'
                defaultValue={1}
                id='outlined-basic'
                label='Habitaciones doble'
                variant='outlined'
              />

              <TextField
                type='number'
                defaultValue={0}
                id='outlined-basic'
                label='Habitaciones simples'
                variant='outlined'
              />

              <TextField
                type='number'
                defaultValue={0}
                id='outlined-basic'
                label='Habitaciones triples'
                variant='outlined'
              />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReservationForm;

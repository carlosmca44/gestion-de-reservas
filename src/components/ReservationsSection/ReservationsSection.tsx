import { Box, Fab, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import useFetch from "../../hooks/useFetch";
import CardReservation from "../CardReservation/CardReservation";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ReservationsSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const { data: pendient } = useFetch(
    "http://localhost:4000/reservations/pendient",
    "GET"
  );

  const { data: denay } = useFetch(
    "http://localhost:4000/reservations/denay",
    "GET"
  );

  return (
    <Box sx={{ width: "100%" }} mt={2}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Pendientes' {...a11yProps(0)} />
          <Tab label='Denegadas' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box display='flex' gap={3} flexWrap='wrap'>
          {pendient.map((item) => {
            return (
              <CardReservation
                key={item["client_name"]}
                clientName={item["client_name"]}
                hotel={item["hotel"]}
                adults_count={item["adults_count"]}
                child_count={item["child_count"]}
                inf_count={item["inf_count"]}
                entry_date={item["entry_date"]}
                exit_date={item["exit_date"]}
                bedroom_type={item["bedroom_type"]}
                denayPendient={true}
              />
            );
          })}
          <Link to={"/reservations/new"}>
            <Fab
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
          </Link>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box display='flex' gap={3} flexWrap='wrap'>
          {denay.map((item) => {
            return (
              <CardReservation
                key={item["client_name"]}
                clientName={item["client_name"]}
                hotel={item["hotel"]}
                adults_count={item["adults_count"]}
                child_count={item["child_count"]}
                inf_count={item["inf_count"]}
                entry_date={item["entry_date"]}
                exit_date={item["exit_date"]}
                bedroom_type={item["bedroom_type"]}
                denayPendient={true}
              />
            );
          })}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default ReservationsSection;

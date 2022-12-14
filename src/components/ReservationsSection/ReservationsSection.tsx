import { Box, Fab, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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

  const [pendients, setPendients] = useState([]);
  const [denay, setDenay] = useState([]);

  const fetchPendients = async () => {
    const response = await fetch(
      "http://localhost:4000/reservations/pendient"
    );
    const data = await response.json();
    setPendients(data);
  };

  const fetchDenay = async () => {
    const response = await fetch(
      "http://localhost:4000/reservations/denay"
    );
    const data = await response.json();
    setDenay(data);
  };

  useEffect(() => {
    fetchPendients();
    fetchDenay();
  }, []);

  const handleChangePendietDenay = async (id: string) => {
    await fetch("http://localhost:4000/reservations/toDenay", {
      method: "PATCH",
      body: JSON.stringify({ client_name: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchPendients();
    fetchDenay();
  };

  const handleChangeVoucher = async (id: string) => {
    await fetch("http://localhost:4000/reservations/voucher", {
      method: "PATCH",
      body: JSON.stringify({ client_name: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchPendients();
    fetchDenay();
  };

  const handleDelete = async (id: string) => {
    await fetch("http://localhost:4000/reservations", {
      method: "DELETE",
      body: JSON.stringify({ client_name: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchPendients();
    fetchDenay();
  };

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
          {pendients.map((item) => {
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
                pendient={item["pendient"]}
                voucher={item["voucher"]}
                denayPendientChange={() =>
                  handleChangePendietDenay(item["client_name"])
                }
                voucherChange={() =>
                  handleChangeVoucher(item["client_name"])
                }
                deleteChange={() => {
                  handleDelete(item["client_name"]);
                }}
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
                pendient={item["pendient"]}
                voucher={item["voucher"]}
                denayPendientChange={() =>
                  handleChangePendietDenay(item["client_name"])
                }
                deleteChange={() => {
                  handleDelete(item["client_name"]);
                }}
              />
            );
          })}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default ReservationsSection;

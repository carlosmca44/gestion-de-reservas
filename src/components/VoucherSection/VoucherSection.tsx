import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardReservation from "../CardReservation/CardReservation";

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

const VoucherSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const [voucher, setVoucher] = useState([]);
  const [sendNotPayed, setSendNotPayed] = useState([]);
  const [payed, setPayed] = useState([]);
  const [canceled, setCanceled] = useState([]);

  const fetchVoucherDone = async () => {
    const response = await fetch(
      "http://localhost:4000/voucher/done"
    );
    const data = await response.json();
    setVoucher(data);
  };

  const fetchSendNotPayed = async () => {
    const response = await fetch(
      "http://localhost:4000/voucher/notPayed"
    );
    const data = await response.json();
    setSendNotPayed(data);
  };

  const fetchPayed = async () => {
    const response = await fetch(
      "http://localhost:4000/voucher/payed"
    );
    const data = await response.json();
    setPayed(data);
  };

  const fetchCanceled = async () => {
    const response = await fetch(
      "http://localhost:4000/voucher/canceled"
    );
    const data = await response.json();
    setCanceled(data);
  };

  useEffect(() => {
    fetchVoucherDone();
    fetchSendNotPayed();
    fetchPayed();
    fetchCanceled();
  }, []);

  const handleChangeSendNotPayed = async (id: string) => {
    await fetch("http://localhost:4000/voucher/notPayed", {
      method: "PATCH",
      body: JSON.stringify({ client_name: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchVoucherDone();
    fetchSendNotPayed();
    fetchPayed();
  };

  const handleChangePayed = async (id: string) => {
    await fetch("http://localhost:4000/voucher/payed", {
      method: "PATCH",
      body: JSON.stringify({ client_name: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchVoucherDone();
    fetchSendNotPayed();
    fetchPayed();
  };

  const handleChangeCanceled = async (id: string) => {
    await fetch("http://localhost:4000/voucher/canceled", {
      method: "PATCH",
      body: JSON.stringify({ client_name: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchSendNotPayed();
    fetchCanceled();
  };

  const handleDelete = async (id: string) => {
    await fetch("http://localhost:4000/reservations", {
      method: "DELETE",
      body: JSON.stringify({ client_name: id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchPayed();
  };

  return (
    <Box sx={{ width: "100%" }} mt={2}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Listos' {...a11yProps(0)} />
          <Tab label='Pendientes a pago' {...a11yProps(1)} />
          <Tab label='Pagados' {...a11yProps(2)} />
          <Tab label='Cancelados' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box display='flex' gap={3} flexWrap='wrap'>
          {voucher.map((item) => {
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
                notPayedChange={() =>
                  handleChangeSendNotPayed(item["client_name"])
                }
                payedChange={() =>
                  handleChangePayed(item["client_name"])
                }
                canceledChange={() => handleChangeCanceled}
              />
            );
          })}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box display='flex' gap={3} flexWrap='wrap'>
          {sendNotPayed.map((item) => {
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
                send_not_payed={item["send_not_payed"]}
                payedChange={() =>
                  handleChangePayed(item["client_name"])
                }
                canceledChange={() =>
                  handleChangeCanceled(item["client_name"])
                }
              />
            );
          })}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box display='flex' gap={3} flexWrap='wrap'>
          {payed.map((item) => {
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
                payed={item["payed"]}
                send_not_payed={item["send_not_payed"]}
                deleteChange={() => handleDelete(item["client_name"])}
              />
            );
          })}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box display='flex' gap={3} flexWrap='wrap'>
          {canceled.map((item) => {
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
                payed={item["payed"]}
                send_not_payed={item["send_not_payed"]}
                canceled={item["canceled"]}
                deleteChange={() => handleDelete(item["client_name"])}
              />
            );
          })}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default VoucherSection;

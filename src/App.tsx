import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import OffertsSection from "./components/OffertsSection/OffertsSection";
import ProfitsSection from "./components/ProfitsSection/ProfitsSection";
import ReservationsSection from "./components/ReservationsSection/ReservationsSection";
import VoucherSection from "./components/VoucherSection/VoucherSection";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<OffertsSection />} />
          <Route
            path='/reservations'
            element={<ReservationsSection />}
          />
          <Route path='/voucher' element={<VoucherSection />} />
          <Route path='/profits' element={<ProfitsSection />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

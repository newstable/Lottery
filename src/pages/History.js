import React from "react";

import Header from "../components/Header";
import BuyTicket from "../components/History";
import Footer from "../components/Footer";
import "./myTickets.css";

const History = () => {
    return (
        <div className="back-3">
            <Header />
            <BuyTicket />
            <Footer />
        </div>
    )
}

export default History;
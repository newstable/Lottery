import React from "react";

import Header from "../components/Header";
import Tickets from "../components/Tickets";
import Footer from "../components/Footer";
import "./myTickets.css";
import "./home.css";

const MyTickets = () => {
    return (
        <div>
            <Header />
            <Tickets />
            <Footer />
        </div>
    )
}

export default MyTickets;
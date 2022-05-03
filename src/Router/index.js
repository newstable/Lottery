import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import MyTickets from "../pages/MyTickets";
import History from "../pages/History";
import Rules from "../pages/Rules";

const Routers = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/mytickets" component={MyTickets}></Route>
                <Route exact path="/history" component={History}></Route>
                <Route exact path="/rules" component={Rules}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routers;
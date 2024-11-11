import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "../components/Home/Home";
import Login from "../components/Login/Login"

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component = { Login }  path="/" exact />
            <Route component = { Home }  path="/home" />
        </BrowserRouter>
    )
}

export default Routes;
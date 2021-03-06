import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import MainPage from  "./components/mainPage";
import Details from "./components/detailsComponent/Details"
import History from "./components/history"

export default ({ childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/main" exact component={MainPage} props={childProps} />
        <AppliedRoute path="/details" exact component={Details} props={childProps} />
        <AppliedRoute path="/history" exact component={History} props={childProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>;

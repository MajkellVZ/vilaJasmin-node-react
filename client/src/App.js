import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import Bookings from "./components/view/Bookings";
import RoomTypes from "./components/view/RoomTypes";
import PrivateRoute from "./components/routing/PrivateRoute";
import Rooms from "./components/view/Rooms";
import Home from "./components/view/Home";
//Redux
import {Provider} from 'react-redux';
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from './actions/auth';
import RoomType from "./components/view/RoomType";
import Media from "./components/media/Media";


if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Route exact path="/" component={Home}/>
                    <Alert/>
                    <Switch>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/room-types/:name" component={RoomType}/>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                        <PrivateRoute exact path="/bookings" component={Bookings}/>
                        <PrivateRoute exact path="/room-types" component={RoomTypes}/>
                        <PrivateRoute exact path="/rooms" component={Rooms}/>
                        <PrivateRoute exact path="/media/:name" component={Media}/>
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    )
};

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing'
import Mint from '../pages/Mint'
import Station from '../pages/Station'

export default function Main () {
    return (
        <Switch>
            <Route exact path='/' component={Landing}></Route>
            <Route exact path='/mint' component={Mint}></Route>
            <Route exact path='/station' component={Station}></Route>
        </Switch>
    );
}
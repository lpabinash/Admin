import React, { Component } from 'react'
import LatestHit from './LatestHit'
import Perfo from './Perfo'
import Storage from './Storage'
import NotificationList from './Notification'
import classes from './Dashboard.module.css'
import Order from './Order'

class Dashboard extends React.Component {
    render() {
        return (
            <div className={classes.dash}>
                <LatestHit/>
                <Perfo/>
                <Storage/>
                <NotificationList/>
                <Order/>
            </div>
        )
    }
}

export default Dashboard;

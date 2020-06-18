import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return  <header className={classes.header}>
        <div className={classes.logo}>
            <a href="/profile"><img src={"/logo.png"}/></a>
        </div>

        <div>MySocialNetwork</div>
    </header>
}
export default Header;
import React from 'react';
import classes from './Nav.module.css';
import {Link, NavLink} from "react-router-dom";





// панель с навигацией
const Nav = (props) => {
   return <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to="/profile/" activeClassName={classes.active}>Profile</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/news" activeClassName={classes.active}>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/music" activeClassName={classes.active}>Music</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/users" activeClassName={classes.active}>Find users</NavLink>
        </div>
       <div className={classes.item}>
           <NavLink to="/settings" activeClassName={classes.active}>Settings</NavLink>
       </div>
       <div className={classes.friendsMenu}>
                {/*<Friends usersPage={props.usersPage}/>*/}
       </div>

    </nav>
}

export default Nav;
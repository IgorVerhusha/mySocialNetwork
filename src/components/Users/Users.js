import React from "react";
import classes from "./Users.module.css";
import { NavLink } from "react-router-dom";
import Paginator from "./Paginator";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";


let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {

  return (
    <div>
     <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
     <div>
         {props.isFetching ?
             <Preloader /> :
             ( users.map((u) => (
       <User user={u}
              followingInProgress={props.followingInProgress}
              key={u.id}
              unfollow={props.unfollow}
              follow={props.follow}/>
      )))}
     </div>
    </div>
  );
};

export default Users;

import React from "react";
import Paginator from "./Paginator";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";


let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, setPaginatorPage, paginatorPage, ...props}) => {

  return (
    <div>
     <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} setPaginatorPage={setPaginatorPage} paginatorPage={paginatorPage}/>
     <div>
         {props.isFetching ?
             <Preloader /> :
             ( users.map((u) => (
       <User user={u}
              followingInProgress={props.followingInProgress}
              key={u.id}
              unfollow={props.unfollowThunk}
              follow={props.followThunk}/>
      )))}
     </div>
    </div>
  );
};

export default Users;

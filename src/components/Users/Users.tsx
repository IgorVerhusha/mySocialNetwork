import React from "react";
import Paginator from "./Paginator";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";
import {userType} from "../../Redux/types/types";

type Props = {
    totalUsersCount: number
    pageSize:number
    currentPage: number
    onPageChanged: (pageNumber:number)=> void
    paginatorPage:number
    setPaginatorPage: (pageNumber:number)=>void
    users: Array<userType>
    followingInProgress: Array<number>
    isFetching: boolean
    followThunk: (id:number)=>void
    unfollowThunk: (id:number)=>void
}


const Users: React.FC<Props> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, setPaginatorPage, paginatorPage, ...props}) => {

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

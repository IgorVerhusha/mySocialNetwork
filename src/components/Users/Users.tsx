import React, { useEffect } from "react";
import Paginator from "./Paginator";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";
import { UsersSearchForm } from "./UsersSearchForm";
import {
  actions,
  FilterType,
  followThunkCreator,
  getUsersThunkCreator,
  unfollowThunkCreator,
} from "../../Redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFilter,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getPaginatorPage,
  getTotalUsersCount,
  getUsers,
} from "../../Redux/users-selectors";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

const Users: React.FC = () => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const isFetching = useSelector(getIsFetching);
  const filter = useSelector(getFilter);
  const users = useSelector(getUsers);
  const followingInProgress = useSelector(getFollowingInProgress);
  const paginatorPage = useSelector(getPaginatorPage);

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1));
    let actualPage = currentPage;
    let actualFilter = filter;
    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };
    if (!!parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend: parsed.friend === "null" ? null : parsed.friend === "true",
      };

    dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
    dispatch(actions.setCurrentPage(actualPage));
  }, []);

  useEffect(() => {
    history.push({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    });
  }, [filter, currentPage]);


  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
    dispatch(actions.setCurrentPage(pageNumber));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter));
  };
  const followThunk = (id: number) => {
    dispatch(followThunkCreator(id));
  };
  const unfollowThunk = (id: number) => {
    dispatch(unfollowThunkCreator(id));
  };
  const setPaginatorPage = (pageNumber: number) => {
    dispatch(actions.setPaginatorPage(pageNumber));
  };


  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        setPaginatorPage={setPaginatorPage}
        paginatorPage={paginatorPage}
      />
      <div>
        {isFetching ? (
          <Preloader />
        ) : (
          users.map((u) => (
            <User
              user={u}
              followingInProgress={followingInProgress}
              key={u.id}
              unfollow={unfollowThunk}
              follow={followThunk}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Users;

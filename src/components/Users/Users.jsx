import React from "react";
import classes from "./Users.module.css"
import * as axios from 'axios'


class Users extends React.Component {

    componentDidMount() {

            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            });

    }

    onPageChanged(pageNumber) {

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        });

        this.props.setCurrentPage(pageNumber)
    }



    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];

        for (let i=1; i<=pagesCount; i++){
            pages.push(i);
        }

        return <div>
            <div className={classes.pagesCount}>
                {pages.map(p => {
                    return <span className={this.props.currentPage === p && classes.selectedPage} onClick={() => {this.onPageChanged(p)}}>{p}</span>
                   })}
            </div>
                      {
                this.props.users.map(u => <div key={u.id} className={classes.card}>
                    <div className={classes.picture}>
                        <div className={classes.avatar}>
                            <img src={u.photos.small != null ? u.photos.small : "https://cs16planet.ru/steam-avatars/images/avatar449.jpg"}></img>
                        </div>
                        <div>
                            {u.followed ? <button onClick={()=>this.props.unfollow(u.id)} >unfollow</button> : <button onClick={()=>this.props.follow(u.id)} >follow</button>}
                        </div>
                    </div>
                    <div>
                        <div className={classes.discription}>
                            <div>
                                {u.name}
                            </div>
                            <div>
                                {u.status}
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    }

}

export default Users
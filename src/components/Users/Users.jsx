import React from "react";
import classes from "./Users.module.css"
import * as axios from 'axios'

class Users extends React.Component {


    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            });
        }
    }

    render() {
        return <div>
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
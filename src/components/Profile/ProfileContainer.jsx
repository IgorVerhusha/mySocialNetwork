import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component{
    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId;
        if (!userId) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response => {
                if (response.data.resultCode === 0) {
                    let userId = response.data.data.id;
                    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
                        this.props.setUserProfile(response.data);
                    })
                }
                })
            } else {
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
                this.props.setUserProfile(response.data);
            })
        }
        }

        render()
        {
            return <Profile {...this.props} profile={this.props.profile}/>
        }
    }

    let
    mapStateToProps = (state) => ({profile: state.profilePage.profile, loginId: state.auth.id});


    let
    WithUrlDataContainerComponent = withRouter(ProfileContainer);

    export
    default

    connect(mapStateToProps, {setUserProfile})

(
    WithUrlDataContainerComponent
)
    ;

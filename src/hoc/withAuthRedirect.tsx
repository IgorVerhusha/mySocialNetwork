import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

type MapPropsType = { isAuth: boolean }
type DispatchPropsType = {
    fake: ()=> void
}
let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
}) as MapPropsType

export function withAuthRedirect <WCP>(WrappedComponent: React.ComponentType)  {
    function RedirectComponent(props: MapPropsType) {
        let {isAuth, ...restProps} = props;
        if (!props.isAuth) return <Redirect to={"/login"}/>;
        return < WrappedComponent {...restProps}/>;
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {fake: ()=>{}})(RedirectComponent)

  return ConnectedAuthRedirectComponent
};

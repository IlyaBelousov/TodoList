import {Dispatch} from "redux";
import {authAPI, LoginDataType} from "../api/auth-api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

const AuthReducerInitialState = {
    isLoggedIn: false
}
export type AuthReducerInitialStateType = typeof AuthReducerInitialState
export const authReducer = (state: AuthReducerInitialStateType = AuthReducerInitialState, action: AuthActionsType): AuthReducerInitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        }
        default:
            return state
    }
}

//actions
export const setLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        isLoggedIn
    }
}
export const logInAC =(isLoggedIn: boolean)=>{
    return {
        type:'login/LOG-IN',
        isLoggedIn
    }
}
export type AuthActionsType = ReturnType<typeof setLoggedInAC>|ReturnType<typeof setAppStatusAC>|ReturnType<typeof setAppErrorAC>


//thunk
export const SetIsLoggedInTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setLoggedInAC(true))
            }
        })
}
export const LoginTC = (loginData:LoginDataType) => (dispatch:Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logIn(loginData)
        .then(response=>{
            if(response.data.resultCode===0){
                 dispatch(setLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            }
            else {
                dispatch(setAppErrorAC(response.data.messages[0]))
            }
        })
}
export const LogOutTC = () => (dispatch:Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(response=>{
            if(response.data.resultCode===0){
                dispatch(setLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            }
            else {
                dispatch(setAppErrorAC(response.data.messages[0]))
            }
        })
}
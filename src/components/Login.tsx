import React, {useEffect} from 'react';
import {Button, Checkbox, FormControl, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel'
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {LoginTC, SetIsLoggedInTC} from "../state/auth-reducer";





export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch();
   useEffect(() => {
        dispatch(SetIsLoggedInTC())

     }, [])
    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            rememberMe:false,
        },
        onSubmit:values => {
            dispatch(LoginTC(values))
        }
    })
    if(isLoggedIn){
        return <Redirect to={'/Todolist'} />
    }
    return <Grid container justifyContent={'center'}>

        <Grid  item xs={4} justifyContent={'center'}>
            <h1 style={{display:'flex',justifyContent:'center'}}>Login</h1>
            <form style={{display:'flex',justifyContent:'center'}} onSubmit={formik.handleSubmit}>

                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <FormGroup>
                        <TextField
                            label={'Email'}
                            margin={'normal'}
                            name={'email'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextField
                            type={'password'}
                            label={'Password'}
                            margin={'normal'}
                            name={'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox
                                    onChange={formik.handleChange}
                                    checked={formik.values.rememberMe}
                                    name={'rememberMe'}
                                />
                            }

                        />
                        <Button type="submit"
                            variant={'outlined'}
                            color={"primary"}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>

    </Grid>
};


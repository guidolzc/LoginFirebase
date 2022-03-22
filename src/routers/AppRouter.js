import React, { useEffect } from 'react'
import { Routes, Route} from "react-router-dom";
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../auth/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import {login} from '../actions/auth'
import { useState } from 'react';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
//import { loadNotes } from '../helpers/loadNotes';
import {  startLoadingNotes } from '../actions/notes';
// import {setNotes} from '../actions/notes'
export const AppRouter = () => {


    // LOGEO REVISA SI A ENTRADO Y salida lee todo del firebase
    const dispatch = useDispatch();

    // SI ESTA AUTENTICADO MOSTRAR O ENTRAR A LA WEB que ya tengo TODO
    const [checking, setChecking] = useState(true);

    // ya esta autenticado
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth,async (user) =>{
            console.log(user);


            if(user?.uid){
                dispatch(login( user.uid , user.displayName ));

            // estoy autenticado? si  sinoo no
                 setIsLoggedIn(true);

            // ve las notas del usuario logueado por que aqui tiene q ser cuando se loguee el usuario
                   //const notes = await loadNotes(user.uid);
                    dispatch (startLoadingNotes(user.uid));

            } else {
                setIsLoggedIn(false);
            }

            // cuando aparesca en false o llegue hasta aqui es que ya tengo todos los datos de firebase
            setChecking(false);
        })
    }, [dispatch, setChecking,setIsLoggedIn])

    if(checking){
        return(
                <h1>Espera.....</h1>
        )
    }

    // link entrada y proteccion de direcciones 
    return (
        <Routes>
        <Route
            path="/*"
            element={
                <PublicRoute isAuth={isLoggedIn}>
                    <AuthRouter />
                </PublicRoute>
            }
        />

        <Route
            path="/"
            element={
                <PrivateRoute isAuth={isLoggedIn}>
                    <JournalScreen/>
                    
                </PrivateRoute>
            }
        />
        

    </Routes>
    
   
    )
}


import Swal from 'sweetalert2';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { googleAuthProvider, signInWithPopup, getAuth,} from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import { notesLogout } from './notes';
 
export const startLoginEmailPassword = (email,password) => {
  return (dispatch) => {
   
    // aqui comienza en true llamando y importando startloading y finishloading
    dispatch( startLoading() );
    //   setTimeout(() => {
    //       dispacht(login(123 , 'pedro'));
    //   }, 3500);

    // para ingresar al firebase  tener CUIDADO SI SE ACTUALIZA como hacer en el firebase
   
    const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
        .then(async({user})=>{
            dispatch(login(user.uid,user.displayName));
            console.log(user);
            dispatch(finishLoading());

             }).catch((e) => {
                console.log(e);

                dispatch(finishLoading());

                Swal.fire('Error', e.message,'error');
            });
            
  }
  
};

//crear un usuario en el firebase
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
 
        const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then( async({ user }) => {

                await updateProfile( user, { displayName: name });
               
                dispatch(
                    login(user.uid, user.displayName)
                    )
            console.log(user);
        })
        .catch(e =>{
            console.log(e ,'****');
            Swal.fire('Error', e.message,'error');
        })
    }
}

// crear una cuenta de google en firebase
export const startGoogleLogin = () => {
    return ( dispatch ) => {
 
        const auth = getAuth();
        signInWithPopup( auth, googleAuthProvider )
            .then( ({ user }) => {
                console.log( user.uid, user.displayName);
                dispatch(
                    login( user.uid, user.displayName )

                )
            })
 
    }
}



export const login = (uid,displayName) => 
( {
            type: types.login,
            payload: {
                uid,
                displayName
            }
  });


  export const startLogout = () =>{
      return async(dispatch) =>{
        const auth=getAuth();
        // entra a la base de firebase y signout ejecuta esto sino no es como promesa
       await signOut(auth);

       dispatch(logout())

       dispatch(notesLogout())
      }
  }

  export const logout = () =>({
    type: types.Logout
  })
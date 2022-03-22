import React from 'react'
import {Link } from 'react-router-dom' 
import { useForm } from '../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../actions/ui';
import { startRegisterWithEmailPasswordName } from '../actions/auth';


export const RegisterScreen = () => {

    // aqui pongo mi dispacht y lo importo  aqui mando al REDUX el error
    const dispatch = useDispatch ();

    // aqui llamaremos al stado para mostrar el error en el dom
    const {msgError} = useSelector(state => state.ui);
    console.log (msgError)

    

    const [formValues, handleInputChange] = useForm({
        name: 'rafael',
        email: 'rafael@gmail.com',
        password: '123456',
        password2:'123456'
    })

    const {name,email, password,password2  } = formValues;

    
    const handlRegister = (e)=> {
        e.preventDefault();
        console.log( name, email, password, password2 );
        if (isFormValid()){
        // console.log('Formulario correcto')
            dispatch(startRegisterWithEmailPasswordName(email,password,name));
        }
    }
   // console.log( name, email, password, password2 );

    const isFormValid = ()=> {

        // si nombre contar espacios es === a 0 entoces requiere nombre 
        if(name.trim().length ===0){
                // leo el error con dispatch de SETERROR a REDUX
            dispatch(setError('Name is required'))
            console.log('Name is required');
            return false;
        }
        // usamos un validador npm i invalidator instalamos en la terminal y importamos
        else if (!validator.isEmail(email)  ){
            dispatch(setError('esto no es un Email'))
            console.log('esto no es un Email');
            return false;
        
            // confirmamos si los password son diferente y si son menor 5 
      }else if (password !== password2 || password.length<5){
             dispatch(setError('Password should be at last 6 characters and match each other'))  
                console.log('Password should be at last 6 characters and match each other');
                return false
      }

      // aqui traigo mi mi error RemoveError con dispacht lo importo 
        dispatch(removeError());



        return true;

     }


    return (

        <>
        <h3 className="auth__title">Register</h3>
    <form onSubmit={ handlRegister }
     className= "animate__animated animate__fadeIn animate__faster">

        { msgError &&
        (<div className="auth__alert-error">
            {msgError}
            </div>)
        }

        {/* <input type="text" placeholder="email" name="email" className="auth__input" autocomplete="off"/> */}
        <input type="text" placeholder="Name" name="name" className="auth__input" autocomplete="off" value = { name } onChange={ handleInputChange }/>
        <input type="text" placeholder="Email" name="email" className="auth__input" autocomplete="off" value = { email } onChange={ handleInputChange }/>
         <input type="password" placeholder="Password" name="password" className="auth__input" value = { password }  onChange={ handleInputChange }/>
        <input type="password" placeholder="Confirm password2" name="password2" className="auth__input" value = { password2 } onChange={ handleInputChange }/>
        
            <br/>
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
      
       
           
   
  
        

    <Link to="/auth/login" className="link">Create New acoount</Link>

    </form>
    </>
    )
}

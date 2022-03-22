
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {startGoogleLogin, startLoginEmailPassword} from '../actions/auth';
import { useForm } from '../hooks/useForm';

export const LoginScreen = () => {
    // hacemos funcionar el dispatch para q agregue un email y password
    const dispatch = useDispatch ();

    const { loading } = useSelector(state=> state.ui)

    const [formValues, handleInputChange] = useForm({
        email: 'rafael@gmail.com',
        password: '123456'
    })


    const {email, password  } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(email,password);

    // aqui hacemos funcionar el dispatch agregando directamento a AUTH.JS EMAIL
        dispatch( startLoginEmailPassword (email, password))
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
        <form onSubmit={handleLogin}
        className= "animate__animated animate__fadeIn animate__faster"
        >
            {/* <input type="text" placeholder="email" name="email" className="auth__input" autocomplete="off"/> */}
            <input type="text" placeholder="email" name="email" className="auth__input" autocomplete="off" value={ email } onChange={handleInputChange}/>
     
            <input type="password" placeholder="password" name="password" className="auth__input" value={ password } onChange={handleInputChange}/>
             
         
             
         <br/>
            <button type="submit" className="btn btn-primary btn-block"
             disabled={ loading } >
                Login
            </button>
 
          
            <div className="auth__social-network">
                <p>Login with social network</p>
               
            <div 
            className="google-btn"
            onClick={handleGoogleLogin}
        >
    <div className="google-icon-wrapper">
        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
    </div>
    <p className="btn-text">
        <b>Sign in with google</b>
    </p>
        </div>
            </div>

        <Link to="/auth/register" className="link">Create New acoount</Link>

        </form>
        </>
    )
}

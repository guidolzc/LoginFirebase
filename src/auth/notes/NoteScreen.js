import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch =useDispatch ();
    const  {active:note} = useSelector(state=>state.notes);
    
    //active:note renombro
    //console.log(note);
    const [formValues,handleInputChange,reset]= useForm(note)
    //console.log(formValues);
    const {body,title,id}= formValues;

    // no va a redibujar si no cambia
    const activeId = useRef(note.id);
    useEffect(() => {

        // si note.id es diferente a active entoces mostrar reset-note 
        if (note.id !==activeId.current){
            reset(note)
            // aqui establesco la nueva nota activa 
            activeId.current = note.id
        }
        
    }, [note,reset])
    

    // aqui toma los datos de formValus lo que escribiremos en la nota 
   useEffect(() => {
   dispatch (activeNote(formValues.id,{...formValues}));
   }, [formValues,dispatch])
   


   // elimina
   const handleDelete=()=>{
    console.log(id)
     dispatch(startDeleting(id));
   }
   
    return (
        <div className="notes__main-content">
            <NotesAppBar/>


            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value= {title}
                    onChange={handleInputChange}
                    name="title"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value= {body}
                    onChange={handleInputChange}
                    name="body"
                ></textarea>

                {
                    // si la nota url exite mostrar el url
                  (note.url) &&   
                   ( <div className="notes__image">
                    <img 
                        src={note.url}
                        alt="imagen"
                    />
                    </div>)
                }


            </div>

            <button className="btn btn-danger "
            onClick={handleDelete}
            >Delete</button>

        </div>
    )
}
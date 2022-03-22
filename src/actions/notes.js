import { db,addDoc,collection , updateDoc,doc,deleteDoc} from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from '../helpers/loadNotes';
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

// inserta valores a la base d datos cloud
export const startNewNote = ()=> { 
    return async (dispatch, getState) => { 
        const {uid} = getState().auth;
        console.log(uid);

        const newNote = { 
            title: '',
            body: '',
            date: new Date().getTime()
        }
        // entra a la base d firebase cloud firebase agrega un documento 
        const docRef = collection(db, `${uid}/jornal/notes`);
        const doc = await addDoc(docRef, newNote)
        
        // llamo a activeNotes para ver la informacion de y traer la notas id 
        dispatch( activeNote( doc.id, newNote ) );


        // se crea una funcion activeNote esta tiene la funcion de type y el reducer activa la funcion 
        dispatch(activeNewNote(doc.id, newNote))

        
    }
}

export const activeNote = (id,note) =>( {
    type: types.notesActive,
    payload : {
        id,
        ...note

    }
})
export const activeNewNote = (id,note) =>( {
    type: types.notesAddNew,
    payload : {
        id,
        ...note

    }
})



export const addNewNote = (id,note)=>({

})

export const startLoadingNotes = (uid)=>{
    return async(dispatch)=>{
         // ve las notas del usuario logueado por que aqui tiene q ser cuando se loguee el usuario
        const notes = await loadNotes(uid);
        dispatch (setNotes(notes));
    }
}


export const setNotes = (notes)=> ({ 
    type: types.notesLoad,
    payload:notes
});

export const startSaveNote = (note)=> {
    return async(dispatch,getState)=>{
        const {uid }= getState().auth;
        if(!note.url){
            delete note.url;
        }
        //const noteTofirestore = {...note};
         //delete noteTofirestore.id;

        //await db.doc(`${uid}/jornal/notes/${note.id}`).updateDoc(noteTofirestore);
        const noteToFirestore = { ...note };
        delete noteToFirestore.id
 
        const noteRef = doc(db, `${uid}/jornal/notes/${note.id}`)
        await updateDoc(noteRef,noteToFirestore);
        
      dispatch (refreshNote(note.id , noteToFirestore));
        Swal.fire('saved',note.title,'success')
    }
}

export const refreshNote = (id,note) =>({
    type:types.notesUpdated,
    payload: {
        id,note:{
            id,
            ...note
        }
    }
})

// funcion para guardar imagen 
export const startUploading = (file) =>{
    return async(dispatch,getState) =>{
        const {active:activeNote } = getState().notes;
        Swal.fire({
            title:'Uploading...', 
            text: 'Please wait...', 
            allowOutsideClick:false, 
            onBeforeOpen : () =>{
                Swal.showLoading();
            }
        })
        // console.log(file);
        // console.log(activeNote)
        // url de imagen 
        const fileUrl = await fileUpload(file)
        //console.log(fileUrl);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}


export const startDeleting = (id) => {
    return async(dispatch,getState) => {
        const uid = getState().auth.uid;
        const noteRef = doc(db, `${uid}/jornal/notes/${id}`)
      
        await deleteDoc(noteRef);
 
        dispatch(deleteNote(id));
    }
}
export const deleteNote =(id)=>({
    type: types.notesDelete,
    payload:id
})

export const notesLogout =(id)=>({
    type: types.notesLogoutCleaning,
    payload:id
})
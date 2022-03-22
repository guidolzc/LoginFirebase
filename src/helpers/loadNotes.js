import { db,getDocs,collection } from "../firebase/firebase-config"
 
export const loadNotes = async( uid ) => {
    
    const notesSnap = await getDocs(collection(db, `${uid}/jornal/notes`));  

    const notes = [];
 
    notesSnap.forEach( d => {

     console.log(d)
        notes.push({
            id: d.id,
            ...d.data(),
        })
       
      
    } )
    console.log(notes)
    return notes;
}

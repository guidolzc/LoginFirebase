import moment from 'moment';
import React from 'react'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

// recive los datos por pros de jornalEntries.js
export const JournalEntry = ({id,date,title,body,url}) => {

    //console.log(id,date,title,body,url);
    const noteDate = moment(date);
    //console.log(noteDate)
    const dispatch = useDispatch();

    const handleEntryClick =() => {

    
        dispatch(
            activeNote(id ,{
                date,title,body,url
            })
            );
        }
    return (
        <div className="journal-entry pointer animate__animated animate__fadeIn animate__faster"
         onClick = {handleEntryClick}
         
        >


            {/* // si el url es diferente a undifine*/}
           { 
           url &&
           <div className="journal-entry-picture"
              style={{ 
                  backgroundSize: 'cover',
                  backgroundImage: `url(${url})`
              }}
            
            > </div>}

            <div className="journal__entry-body">
                <p className="journal__entry-title">

                   {title}
                </p>
                <p className="journal__entry-content">
                   {body}
                </p>

            </div>
              <div className="journal__entry-date-box">
                    <span>{noteDate.format('dddd')}</span>
                    <h4>{noteDate.format('Do')}</h4>
              </div>

        </div>
    )
}

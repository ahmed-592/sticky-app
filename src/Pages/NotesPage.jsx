
import { useEffect, useState } from 'react';
import { getUserNotes } from '../Services/Notes';
import ModalCard from '../Components/ModalCard';
import NoteCard from '../Components/NoteCard';


export default function NotesPage() {

  const [notes, setNotes] = useState([]);


  async function getNotes() {
    const res = await getUserNotes();
    console.log(res);
    if (res.msg == "done") {
      if (res.notes == null) {
        setNotes([]);
        return;
      }
      setNotes(res.notes);

    }
  }

  useEffect(() => {
    getNotes();
  }, []);


  return <>
    <div className='mx-auto px-4 md:px-20 py-5'>
      <div className='flex justify-end p-5'>
        <ModalCard callback={getNotes} />

      </div>

      <div>

        {notes.length > 0 ? <><h2 className='font-semibold text-3xl'>Notes</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>
            {notes.map((note) => <NoteCard key={note._id} note={note} callbackUpdate={getNotes} callbackDelete={(deletedId) => {
              setNotes(prev => prev.filter(n => n._id !== deletedId))
            }} />)}
          </div>
          <p className='font-semibold text-end'>Notes Number : {notes.length}</p>

        </> : <h2 className='font-semibold text-3xl'>Not notes found</h2>}



      </div>

    </div>


  </>
}

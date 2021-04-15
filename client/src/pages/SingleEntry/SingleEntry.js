// import axios from 'axios';
import React from 'react';
import { AiFillCaretLeft } from 'react-icons/ai';
// import { FiTrash } from 'react-icons/fi';
import './SingleEntry.scss';

function SingleEntry(props) {
  const { entriesData, user } = props

  let userEntries = entriesData.find((currUser) => currUser.userId === user.uid);
  let currentEntry = userEntries.entries.find((currEntry) => currEntry.entryId === props.match.params.entryId)

  const goBack = () => props.history.goBack();

  // const handleDelete = () => {
  //   console.log('something is happening')
  //   axios.delete(`http://localhost:8080/entries/${user.uid}/${currentEntry.entryId}`)
  //         goBack();
  // }


  let moodClass = ((status) => {
    if (status === 'happy') {
      return 'single-entry__happy';
    }
    if (status === 'excited') {
      return 'single-entry__excited';
    }
    if (status === 'sad') {
      return 'single-entry__sad';
    }
    if (status === 'angry') {
      return 'single-entry__angry';
    }
    if (status === 'scared') {
      return 'single-entry__scared';
    }
  })

  if (entriesData === null ) {
    return <div> No entries yet </div>
  }

  return (
    <div className='single-entry'>
      <div className='single-entry__header'>
        <div className='single-entry__header-left'>
          <AiFillCaretLeft className='single-entry__chevron' onClick={goBack} />
          <h1 className='single-entry__title'>{currentEntry.title.toUpperCase()}</h1>
        </div>
        <div className='single-entry__stats'>
          <p className='single-entry__date'>{currentEntry.date}</p>
          <p className={`single-entry__mood ${moodClass(currentEntry.mood)}`}>{currentEntry.mood}</p>
        </div>
      </div>
      <p className='single-entry__entry'>{currentEntry.entry}</p>
      {/* <FiTrash onClick={handleDelete}/> */}
    </div>
  )
}

export default SingleEntry

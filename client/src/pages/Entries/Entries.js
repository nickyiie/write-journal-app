import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Entries.scss';

class Entries extends Component {

  moodClass(status) {
    if (status === 'happy') {
      return 'entry__happy';
    }
    if (status === 'excited') {
      return 'entry__excited';
    }
    if (status === 'sad') {
      return 'entry__sad';
    }
    if (status === 'angry') {
      return 'entry__angry';
    }
    if (status === 'scared') {
      return 'entry__scared';
    }
  }



  render() {
    const { entriesData, user } = this.props
    console.log(entriesData)

    let currentUser = entriesData.find((currUser) => currUser.userId === user.uid);
    console.log(currentUser)

    if (currentUser === undefined || null) {
      return <div>Write</div>
    }
    return (
      <ul className='entry'>
        {currentUser.entries.map((entry) => {
          return (
            <Link className='entry__link' to={`/${entry.entryId}`} key={entry.id}> 
            <li className='entry__item' key={entry.id}>
              <div className='entry__text'>
                <div className='entry__header'>
                  <p className='entry__title'>{entry.title.toUpperCase()}</p>
                  <p className={'entry__mood ' + this.moodClass(entry.mood)}>{entry.mood}</p>
                  <p className='entry__date'>{entry.date}</p>
                </div>
                <p className='entry__entry'>{entry.entry}</p>
              </div>
            </li>
            </Link>
          )
        })}
      </ul>
    )
  }

}


export default Entries;



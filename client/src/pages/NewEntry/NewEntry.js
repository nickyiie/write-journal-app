import axios from 'axios';
import { Component } from 'react';
import './NewEntry.scss';

class NewEntry extends Component {
  state = {
    entry: '',
    title: '',
    mood: '',
    counter: null,
    experience: 0,
    placeholder: '',
    author: ''
  }

  getPrompts = () => {
  axios.get('http://localhost:8080/quotes')
  .then(res => {
    console.log(res)
    this.setState({
      placeholder: res.data.result.quote,
      author: res.data.result.author
    })

    console.log(this.state.placeholder, this.state.author)
  })
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      counter: this.state.entry.split(' ').length
    })
    console.log(this.state.mood)
    if (this.state.counter <= 3) {
      this.setState({ experience: 2 })
    } else if (this.state.counter <= 5) {
      this.setState({ experience: 5 })
    } else if (this.state.counter <= 500) {
      this.setState({ experience: 7 })
    } else if (this.state.counter >= 750) {
      this.setState({ experience: 10 })
    }

    console.log(this.state)

  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.experience)
    const newEntry = {
      mood: this.state.mood,
      title: this.state.title,
      entry: this.state.entry
    }
    axios.put(`http://localhost:8080/entries/${this.props.user.uid}/new`, newEntry)
    const userExp = {
      experience: this.state.experience,
    }
    axios.put(`http://localhost:8080/users/${this.props.user.uid}`, userExp)
    window.location.reload();
  }
  
  componentDidMount() {
    this.getPrompts();
  }


  render() {
    return (
      <div className='new-entry'>
        <form className='new-entry__form' onSubmit={this.handleSubmit}>
          <div className='new-entry__header'>
            <input className='new-entry__title' type='text' name='title' value={this.state.title} autocomplete='off' placeholder='Your story starts here' onChange={this.handleChange} required />
            <select name='mood' value={this.state.mood} onChange={this.handleChange} required>
              <option value='mood'>Mood</option>
              <option value='happy'>Happy</option>
              <option value='excited'>Excited</option>
              <option value='sad'>Sad</option>
              <option value='angry'>Angry</option>
              <option value='scared'>Scared</option>
            </select>
          </div>
          <textarea className='new-entry__entry' value={this.state.entry} name='entry' placeholder={`${this.state.placeholder}\n-${this.state.author}`} onChange={this.handleChange} required></textarea>
          <button className='new-entry__button'>Add Entry</button>
        </form>
      </div>
    )
  }
}
// onClick={this.props.history.goBack}
export default NewEntry;

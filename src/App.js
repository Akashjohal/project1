import React, { useState, useEffect } from 'react'

import './App.css';

const App = () => {
  const [data, setData] = useState([])
  const [form, setform] = useState(false)
  const [details, setDetails] = useState(false);
  const [Movie, setMovie] = useState({
    name: "",
    language: "",
    averageRuntime: "",
    officialSite: "",
    rating: "",
    image: ""

  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('regular');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Form submitted:', { name, email, ticketType });
  };

  const func = (e) => {
    console.log(e);
    setDetails(!details)
    setMovie({
      name: e.show.name,
      image: e.show.image.original,
      language: e.show.language,
      rating: e.show.rating.average



    })
    console.log("The movie is ", Movie)
  }

  const url = "https://api.tvmaze.com/search/shows?q=all"
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);
  console.log(data[0])
  const cutButton = (key) => {
    setDetails(!details)
  }

  return (
    <div className='split left'>
      <div className='main'>
        {
          data.map((e) => {
            return (
              <div className='toggle' style={{ border: "1px solid black" }}>
                {e.show.name}
                {/* {e.network.id} */}
                <img id='picture1' style={{ width: "150px", height: "150px" }} src={e.show.image.medium} />
                <button id='button1' onClick={() => {
                  func(e)
                }}>Details</button>
              </div>
            )
          })
        }
      </div>
      second screen
      <div className="Detail right">
        {
          details && <div className="detail">
            <img id='picture2' style={{ width: "400px", height: "400px" }} src={Movie.image}></img>
            <div>
              <button onClick={cutButton} id="button2"> ✖ </button>
              <div className='discription'>
              Name : { Movie.name }<br></br>

              Language : {Movie.language}<br></br>

              officialSite : {Movie.officialSite}<br></br>
              rating : {Movie.rating}
              </div>
              <button id='button3' onClick={() => { setform(true) }}>Book Ticket</button>
            </div>
          </div>

        }


        {
          form && <form onSubmit={handleSubmit}>
            <div className='booking'>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Ticket Type:
                <select
                  value={ticketType}
                  onChange={(event) => setTicketType(event.target.value)}
                >
                  <option value="regular">Regular</option>
                  <option value="vip">VIP</option>
                  <option value="premium">Premium</option>
                </select>
              </label>
            </div>
            <button type="submit" onClick={() => { setform(!form); setDetails(!details) }}>Submit</button>
            <button onClick={() => { setform(!form) }}> Cancle </button>
          </form>
        }

      </div>
    </div>
  )
}

export default App
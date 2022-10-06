import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const getData=()=>{
    fetch('weather.json'
    ,{
      headers: {
        'content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        setData(object);
      });
  }

  useEffect(()=> {
    getData()
  }, [])

  console.log(data);

  return (
    <div className="App">
      <div className="main-container">
        <div className="section1">
          <div className="cityContainer">
            <p className='currtemp'>{data.query.results.channel.item.condition.temp}°F</p>
            <p className='currcondition'>{data.query.results.channel.item.condition.text}</p>
            <p className='currloc'>{data.query.results.channel.location.city} ,{data.query.results.channel.location.country}</p>
            <p className='currdate'>{data.query.results.channel.item.condition.date}</p>
          </div>
          <div className='todaysHighlight'>
            <p>Today's Highlights</p> 
            <div className='todayflex'>
              <div className='card'>
                <p className='title'>AStronomy</p>
                <p className='data'>Sunrise : <span>{data.query.results.channel.astronomy.sunrise}</span></p>
                <p className='data'>Sunset : <span>{data.query.results.channel.astronomy.sunset}</span></p>
              </div>
              <div className='card1'>
                <p className='title'>Atmosphere</p>
                <p className='data'>Humidity : <span>{data.query.results.channel.atmosphere.humidity}%</span></p>
                <p className='data'>Pressure : <span>{data.query.results.channel.atmosphere.pressure} in</span></p>
                <p className='data'>Visibility : <span>{data.query.results.channel.atmosphere.visibility}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className='section2'>
          <p className='title'>10 Days Forecast</p>
          <div className='forecastflex'>
            {data.query.results.channel.item.forecast.map(function(object, i) {
              return <div className='card'>
              <div className='date' key={i}>{object.date}, {object.day}</div>
              <div className='high' key={i}>High : <span>{object.high} °F</span></div>
              <div className='low' key={i}>Low : <span>{object.low} °F</span></div>
              <div className='text' key={i}>condition : <span>{object.text}</span></div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 

export default App;

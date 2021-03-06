import React from 'react';
import Titles from './components/TitleComponent/TitleComponent';
import Form from './components/FormComponent/FormComponent';
import Weather from './components/WeatherComponent/WeatherComponent';
import axios from 'axios';
import * as apiConfig from './apiKeys';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = (e, city, country) => {
    e.preventDefault();
    if(city && country) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiConfig.API_KEY}&units=metric`)
      .then(response => {
        const data = response.data;
        this.setState({
            ...this.state,
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: undefined
        })
      }).catch(err => {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: err});
      });
    }else {
      this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: 'Please enter the value'});
    }
  }

  render () {

    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                  <div className="col-xs-5 title-container">
                    <Titles />
                  </div>
                  <div className="col-xs-7 form-container">
                    <Form getWeather={(e, city, country) => this.getWeather(e, city, country)}/>
                    <Weather 
                      temperature={this.state.temperature}
                      city={this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error}/>
                    );
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
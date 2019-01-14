import React, { Component } from 'react';
import styled, { injectGlobal } from "styled-components";
import './App.css';
import '@amyscript/dsg-info-card/dsg-info-card.js';
import '@amyscript/dsg-image/dsg-image.js';
import '@amyscript/dsg-input/dsg-input.js';
import '@amyscript/dsg-input-button/dsg-input-button.js';

import { getWeatherData } from "./getWeatherData";

class App extends Component {
  state = {
    city: "",
    hourlyConditions: [],
    currentConditions: null,
    currentDate: "",
    queryLocation: "",
    showHourly: false
  };

  componentDidMount() {
    document.addEventListener('buttonClicked', async(e) => {
      if(e.detail.button === 'city-input-button') {
        const inputCustomElement = document.getElementById('city-custom-input-element');
        //need to access the shadowRoot to get to the Shadow DOM
        const shadow = inputCustomElement.shadowRoot;
        const city = shadow.getElementById('city-input').value;
        await this.handleCityUpdate(city);
      }
    });
  }

  parseData = weatherData => {
    const hourlyConditions = weatherData.weather[0].hourly;
    const currentConditions = weatherData.current_condition[0];
    const currentDate = weatherData.weather[0].date;
    const queryLocation = weatherData.request[0].query;

    this.setState({
      hourlyConditions,
      currentConditions,
      currentDate,
      queryLocation
    });
  };

  handleCityUpdate = (city) => {
    let weatherData = "";
    if (city !== "" || city !== undefined) {
      getWeatherData(city).then(res => {
        if (res !== null) {
          weatherData = res;
          this.parseData(weatherData);
        }
      });
    }
    const inputCustomElement = document.getElementById('city-custom-input-element');
    //need to access the shadowRoot to get to the Shadow DOM
    const shadow = inputCustomElement.shadowRoot;
    shadow.getElementById('city-input').value = '';
  };

  render() {
    return (
      <Wrapper>
        <div className="App">
          <dsg-input id="city-custom-input-element" inputId="city-input" />
          <dsg-input-button buttonId="city-input-button" />
          {this.state.currentConditions ? (
          <WeatherWrapper>
            <dsg-image
              url={this.state.currentConditions.weatherIconUrl[0].value}
            >
            </dsg-image>
            <dsg-info-card
              imageUrl={this.state.currentConditions.weatherIconUrl[0].value}
            >
            </dsg-info-card>
          </WeatherWrapper>
          ) : null}

        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
`;

const WeatherWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
`;

export default App;

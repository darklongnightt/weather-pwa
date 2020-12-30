<template>
  <main>
    <div class="title">{{ title }}</div>
    <button class="fetchButton" v-on:click="getWeather">Get Weather</button>
    <div class="weatherContainer" v-if="!isLoading">
      <div class="country">
        {{ weather.country.name }}, {{ weather.country.code }}
      </div>
      <div class="temp">{{ weather.temp }} °C</div>
      <div class="desc">{{ weather.desc }}</div>
    </div>
  </main>
</template>

<script>
export default {
  name: "WeatherApp",
  props: {
    title: String,
  },
  data() {
    return {
      apiKey: "a2bb99c3e970e7fc01f47573820da26b",
      baseUrl: "https://api.openweathermap.org/data/2.5/",
      query: "singapore",
      isLoading: true,
      weather: {},
    };
  },
  methods: {
    getWeather() {
      fetch(
        `${this.baseUrl}weather?q=${this.query}&units=metric&APPID=${this.apiKey}`
      )
        .then((resp) => {
          return resp.json();
        })
        .then(this.setWeather);
    },
    setWeather(results) {
      console.log(results);
      this.weather = {
        country: {
          name: results.name,
          code: results.sys.country,
        },
        temp: results.main.temp,
        desc: `${results.weather[0].main}, ${results.weather[0].description}`,
      };
      this.isLoading = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  flex: 1;
  align-self: center;
  justify-self: center;
  padding: 25px;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

.fetchButton {
  outline: none;
  margin-top: 2vh;
  padding: 10px 25px;
  width: 100%;
  border-radius: 10px 0 10px 0;
  border: 1px solid white;
  background-color: white;
}

.fetchButton:active {
  outline: none;
  margin-top: 2vh;
  padding: 10px 20px;
  border-radius: 0 10px 0 10px;
  border: 1px solid grey;
  box-shadow: 0px 0px 8px grey;
}

.weatherContainer {
  margin-top: 2vh;
  padding: 20px;
  border: 1px solid white;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
}

.temp {
  margin: 5px 0;
  font-size: 42px;
}

.desc {
  font-size: 18px;
  color: grey;
}

.country {
  font-size: 20px;
}
</style>

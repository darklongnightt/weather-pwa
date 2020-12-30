<template>
  <div id="app">
    <WeatherApp title="Weather App" />
  </div>
</template>

<script>
import WeatherApp from "./components/WeatherApp.vue";

export default {
  name: "App",
  components: {
    WeatherApp,
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-image: url("./assets/weather-bg.jpg");
  background-size: cover;
  background-position: bottom;
  opacity: 0.7;
  transition: 0.4s;
  text-align: center;
  min-height: 100vh;
  display: flex;
}
</style>

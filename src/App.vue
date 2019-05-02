<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<style>
html, body {
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
#nav {
  box-sizing: border-box;
  border-right: 1px solid black;
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  display: block;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#main {
  /* position: absolute; */
  margin-left: 160px;
  overflow: auto;
}
</style>

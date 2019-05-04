<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/editor">Editor</router-link>
    </div> -->
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<style>
html, body {
  /* height: 100%; */
  margin: 0;
  overflow: hidden;
  overscroll-behavior: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto; */
}
#nav {
  box-sizing: border-box;
  border-bottom: 1px solid black;
  height: 80;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 20px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 5px;
  display: inline-block;
}
#nav a.router-link-exact-active {
  background-color: #999;
}
#main {
  /* margin: 20px; */
  overflow: hidden;
}
</style>

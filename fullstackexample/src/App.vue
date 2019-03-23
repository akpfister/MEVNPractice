// App.vue

<template>
  <div class="container">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create Post</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/typeDB" class="nav-link">Typing Test w/ DB</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/editDB" class="nav-link">EditDB</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/allstats" class="nav-link">All Time Stats</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/wiki" class="nav-link">Wiki</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Graph" class="nav-link">Graph</router-link>
        </li>
      </ul>
    </nav><br />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .correct {
      color: rgb(63, 81, 181);
      font-size: 22px;
    }
    .typo {
      color: #f00;
      font-size: 22px;
    }
    .timer {
      font-size: 100px;
      text-align: center;
      color: white;
      border-radius: 100;
      background-color: green;
    }
</style>

<script>

    export default{
    }
</script>

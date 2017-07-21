<template>
  <div class="wrapper">
    <ul>
      <li v-for="index in 4">
        <router-link :to="{path:`/detail/${index}`}">00{{index}} to detail</router-link>
      </li>

    </ul>
  </div>
</template>

<script>
  export default{}
</script>

<style scoped="">
  ul {
    width: 1200px;
    font-size: 0;
  }

  ul li {
    display: inline-block;
    width: 25%;
    line-height: 350px;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid #000;
  }

  ul li:nth-child(1) {
    background: #00a7c8;
  }

  ul li:nth-child(2) {
    background: #0A246A;
  }

  ul li:nth-child(3) {
    background: #00a881;
  }

  ul li:nth-child(4) {
    background: #0C77CF;
  }

</style>

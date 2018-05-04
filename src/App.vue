<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: .24rem;
    vertical-align: baseline;
    background: transparent;
  }

  body {
    line-height: 1;
  }

  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary {
    display: block;
  }

  ol, ul, li {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: none;
  }

  a {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  ins {
    background-color: #ff9;
    color: #000;
    text-decoration: none;
  }

  del {
    text-decoration: line-through;
  }

  abbr[title], dfn[title] {
    border-bottom: 1px dotted #000;
    cursor: help;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  hr {
    display: block;
    height: 0;
    border: 0;
    border-top: 1px solid #cccccc;
    margin: 0;
    padding: 0;
  }

  input, select {
    vertical-align: middle;
  }
  input, button{
    outline:none;
    border:0;
    display:block;
  }
  .img-responsive {
    width: 100%;
    height: auto;
    display: block;
  }

  .clearfix {
    display: inline-block;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  html {
    font-size: calc(100vw / 7.5)
  }
  .mint-toast.is-placetop{
    width: 100%;
    max-width: 100%;
    top: 0;
  }
  .mint-header{
    height: .88rem !important;
    padding-left: .3rem !important;
    padding-right: .3rem !important;
  }

  .mint-header .mint-button-text{
  }

  .mint-header .mint-header-title{
    font-size: .3rem;
    line-height: .8rem
  }
  .mint-toast{
    max-width: 100% !important
    width: 100% !important
    top: 1.2rem !important
  }

</style>

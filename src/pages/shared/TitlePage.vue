<template>
  <div class="container-fluid py-3 bg-light">
    <div class="container-fluid py-3">
      <div class="row">
        <div class="col-6 text-left">
          <h1>{{titolo}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TitlePage',
  props: {
    titolo: String,
  },
};
</script>
<style>
h1{
  padding: 0px!important;
}
</style>

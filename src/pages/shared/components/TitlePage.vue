<template>
  <div class="container-fluid py-3   bg-white">
    <div class="display-3">
      <div class="row">
        <div class="col-6 text-left px-5">
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

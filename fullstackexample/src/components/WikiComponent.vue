// WikiComponent.vue

<template>
  <div class="row justify-content-center">
      <div class="col-md-8">
        <div>
          <h1>Get a Wiki Page</h1>
          <form @submit.prevent="searchWiki">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Search Wiki:</label>
                  <input type="text" class="form-control" v-model="search.query">
                </div>
              </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Search</button>
              </div>
          </form>
        </div>
        <div>
          <p>Wiki Data returned:</p>
          <p v-if="wikidata.content">{{ wikidata.content }}</p>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      wikidata: {},
      search: {}
    }
  },
  methods: {
    searchWiki(){
      // eslint-disable-next-line
      console.log(this.wikidata);
      let uri = 'http://localhost:4000/wiki/search';
      this.axios.post(uri, this.search).then(response => {
        this.wikidata = response.data;
      });
    }
  }
}
</script>

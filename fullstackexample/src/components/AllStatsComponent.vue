<template>
  <div>
      <h1>All Time Statistics</h1>

        <table class="table table-hover">
            <thead>
            <tr>
              <th>WC</th>
              <th>WPM</th>
              <th>Tyos</th>
              <th>Time</th>
              <th>Score</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{{ allTimeStats.wc }}</td>
                  <td>{{ allTimeStats.wpm }}</td>
                  <td>{{ allTimeStats.typos }}</td>
                  <td>{{ allTimeStats.time }} Minutes</td>
                  <td>{{ allTimeStats.score }}</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      allTimeStats: {}
    }
  },
  created() {
    let uri = 'http://localhost:4000/sessions/alltime';
    this.axios.get(uri).then(response => {
      this.allTimeStats = response.data;
    });
  }
}
</script>

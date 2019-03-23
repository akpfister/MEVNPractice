<template>
  <div>
      <h1>Posts</h1>

        <table class="table table-hover">
            <thead>
            <tr>
              <th>Date</th>
              <th>CW</th>
              <th>ID</th>
              <th>Time</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="session in sessions" :key="session._id">
                  <td>{{ session.date }}</td>
                  <td>{{ session.words_correct }}</td>
                  <td>{{ session._id }}</td>
                  <td>{{ session.totalTime }}</td>
                  <td><button class="btn btn-danger" @click.prevent="deleteSession(session._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>


<script>
export default {
    data() {
      return {
        sessions: []
      }
    },
    created() {
    let uri = 'http://localhost:4000/sessions';
    this.axios.get(uri).then(response => {
      this.sessions = response.data;
    });
  },
  methods: {
    deleteSession(id)
    {
      let uri = `http://localhost:4000/sessions/delete/${id}`;
      // eslint-disable-next-line
      this.axios.delete(uri).then(response => {
        this.sessions.splice(this.sessions.indexOf(id), 1);
      });
    }
  }
}
</script>

import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  data () {
    return {
      gradient: null,
      gradient2: null,
      glabels: [],
      gdata: []
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    let uri = 'http://localhost:4000/sessions/graph';
    this.axios.get(uri).then(response => {
      this.glabels = response.data.labels;
      this.gdata = response.data.data;
      // eslint-disable-next-line
      console.log(this.glabels);
      // eslint-disable-next-line
      console.log(this.gdata);

      this.renderChart({
        labels: this.glabels,
        datasets: [
          {
            label: 'WC vs. Time (sec)',
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: this.gradient,
            data: this.gdata
          }
        ]
      }, {responsive: true, maintainAspectRatio: false});

    });

  }
}

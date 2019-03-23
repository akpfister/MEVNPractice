// TypeDBComponent.vue

<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-8">
        <div class="paragraph" v-html="outputHTML"></div>
          <div class="typer mt-3">
            <textarea class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      placeholder="start typing here"
                      v-model="typedText"
                      @paste.prevent>
            </textarea> <!-- This v-on prevents the user from copy and pasting -->
          </div>
        </div>
        <div class="col-4">
          <button class="btn btn-danger btn-block" @click="stop()">Stop</button>
          <button class="btn btn-primary btn-block" @click="reset()">Reset</button>
          <div class="timer">
            {{ timer }}
          </div>
          <div class="scoreboard mt-3">
            <h2>Scoreboard</h2>
            <div class="scores">
              <div class="alert-info mt-2" v-for="(sessions, index) in sortedScores" :key="index">
                {{index + 1}}. {{sessions.date}}, {{sessions.words_correct}} CW, {{sessions.typos}} Typos, {{sessions.totalTime}} Seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      originalText: `Unwilling sportsmen he in questions september therefore described so. Attacks may set few believe moments was. Reasonably how possession shy way introduced age inquietude. Missed he engage no exeter of. Still tried means we aware order among on. Eldest father can design tastes did joy settle. Roused future he ye an marked. Arose mr rapid in so vexed words. Gay welcome led add lasting chiefly say looking.`,
      typedText: '',
      typoIndex: -1,
      lastTypoIndex: -1, //see if I can stop backspace from counting as an error
      timer: 0,
      time: 0,
      typing: false,
      timerInterval: {}, // new timerInterval state variable to allow clearInterval
      typos: 0,
      sessions: [],
      session: {} //possible add toDateString() fxn to convert
    }
  },
  created() {
    let uri = 'http://localhost:4000/sessions';
    this.axios.get(uri).then(response => {
      this.sessions = response.data;
    });
  },
  methods: {
    stop: function() {
      this.endTypingSpeed();
      this.calculateScore();
      // eslint-disable-next-line
      console.log(this.session);
      let uri = 'http://localhost:4000/sessions/add'; //step 11
      this.axios.post(uri, this.session).then(() => {
        this.$router.push({name: 'typeDB'});
      });
    },
    startTypingSpeed: function() {
        this.typing = true
        this.startTimer()
    },
    startTimer: function() {
      // replace the timer function to use arrow functions
      // because arrow functions use a `this` that belongs to the
      // context wrapping it.
      this.timerInterval  =  setInterval(() => {
        if (this.timer === 1000) {
          this.endTypingSpeed();
          this.calculateScore(); // calculate the typing speed
          return
        }
        this.timer++
      }, 1000)
    },
    endTypingSpeed: function() {
     // end the typing speed
     // change typing back to false and
     // blur the typing area
      clearInterval(this.timerInterval); //used to stop the setInterval fxn from running forever
      this.typing = false;
      this.time = this.timer;
      this.timer = 0;

      //dont know if this is necessary or in the right place
      //this.session = {};

      document.activeElement.blur();
    },
    reset: function() {
      // reset everything
      clearInterval(this.timerInterval);
      this.typing = false;
      this.typoIndex = -1;
      this.lastTypoIndex = -1;
      this.typedText = '';
      this.timer = 0;
      this.session = 0;
      this.time = 0;
    },
    calculateScore: function() {
      let correctlyTypedText = this.typedText
      if (this.typoIndex != -1) {
        correctlyTypedText = this.originalText.substring(0, this.typoIndex);
      }
      let words = correctlyTypedText.split(' ').length;
      this.session = {
        words_correct: words,
        typos: this.typos,
        totalTime: this.time
      }

      // reset typos and wpm
      this.typos = 0;
      // this.wpm = 0;
    }
  },
  computed: {
    outputHTML: function () {
      let newHTML = '<span class="correct">'
      if (this.typoIndex === -1) {
        // we do not have a typo index
        newHTML += this.originalText.substr(0, this.typedText.length)
        newHTML += '</span>'
        newHTML += this.originalText.substr(this.typedText.length)

        return newHTML
      }

      // else we have a typo index
      newHTML += this.originalText.substr(0, this.typoIndex)
      newHTML += '</span>'
      newHTML += '<span class="typo">'
      newHTML += this.originalText.substring(this.typoIndex, this.typedText.length)
      newHTML += '</span>'
      newHTML += this.originalText.substr(this.typedText.length)

      return newHTML
    },
    sortedScores: function() {
      return this.sessions.slice().sort((a, b) => {
        return a.words_correct + a.typos - (b.words_correct + b.typos);
      }).reverse();
    }
  },
  watch: {
    typedText: function (value) {
      // Check if already typing
      if (!this.typing) {
        this.startTypingSpeed()
      }
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== this.originalText[i]) {
          this.typoIndex = i;
          if (this.typoIndex <= this.lastTypoIndex) { //does not include backspace as a typo
            this.lastTypoIndex = this.typoIndex;
            break;
          }
          this.lastTypoIndex = this.typoIndex;
          this.typos++; // increase the typo count
          break;
        }
        this.typoIndex = -1;
      }
    }
  }
}
</script>

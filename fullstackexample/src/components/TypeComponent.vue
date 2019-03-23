// TypeComponent.vue

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
                    @paste.prevent></textarea> <!-- This v-on prevents the user from copy and pasting -->
        </div>
      </div>
      <div class="col-4">
        <button class="btn btn-primary btn-block" @click="reset()">Reset</button>
        <div class="timer">
          {{ timer }}
        </div>
        <div class="scoreboard mt-3">
          <h2>Scoreboard</h2>
          <div class="scores">
            <div class="alert-info mt-2" v-for="(score, index) in sortedScores" :key="index">
                 {{index + 1}}. {{score.wpm}} WPM, {{score.typos}} Typos
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  //},
  data() {
    return {
      originalText: `NIH (Not Invented Here) isnt a 4-letter word. Were all presumably programmers because we like programming. We shouldnt have to resign ourselves to the plumbing together of existing, poorly understood software, spending our days to write glue code we hate to produce a Frankenstein, monster system that sucks. We can do noble work and have it address problems from first principles. And that, in turn, makes us better more able engineers in the doing.`,
      typedText: '',
      typoIndex: -1,
      lastTypoIndex: -1, //see if I can stop backspace from counting as an error
      timer: 0,
      typing: false,
      timerInterval: {}, // new timerInterval state variable to allow clearInterval
      typos: 0,
      scores: []
    }
  },
  methods: {
 // we start the typing speed here by changing typing to true
 // and starting the timer
  startTypingSpeed: function() {
      this.typing = true
      this.startTimer()
  },
  startTimer: function() {
   // replace the timer function to use arrow functions
   // because arrow functions use a `this` that belongs to the
    // context wrapping it.
    this.timerInterval  =  setInterval(() => {
      if (this.timer === 10) {
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
    this.timer = 0;
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
    },
    calculateScore: function() {
      let score = {};
      let correctlyTypedText = this.typedText
      if (this.typoIndex != -1) {
        correctlyTypedText = this.originalText.substring(0, this.typoIndex);
      }
      let words = correctlyTypedText.split(' ').length;
      score = {
        wpm: words,
        typos: this.typos
      };

      // reset typos
      this.typos = 0;
      this.scores.push(score);
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
      return this.scores.slice().sort((a, b) => {
        return a.wpm + a.typos - (b.wpm + b.typos);
      }).reverse();
    }
  },
  watch: {
    typedText: function (value) {
      // Check if already typing
      if (!this.typing) {
        this.startTypingSpeed()
      }
      //console.log(value.key)
      for (let i = 0; i < value.length; i++) {
        // if (value[i] === ' ') {
        //   console.log("Here");
        // }
        if (value[i] !== this.originalText[i]) {
          this.typoIndex = i;
          if (this.typoIndex <= this.lastTypoIndex) { //does not include backspace as a typo
            this.lastTypoIndex = this.typoIndex;
            //console.log("Here");
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

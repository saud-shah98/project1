import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Vibration,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";

import { Display } from "./components/Display.component";
function createPadding(int) {
  if (parseInt(int) < 10) {
    return "0" + int.toString();
  } else {
    return int.toString();
  }
}

function getCounter(time) {
  return createPadding(time) + ":00";
}

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "00:05",
      work: "25:00",
      rest: "05:00",
      interval: this.work,
      isWorkTime: true,
      isRestTime: false,
      count: null,
      play: false,
      paused: false,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  play = () => {
    if (this.state.paused === true || this.state.play === false) {
      console.log("The user has started the clock!");
      this.setState({
        count: setInterval(this.countdown, 1000),
        paused: false,
        play: true,
      });
    }
  };
  pause = () => {
    if (this.state.paused === false && this.state.play === true) {
      clearInterval(this.state.count);
      this.setState({
        paused: true,
        play: false,
        timer: null,
      });
      console.log("The user has paused the clock!");
    } else if (this.state.paused === true && this.state.play === false) {
      this.play();
    }
  };
  reset() {
    this.pause();
    console.log("and the user has also reset the clock!");
    this.setState({
      startTime: this.state.work,
      play: false,
      isWorkTime: true,
      paused: false,
    });
  }
  countdown() {
    if (this.state.startTime === "00:00" && this.state.play === true) {
      console.log("finished");
      Vibration.vibrate([500, 500, 500]);
      this.switchStatus();
    } else {
      let sec = this.state.startTime.slice(3);
      let min = this.state.startTime.slice(0, 2);
      if (sec === "00") {
        let newMin = createPadding(parseInt(min) - 1);
        let newTime = newMin + ":59";
        this.setState({
          startTime: newTime,
        });
      } else {
        let newSec = createPadding(parseInt(sec) - 1);
        let newTime = min + ":" + newSec;
        this.setState({
          startTime: newTime,
        });
      }
    }
  }

  switchStatus() {
    if (this.state.isWorkTime) {
      this.setState({
        isWorkTime: false,
        startTime: this.state.rest,
      });
    } else {
      this.setState({
        isWorkTime: true,
        startTime: this.state.work,
      });
    }
  }

  render() {
    const { startTime } = this.state;
    return (
      <View style={styles.container}>
        <Display time={startTime} />
        <Button title="Start Timer" onPress={this.play} />

        <TouchableOpacity style={styles.pauseBtn} onPress={this.pause}>
          <Text style={styles.pauseBtnText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={this.reset}>
          <Text style={styles.resetBtnText}>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 42,
    textAlign: "center",
    marginTop: 40,
  },
  resetBtn: {
    backgroundColor: "darkred",
    height: 50,
    justifyContent: "center",
  },
  resetBtnText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  pauseBtn: {
    backgroundColor: "orange",
    height: 50,
    justifyContent: "center",
  },
  pauseBtnText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});

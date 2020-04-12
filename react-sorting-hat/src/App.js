import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Questions from "./components/Questions.js";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            answers: [],
        };
    }

    answersHandler = (res) => {
        let arr = [];

        Object.entries(res).forEach(([key, value]) => {
            arr.push(value);
        });

        console.log(res);

        this.setState({
            answers: arr,
        });
    };

    filterChoices = (arr) => {
        if (arr.length === 0) return null;
        var temp = {};
        var mostFreq = arr[0],
            maxCount = 1;
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            if (temp[el] == null) temp[el] = 1;
            else temp[el]++;
            if (temp[el] > maxCount) {
                mostFreq = el;
                maxCount = temp[el];
            }
        }
        return mostFreq;
    };

    render() {
        return (
            <div className="App">
                <Questions
                    getValues={this.answersHandler}
                    res={this.filterChoices(this.state.answers)}
                />
            </div>
        );
    }
}

export default App;

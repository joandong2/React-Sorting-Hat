import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Questions from "./components/Questions.js";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { requirePropFactory } from "@material-ui/core";

const App = () => {
    const [answer, setAnswer] = React.useState("");

    const filterChoices = (arr) => {
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

    const answersHandler = (res) => {
        let arr = [];
        Object.entries(res).forEach(([key, value]) => {
            arr.push(value);
        });
        setAnswer(filterChoices(arr));
    };

    return (
        <Container maxWidth="lg" className="App">
            <Grid container>
                <Grid item xs={4}>
                    <Questions getValues={answersHandler} />
                </Grid>
                <Grid item xs={8}>
                    {console.log(answer)}
                    <div className="faction">
                        {answer !== "" ? (
                            <img
                                className="img-fluid"
                                src={require(`./images/${answer}.png`)}
                                alt="logo"
                            />
                        ) : null}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;

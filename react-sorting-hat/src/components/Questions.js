import React from "react";
import { withFormik, Form, Field } from "formik";
// import * as Yup from "yup";
import questions from "../Data.js";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

const Questions = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [error, SetError] = React.useState("");

    const handleNext = () => {
        if (props.values[questions[activeStep].tag] === "") {
            SetError(`${questions[activeStep].tag} required`);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            SetError("");
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Form className="form-inline">
            <div className={classes.root}>
                <p className="error">{error}</p>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {questions.map((question, index) => (
                        <Step key={index}>
                            <StepLabel>{question.question}</StepLabel>
                            <StepContent>
                                {question.answers.map((answer, index) => (
                                    <Typography key={index}>
                                        <Field
                                            className="form-check-input"
                                            type="radio"
                                            name={question.tag}
                                            value={answer.house}
                                        />
                                        <label htmlFor={answer.answer}>
                                            {answer.answer}
                                        </label>
                                    </Typography>
                                ))}
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                        {activeStep === questions.length ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                type="submit"
                                                size="small"
                                            >
                                                Submit
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                size="small"
                                            >
                                                Next
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </Form>
    );
};

export default withFormik({
    mapPropsToValues: (props) => {
        return {
            qualities: props.qualities || "",
            symbol: props.symbol || "",
            element: props.element || "",
            color: props.color || "",
            instruments: props.instruments || "",
            title: props.title || "",
        };
    },
    handleSubmit: (values, formikBag) => {
        formikBag.props.getValues(values);
        formikBag.resetForm();
    },
})(Questions);

// {props.errors[question.tag] && (
//     <div id="error">
//         {props.errors[question.tag]}
//     </div>
// )}

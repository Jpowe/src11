import React from "react";
import Paper from "material-ui/Paper";
import { Step, Stepper, StepButton, StepContent } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import FormOrderContainer from "./FormOrderContainer";
import FormDeliveryContainer from "./FormDeliveryContainer";
import FormVendorContainer from "./FormVendorContainer";

/**
 * A basic vertical non-linear implementation
 */
class VerticalNonLinear extends React.Component {
  state = {
    stepIndex: 0
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions(step) {
    return (
      <div style={{ margin: "12px 0" }}>
        {step < 2 && (
          <RaisedButton
            label="Next"
            disabled={step === 2}
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onClick={this.handleNext}
            style={{ marginRight: 12 }}
          />
        )}
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { stepIndex } = this.state;

    return (
      <Paper zDepth={2}>
        <div style={{ width: 680, maxHeight: 1400, margin: "auto" }}>
          <Stepper activeStep={stepIndex} linear={false} orientation="vertical">
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                Vendor
              </StepButton>
              <StepContent>
                <FormVendorContainer />
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
                Order
              </StepButton>
              <StepContent>
                <div style={{ color: "#990000" }}>
                  Must select vendor BEFORE filling out the following fields:
                </div>
                <FormOrderContainer />

                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                Delivery
              </StepButton>
              <StepContent>
                <FormDeliveryContainer />
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </Paper>
    );
  }
}

export default VerticalNonLinear;

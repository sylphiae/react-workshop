////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////

// bottom two inputs use value prop
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      billingName: "",
      billingState: "",
      shippingName: "",
      shippingState: "",
      isChecked: false
    }

    const formState = localStorage.formState;
    if (formState) {
      Object.assign(this.state, JSON.parse(formState));
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const values = serializeForm(event.target, { hash: true });

    console.log(values);
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  }

  handleBeforeUnload = () => {
    // Save the state
    localStorage.formState = JSON.stringify(this.state);
  };

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name: <input type="text" 
                onChange={event =>
                  this.setState({ billingName: event.target.value})
                }
                name="billingName"/>
              </label>
            </p>
            {this.state.billingState.length > 2 && (
              <p style={{ color: "red" }}>
              Use the 2 character abbreviation for the state, please.
              </p>
            )}
            <p>
              <label>
                Billing State: <input type="text" 
                size="2"
                onChange={event =>
                this.setState({ billingState: event.target.value})}
                name="billingState"
                 />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input type="checkbox"
              onClick={event => this.setState({ isChecked: event.target.checked})} /> Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name: <input type="text"
                value={this.state.isChecked? this.state.billingName: this.state.shippingName}
                onChange={event =>
                  this.setState({ shippingName: event.target.value})}
                disabled={this.state.isChecked? true: false}
                name="shippingName" 
                />
              </label>
            </p>
            <p>
              <label>
                Shipping State: <input type="text" 
                size="2"
                value={this.state.isChecked? this.state.billingState: this.state.shippingState}
                onChange={event =>
                  this.setState({ shippingState: event.target.value})}
                disabled={this.state.isChecked? true: false}
                name="shippingName" />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));

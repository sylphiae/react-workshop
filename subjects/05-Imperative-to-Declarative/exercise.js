////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired
  };

  doImperativeWork() {
    $(this.node).modal(this.props.isOpen ? "show" : "hide");
  }

  toggle() {
    if (this.props.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  componentDidMount() {
    this.toggle();
    // if user clicks on overlay this can ensure the close of the parent?
    $(this.node).on('hidden.bs.collapse.modal', ()=> {
      if (this.props.onClose) this.props.onClose();
    })
  }

  componentDidUpdate() {
    this.toggle();
  }

  open() {
    $(this.node).modal("show");
  }

  close() {
    $(this.node).modal("hide");
  }

  render() {
    return (
      <div className="modal fade" ref={node => (this.node = node)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    title: "",
    isOpen: false
  }
  openModal = () => {
    this.setState({isOpen: true})
  };

  closeModal = () => {
    this.setState({isOpen: false})
  };

  render() {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>

        <button className="btn btn-primary" onClick={this.openModal}>
          open modal
        </button>

        <Modal
          onClose = {this.closeModal}
          isOpen = {this.state.isOpen}
          title="Declarative is better"
        >
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>
            It’s the dynamic process, not the static program in text
            space.
          </p>
          <p>
            You have to experience it over time, rather than in
            snapshots of state.
          </p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

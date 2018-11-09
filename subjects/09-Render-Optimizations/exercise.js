////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = {scrollPosition: 0, availableHeight: window.innerHeight };

  handleScroll = event => {
    this.setState({
      scrollPosition: event.target.scrollTop,
      availableHeight: event.target.clientHeight
    })
  }

  render() {
    const { scrollPosition, availableHeight } = this.state;
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;

    const items = [];

    // HINT: make these numbers closer together
    const startIndex = 0;
    const endIndex = Math.ceil((scrollPosition + availableHeight)/ rowHeight);

    let index = startIndex;
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    // handleScroll = event => event.target.scrollTop
    // handleScroll = event => event.target.clientHeight

    return (
      <div style={{ height: "100vh", overflowY: "scroll" }}
      onscroll = {this.handleScroll}>
        <div style={{ height: totalHeight }}>
          <ol>{items}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={100000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);

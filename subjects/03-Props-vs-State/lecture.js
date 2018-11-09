import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";

class ContentToggle extends React.Component {
  handleClick = () => {
    this.props.onToggle()
  };

  // static getDerivedStateFromProps(nextProps, nextState){
  //   return {isOpen: nextState.isOpen || this.props.open };
  //   // if (nextProps.open !== nextState.isOpen) {
  //   //   return { isOpen: nextProps.open};
  //   // }
  //   // return prevState;
  // }

  render() {
    let isOpen = this.props.open;
    let summaryClassName = "content-toggle-summary";

    if (isOpen) {
      summaryClassName += " content-toggle-summary-open";
    }

    return (
      <div style={this.props.style} className="content-toggle">
        <button onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </button>
        <div className="content-toggle-details">
          {isOpen && this.props.children}
        </div>
      </div>
    );
  }
}

class StatefulContentToggle extends React.Component {
  state = { isOpen: false}
  render() {
    return (<ContentToggle 
    {...this.props}
    open = { this.state.isOpen }
    onToggle = {()=> this.setState({ isOpen: !this.state.isOpen })}/>
    )
  }
}

import carnitas from "./images/carnitas.png";
import pollo from "./images/pollo.png";
import asada from "./images/asada.png";

class App extends React.Component {
  state = {
    tacos: [
      { id: 0, name: "Carnitas", src: carnitas, open: false },
      { id: 1, name: "Pollo", src: pollo, open: false },
      { id: 2, name: "Asada", src: asada, open: false }
    ]
  };

  toggleAll = allOpen => {
    this.setState({
      tacos: this.state.tacos.map(t => {
        t.open = allOpen;
        return t;
      })
    })
  };

  handleTacoToggle = (taco, open) => {
    this.setState({
      tacos: this.state.tacos.map(t => {
      if (taco === t) 
        t.open = open;
        return t;
      })
    })
  }

  render() {
    let allOpen = this.state.tacos.every(t => t.open);

    return (
      <div>
        <button onClick ={() => this.toggleAll(!allOpen)}>Toggle all</button>
        <div>
          {this.state.tacos.map(taco => (
            <ContentToggle
              key={taco.name}
              style={{ width: 300 }}
              summary={taco.name}
              open={taco.open}
              onToggle={() => this.handleTacoToggle(taco, !taco.open)}
            >
              <div
                style={{
                  height: 200,
                  background: `url(${taco.src})`,
                  backgroundSize: "cover"
                }}
              />
            </ContentToggle>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////
// But what about when we add this feature?
// <button>Toggle All</button>

// class ContentToggle extends React.Component {
//   state = { isOpen: this.props.isOpen };

//   componentDidUpdate(prevProps) {
//     if (
//       prevProps.isOpen !== this.props.isOpen && // props.isOpen changed
//       this.props.isOpen !== this.state.isOpen
//     ) {
//       this.setState({ isOpen: this.props.isOpen });
//     }
//   }

//   handleClick = () => {
//     this.setState({ isOpen: !this.state.isOpen }, () => {
//       if (this.props.onToggle) {
//         this.props.onToggle(this.state.isOpen);
//       }
//     });
//   };

//   render() {
//     let summaryClassName = "content-toggle-summary";

//     if (this.state.isOpen) {
//       summaryClassName += " content-toggle-summary-open";
//     }

//     return (
//       <div style={this.props.style} className="content-toggle">
//         <button onClick={this.handleClick} className={summaryClassName}>
//           {this.props.summary}
//         </button>
//         <div className="content-toggle-details">
//           {this.state.isOpen && this.props.children}
//         </div>
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   state = {
//     tacos: [
//       { id: 0, name: "Carnitas", src: carnitas },
//       { id: 1, name: "Pollo", src: pollo },
//       { id: 2, name: "Asada", src: asada }
//     ],
//     allOpen: false
//   };

//   openAll = () => {
//     this.setState({ allOpen: true });
//   };

//   closeAll = () => {
//     this.setState({ allOpen: false });
//   };

//   render() {
//     return (
//       <div>
//         {this.state.allOpen ? (
//           <button onClick={this.closeAll}>Close All</button>
//         ) : (
//           <button onClick={this.openAll}>Open All</button>
//         )}
//         <div>
//           {this.state.tacos.map(taco => (
//             <ContentToggle
//               key={taco.name}
//               style={{ width: 300 }}
//               summary={taco.name}
//               isOpen={this.state.allOpen}
//             >
//               <div
//                 style={{
//                   height: 200,
//                   background: `url(${taco.src})`,
//                   backgroundSize: "cover"
//                 }}
//               />
//             </ContentToggle>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("app"));

//////////////////////////////////////////////////////////////////////////////
// This is cool, until we screw up the state by clicking the button, then
// clicking every item to the other state, and then clicking the button again,
// now that the parent owns the toggle state, we need it know each toggler's
// state and synchronize it

// class ContentToggle extends React.Component {
//   state = { isOpen: this.props.isOpen };

//   handleClick = () => {
//     this.setState({ isOpen: !this.state.isOpen }, () => {
//       if (this.props.onToggle) {
//         this.props.onToggle(this.state.isOpen);
//       }
//     });
//   };

//   componentDidUpdate(prevProps) {
//     if (
//       prevProps.isOpen !== this.props.isOpen && // props.isOpen changed
//       this.props.isOpen !== this.state.isOpen
//     ) {
//       this.setState({ isOpen: this.props.isOpen });
//     }
//   }

//   render() {
//     let summaryClassName = "content-toggle-summary";

//     if (this.state.isOpen) {
//       summaryClassName += " content-toggle-summary-open";
//     }

//     return (
//       <div style={this.props.style} className="content-toggle">
//         <button onClick={this.handleClick} className={summaryClassName}>
//           {this.props.summary}
//         </button>
//         <div className="content-toggle-details">
//           {this.state.isOpen && this.props.children}
//         </div>
//       </div>
//     );
//   }
// }

// class App extends React.Component {
//   state = {
//     tacos: [
//       { name: "Carnitas", src: carnitas, isOpen: false },
//       { name: "Pollo", src: pollo, isOpen: false },
//       { name: "Asada", src: asada, isOpen: false }
//     ]
//   };

//   openAll = () => {
//     this.setState({
//       tacos: this.state.tacos.map(taco => {
//         taco.isOpen = true;
//         return taco;
//       })
//     });
//   };

//   closeAll = () => {
//     this.setState({
//       tacos: this.state.tacos.map(taco => {
//         taco.isOpen = false;
//         return taco;
//       })
//     });
//   };

//   handleTacoToggle = (toggledTaco, isOpen) => {
//     this.setState({
//       tacos: this.state.tacos.map(taco => {
//         if (taco.name === toggledTaco.name) {
//           taco.isOpen = isOpen;
//         }

//         return taco;
//       })
//     });
//   };

//   render() {
//     const allOpen = this.state.tacos.every(taco => taco.isOpen);

//     return (
//       <div>
//         {allOpen ? (
//           <button onClick={this.closeAll}>Close All</button>
//         ) : (
//           <button onClick={this.openAll}>Open All</button>
//         )}
//         <div>
//           {this.state.tacos.map(taco => (
//             <ContentToggle
//               key={taco.name}
//               style={{ width: 300 }}
//               summary={taco.name}
//               isOpen={taco.isOpen}
//               onToggle={isOpen => this.handleTacoToggle(taco, isOpen)}
//             >
//               <div
//                 style={{
//                   height: 200,
//                   background: `url(${taco.src})`,
//                   backgroundSize: "cover"
//                 }}
//               />
//             </ContentToggle>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("app"));

//////////////////////////////////////////////////////////////////////////////
// Our state is now fully synchronized, but do we even need state in
// ContentToggle anymore?

// class ContentToggle extends React.Component {
//   handleClick = () => {
//     if (this.props.onToggle) {
//       this.props.onToggle(!this.props.isOpen);
//     }
//   };

//   render() {
//     let summaryClassName = "content-toggle-summary";

//     if (this.props.isOpen) {
//       summaryClassName += " content-toggle-summary-open";
//     }

//     return (
//       <div style={this.props.style} className="content-toggle">
//         <button onClick={this.handleClick} className={summaryClassName}>
//           {this.props.summary}
//         </button>
//         <div className="content-toggle-details">
//           {this.props.isOpen && this.props.children}
//         </div>
//       </div>
//     );
//   }
// }

//////////////////////////////////////////////////////////////////////////////
// Can also write it as a state-less functional component (SFC)

// function ContentToggle(props) {
//   let summaryClassName = "content-toggle-summary";

//   if (props.isOpen) {
//     summaryClassName += " content-toggle-summary-open";
//   }

//   return (
//     <div style={props.style} className="content-toggle">
//       <button
//         onClick={() => {
//           if (props.onToggle) props.onToggle(!props.isOpen);
//         }}
//         className={summaryClassName}
//       >
//         {props.summary}
//       </button>
//       <div className="content-toggle-details">
//         {props.isOpen && props.children}
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////////////////////
// - We didn't really get rid of state, we just pushed it up a level
// - got rid of synchronizing state :)
// - component is super simple, just a function of its props
//
// But its not as portable anymore
// - Must implement `onToggle` :\
// - Must manage state in the owner, always :\
//
// We can create a controlled component that wraps our pure component.

// class StatefulContentToggle extends React.Component {
//   state = { isOpen: false };
//   render() {
//     return (
//       <ContentToggle
//         {...this.props}
//         isOpen={this.state.isOpen}
//         onToggle={isOpen => this.setState({ isOpen })}
//       />
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// You don't inherit from base classes, you compose by wrapping, just like you
// compose functions, call one inside of another

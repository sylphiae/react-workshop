import { createStore, combineReducers } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";

// const store = createStore((state = 0, action) => {
//   if (action.type === "INCREMENT") {
//     return state + (action.by || 1);
//   } else {
//     return state;
//   }
// });

// store.subscribe(() => {
//   console.log(store.getState());
// });

// actions.js
const INC="INC";

function countReducer(state = 0, action) {
  if (action.type === INC) {
    return state + action.by
  }
  return state;
}

const ADD_TODO = "ADD_TODO";

function todosReducer(state = [], action) {
  if (action.type === ADD_TODO) {
    return state.contact([action.what])
  }
  return state
}

// store.js
const reducer = combineReducers({
  count: countReducer,
  todos: todosReducer
});

function reducer(state = {}, action) {
  if (action.type === INC) {
    return {
      ...state,
      count: (state.count || 0) + action.by
    }
  }
  return state;
}

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({type: INC, by: 1})
console.log(store.getState());

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT", by: 5 });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });

class TodoList extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
  }

  state = {todos: []}

  render() {
    return (
<div>
  <form onSubmit = {this.handleSubmit}>
  <input type ="text" ref={node => (this.input = node)}/>
  </form>

  <p>todos:</p>
  <ul>
    {this.state.todos.map(todo => (
      <li> {todo} </li>
    ))}
    </ul>
  </div>
    )
  }
}
/*
- Flux is an architecture, not a framework
  - DO NOT START BUILDING STUFF WITH FLUX WHEN YOU'RE FIRST GETTING STARTED WITH REACT
  - It can be difficult to understand why the patterns in Flux are useful if you haven't
    already tried to solve problems w/out Flux
  - You'll most likely hate Flux unless you're already fighting with your current JS
    framework. If you're not, stick with what's working for you

- Flux is good at:
  - Making it easy to reason about changes to state

- Remember our 2 questions:
  - What state is there?
  - When does it change?

Open Redux.png

- Views
  - React components (see components)
  - Create actions (see actions)

- Actions
  - Create "actions" with meaningful names (e.g. "load contacts", "delete contact").
    These are the verbs. Ask yourself, "what actions can the user take?"
  - Send actions through the dispatcher
  - Possibly trigger API requests (side effect)

- Store
  - Synchronous dispatch of actions to ALL registered listeners (stores)

- Reducers
  - Compute new state values
*/

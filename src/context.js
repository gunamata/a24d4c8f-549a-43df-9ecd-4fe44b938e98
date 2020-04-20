import React, { Component } from 'react';
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'BUILD_MEAL_SCHEDULE':
      return {
        ...state,
        mealSchedule: action.payload
      };
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};  

export class Provider extends Component {
  state = {
    mealSchedule: [],
    error:'',
    dispatch: action => this.setState(state => reducer(state, action))
  };
  
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

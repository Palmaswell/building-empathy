import * as React from 'react';
import { SpeechResultProps } from '../model/speech';

export interface StateValueProps<T> {
  value: T;
  children({ value: T }): JSX.Element;
}


export default class State extends React.Component<StateValueProps<SpeechResultProps>> {
  public state = {
    value: this.props.value
  }

  public set = (value) => {
    this.setState({...this.state, value});
  }

  public render(): JSX.Element {
    return this.props.children({
      value: this.state,
      set: this.set
    });
  }
}

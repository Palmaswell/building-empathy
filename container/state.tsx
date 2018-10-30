import * as React from 'react';
import { SpeechResultProps } from '../model/speech';

export interface StateContainerProps<T> {
  value: T;
  children(value: StateValueProps<T>): JSX.Element;
}

interface StateValueProps<T> {
  value: T;
  set: () => void;
}

export class State extends React.Component<StateContainerProps<SpeechResultProps>> {
  public state = {
    value: this.props.value
  }

  public set = (value: SpeechResultProps) => {
    const { confidence, transcript } = value;
    this.setState({
      ...this.state,
      confidence: confidence,
      transcript: transcript
    });
  }

  public render(): JSX.Element {
    return this.props.children({
      value: this.state.value,
      set: this.set
    } as StateValueProps<SpeechResultProps>);
  }
}

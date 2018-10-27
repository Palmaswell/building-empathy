import * as speechEvent from './events';

export interface SpeechProps {
  confidence?: number;
  transcript?: string | string[];
  abort?(e): void;
  start(e): void;
  stop?(e): void;
}

interface SpeechInit {
  grammars: string;
  maxAlternatives: number;
  interimResults: boolean;
  lang?: string;
}


export function createRecognition() {
  return (init: SpeechInit): SpeechProps => {
    const SpeechRecognition = (window as any).SpeechRecognition
      || (window as any).webkitSpeechRecognition;
    const SpeechGrammarList = (window as any).SpeechGrammarList
    || (window as any).webkitSpeechGrammarList;
    const recognition = new SpeechRecognition();
    const grammarList = new SpeechGrammarList();
    recognition.maxAlternatives = init.maxAlternatives;
    recognition.interimResults = init.interimResults;
    recognition.lang = init.lang || 'en-US';
    grammarList.addFromString(init.grammars, 1);
    recognition.grammar = grammarList;

    return {
      start(e) {
        e.preventDefault();
        console.log(e, 'this is the start event');
        recognition.start();
        recognition.onerror = e => speechEvent.handleError(e.error);
        recognition.onstart = () => speechEvent.handleStart();
        recognition.onresult = e => speechEvent.handleResult({
          confidence: e.results[0][0].confidence,
          transcript: e.results[0][0].transcript
        })
      }
    }
  }
}

export interface SpeechProps {
  methods: Methods;
  result: Result;
}

interface Methods {
  abort(e): React.MouseEventHandler<HTMLElement>;
  start(e): React.MouseEventHandler<HTMLElement>;
  stop(e): React.MouseEventHandler<HTMLElement>;
}

interface Result {
  confidence: number;
  transcript: string | string[];
}

interface SpeechInit {
  grammars: string;
  maxAlternatives: number;
  interimResults: boolean;
  lang?: string;
}


export function createRecognition() {

  return (init: SpeechInit) => {
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
      }
    }
  }
}

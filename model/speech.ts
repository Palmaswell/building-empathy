import * as speechEvent from './events';

interface SpeechInit {
  grammars: string;
  maxAlternatives: number;
  interimResults: boolean;
  lang?: string;
}

export interface SpeechResultProps {
  confidence: number;
  transcript: string | string[];
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

    return (e, updater): void => {
      e.preventDefault();
      //-- handle recognition when it is already listeing
      //-- look for the native events;
      recognition.start();

      recognition.onerror = e => speechEvent.handleError(e.error);
      recognition.onstart = () => speechEvent.handleStart();
      recognition.onresult = e => updater({ e, recognition });
      recognition.onend = e => console.log(`🔌 Speech recognition service disconnected. ${JSON.stringify(e)}`);
      recognition.onspeechend = () => recognition.stop();
    }
  }
}

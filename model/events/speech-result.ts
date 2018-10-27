interface SpeechResult {
  confidence: number;
  transcript: string | string[];
}

export function handleResult(result: SpeechResult): void {
  console.log(result, 'this is the final result object');
}

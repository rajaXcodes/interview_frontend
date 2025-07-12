import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          onClick={() => {
            // You can pass any options here if needed, or leave it empty
            SpeechRecognition.startListening({continuous : true});
          }}
        >
          Start
        </button>

        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    </div>
  );
};
export default Dictaphone;

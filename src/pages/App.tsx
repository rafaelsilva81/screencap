import useRecorder from "../utils/useScreenCapture";

function App() {
  const { isRecording, isSupported, starRecording, stopRecording, videoData } =
    useRecorder();

  {
    !isSupported && (
      <div>
        <h1>Sorry, your browser does not support screen recording</h1>
      </div>
    );
  }

  return (
    <div
      className="bg-gradient-to-br from-violet-600 to-orange-600
      font-semibold text-white 
      h-screen w-screen flex flex-col justify-center items-center gap-4
      "
    >
      <button
        className="bg-violet-500 hover:bg-violet-700
        text-white font-bold py-2 px-4 rounded
        "
        onClick={starRecording}
      >
        Start Recording
      </button>

      <button
        className="bg-orange-500 hover:bg-orange-700
        text-white font-bold py-2 px-4 rounded
        "
        onClick={stopRecording}
      >
        Stop Recording
      </button>

      {isRecording && <div>Recording...</div>}

      {videoData && (
        <>
          <video src={videoData} controls width={"500px"}></video>
          <a
            href={videoData}
            className="bg-green-500 hover:bg-green-700
          text-white font-bold py-2 px-4 rounded
            "
            download="video.mp4"
          >
            Download
          </a>
        </>
      )}
    </div>
  );
}

export default App;

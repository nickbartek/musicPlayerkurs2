import { useRef, useState } from "react";
import "./styles.css";

function SongListItem({ song,  onSelect }) {
  function handleClick() {
    onSelect(song);
  }
  return (
    <li
      className={`SongListItem`}
      onClick={handleClick}
    >
      {song.id} -{song.title} by {song.artist}
    </li>
  );
}
//
function AudioPlayer({ song }) {
  const audioRef = useRef();
  var [showControls, setshow] = useState(false);
  var { audioUrl, id } = song;

  console.log(audioUrl, id);
  return (
    <div>
      <audio ref={audioRef} key={audioUrl} controls={showControls}>
        <source src={audioUrl} />
      </audio>

      <br />
      <button onClick={() => setshow(!showControls)}>hide/show</button>
      <button onClick={() => audioRef.current.play()}>Play</button>
    </div>
  );
}

export default function App() {
  const songs = [
    {},

    {
      title: "pretty music",
      audioUrl: "https://www.front-music.pl/data/free/090-front-music.pl.mp3",
      id: 1
    },
    {
      title: "beatyful",
      audioUrl: "https://www.front-music.pl/data/free/152-front-music.pl.mp3",
      id: 2
    },
    {
      title: "my favorite",
      audioUrl: "https://www.front-music.pl/data/free/174-front-music.pl.mp3",
      id: 3
    },
    {
      title: "the best",
      audioUrl: "https://www.front-music.pl/data/free/487-front-music.pl.mp3",
      id: 4
    },
    {
      title: "top of the songs",
      audioUrl: "https://www.front-music.pl/data/free/155-front-music.pl.mp3",
      id: 5
    }
  ];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [formerSongInd, setformer] = useState(0);
  var currentSong = songs[currentSongIndex];
  var formerSong = songs[formerSongInd];
  function handleSelectSong(selectedSong) {
    const audioIndex = songs.findIndex(
      (song) => song.audioUrl === selectedSong.audioUrl
    );
    if (audioIndex >= 0) {
      // setFormerInd(currentSongIndex); //setFormerIndex
      setCurrentSongIndex(audioIndex); //
      setformer(currentSongIndex);
      // console.log("former, current", formerSongInd, currentSongIndex);
    }
  }

  return (
    <div className="App">
      <h1>This is Music Player </h1>
      <h1 className="title">
        Current song:
        {currentSong.id ? (
          <>
            {currentSong.id}.{currentSong.title}
          </>
        ) : (
          <span>"no song chosen!"</span>
        )}{" "}
      </h1>
      <h1 className="title">
        Former song: {formerSong.id}.{formerSong.title}{" "}
      </h1>

      <h2>press the hide / show button to show the controls</h2>

      <AudioPlayer song={currentSong} />
      <ul>
        {songs.map((song) => (
          <SongListItem
            key={song.audioUrl}
            song={song}
            //isCurrent={currentSong.audioUrl === song.audioUrl} //highlihted
            onSelect={handleSelectSong}
            currentSongIndex
          />
        ))}
        <br />
      </ul>
    </div>
  );
}

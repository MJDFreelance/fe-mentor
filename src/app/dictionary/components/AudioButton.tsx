import { useRef } from "react";
import PlayIcon from "@/app/dictionary/icons/icon-play.svg";

export const AudioButton = ({ index, item }: any) => {
  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      // Reload the audio in case the source changes dynamically
      (audioRef.current as any).load();
      (audioRef.current as any).play();
    }
  };

  if (!item.phonetics.find((item: any) => item.sourceUrl)?.audio) {
    return null;
  }

  return (
    <button
      onClick={() => handlePlayAudio()}
      className={`h-[75px] w-[75px] rounded-full col-start-2 row-start-1 row-span-2 justify-self-end bg-[#A445ED]`}
    >
      <PlayIcon />
      <audio id={`audio-${index}`} ref={audioRef}>
        <source
          src={item.phonetics.find((item: any) => item.sourceUrl)?.audio}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </button>
  );
};

import AddClickTrackModal from "@/components/AddClickTrackModal";
import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [songOrder, setSongOrder] = useState<any[]>([]);
  const [multiTracks, setMultiTracks] = useState<any[]>([]);
  const [audioClips, setAudioClips] = useState<any[]>([]);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddClickTrack = (trackName: any) => {
    const items = Array.from(songOrder);
    // const timeTop = clickTime === "4/4" ? "4" : "6";
    // const timeBottom = clickTime === "4/4" ? "4" : "8";
    // const duration = timeTop === "4" ? "4" : "3";
    items.push({
      name: "Test Click",
      bpm: "200",
      time_signature_top: "4",
      time_signature_bottom: "4",
      // name: clickName,
      // bpm: clickBPM,
      // time_signature_top: timeTop,
      // time_signature_bottom: timeBottom,
      track: false,
      key: "0",
      duration: "0:00",
      clips: [],
      img: "/metronome.png",
    });
    setSongOrder(items);
  };

  console.log(songOrder);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(songOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongOrder(items);
  }

  const postBuildSet = async () => {
    try {
      const formData = new FormData();
      formData.append("json", JSON.stringify(songOrder));

      for (let i = 0; i < multiTracks.length; i++) {
        for (let j = 0; j < multiTracks[i].clips.length; j++) {
          formData.append(multiTracks[i].name, multiTracks[i].clips[j]);
        }
      }

      const response = await fetch("http://localhost:8080/set", {
        method: "POST",
        body: formData,
      }).then((res) => {
        // TODO: NOT WORKING
        const setId = res.data.id;
        window.open(`http://localhost:8080/download?id=${setId}`);
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
    } catch (e) {
      return console.log(e);
    }
  };

  return (
    <div className="bg-gray-600 h-screen p-5">
      <div style={{ maxWidth: "1280px" }} className="mx-auto">
        <div className={"pb-5 border-b"}>
          <header className="App-header">
            <h1
              className={`text-4xl font-semibold uppercase pb-3 mb-5 border-b`}
            >
              Sunday Set Builder
            </h1>
          </header>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="songs">
              {(provided) => (
                <ul
                  className="flex flex-col gap-4 list-none"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {songOrder.map((song, index) => {
                    return (
                      <Draggable
                        key={song.id}
                        draggableId={song.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            className={`relative flex items-center bg-white p-2 border-2 border-gray-200 rounded`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="h-32 w-32 mr-4 shrink-0">
                              <img
                                className={`w-full h-auto`}
                                src={song.img}
                                alt={`${name} Thumb`}
                              />
                            </div>
                            <div className={"flex flex-col gap-2"}>
                              <p className={`text-md font-bold text-black`}>
                                {song.name}
                              </p>
                              <div
                                className={
                                  "flex flex-col gap-1 justify-content-center"
                                }
                              >
                                <p
                                  className={`text-xs font-semibold text-gray-500`}
                                >
                                  Key: {song.key}
                                </p>
                                <p
                                  className={`text-xs font-semibold text-gray-500`}
                                >
                                  BPM: {song.bpm}
                                </p>
                                <p
                                  className={`text-xs font-semibold text-gray-500`}
                                >
                                  Time Sig:{" "}
                                  {`${song.time_signature_top} / ${song.time_signature_bottom}`}
                                </p>
                                <p
                                  className={`text-xs font-semibold text-gray-500`}
                                >
                                  Duration: {song.duration}
                                </p>
                              </div>
                            </div>
                            {/* Edit button */}
                            <div className={"absolute top-0 right-0 p-2"}>
                              <button
                                className="font-bold pr-2 mr-2 text-gray-600 hover:text-gray-800"
                                onClick={() => console.log(`edit ${song.name}`)}
                              >
                                Edit
                              </button>
                              <button
                                className="font-bold mr-2 text-gray-600 hover:text-gray-800"
                                onClick={() =>
                                  console.log(`delete ${song.name}`)
                                }
                              >
                                X
                              </button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <FileDropzone
            songOrder={songOrder}
            setSongOrder={setSongOrder}
            multiTracks={multiTracks}
            setMultiTracks={setMultiTracks}
            audioClips={audioClips}
            setAudioClips={setAudioClips}
          />
        </div>
        <div className={"flex justify-between gap-4 pt-5"}>
          <div className={"flex gap-4"}>
            <button
              className={"bg-white text-gray-800 font-bold px-4 py-3"}
              onClick={openModal}
            >
              Add Click Track
            </button>
            {/* <button className={"bg-white text-gray-800 font-bold px-4 py-3"}>
              Upload Track
            </button> */}
          </div>
          <button
            disabled={songOrder.length <= 0}
            className={
              "disabled:bg-gray-400 bg-white text-gray-800 font-bold px-4 py-3"
            }
            onClick={postBuildSet}
          >
            Build Ableton Set
          </button>
        </div>
        {/* Render the modal if isModalOpen is true */}
        {isModalOpen && (
          <AddClickTrackModal
            onClose={closeModal}
            onAddClickTrack={handleAddClickTrack}
          />
        )}
      </div>
    </div>
  );
}

function FileDropzone({
  songOrder,
  setSongOrder,
  multiTracks,
  setMultiTracks,
  audioClips,
  setAudioClips,
}: any) {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      const result = acceptedFiles.filter((obj: any) => {
        return obj.name.toLowerCase().indexOf("guide") !== -1;
      });
      let name = result[0].path;
      const songName = name.split("/")[1];
      const getTrackInfo = async (file: any) => {
        try {
          const formData = new FormData();
          formData.append("session", file);

          const response = await fetch("http://localhost:8080/song", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to upload file");
          }

          const trackInfoRes = await response.json();
          return trackInfoRes;
        } catch (e) {
          return console.log(e);
        }
      };
      // separate
      let clips: any = [];
      let trax: any = [];
      let coverImgSrc: any;
      const promises = acceptedFiles.map(async (file: any) => {
        if (
          file.path.toLowerCase().includes("/multitracks/") &&
          file.name.toLowerCase().indexOf("click") === -1 &&
          file.name.toLowerCase().indexOf("asd") === -1
        ) {
          const clipItems = [...audioClips, file];
          setAudioClips(clipItems);

          clips.push({
            name: file.name,
            path: file.path,
          });

          trax.push(file);
        }

        // handle img
        if (file.path.toLowerCase().includes("jpg")) {
          // Create a data URL for the image
          const reader = new FileReader();
          reader.onload = (e) => {
            coverImgSrc = e?.target?.result;
          };
          reader.readAsDataURL(file);
        }

        if (file.name.toLowerCase().indexOf(".als") !== -1) {
          try {
            const res = await getTrackInfo(file);

            let songName = file.path;
            const songNameParsed = songName.split("/")[1].split("-")[0];

            const items = [
              ...songOrder,
              {
                id: (Date.now() + Math.random()).toString().replace(".", ""),
                name: songNameParsed,
                bpm: res?.bpm,
                time_signature_top: res?.time_signature_top,
                time_signature_bottom: res?.time_signature_bottom,
                track: true,
                key: "0",
                duration: res?.duration,
                clips: clips,
                img: coverImgSrc,
              },
            ];

            setSongOrder(items);
          } catch (error) {
            console.error(`Error processing file ${file.name}:`, error);
          }
        }
      });

      Promise.all(promises)
        .then(() => {
          // All asynchronous operations completed
          // You can perform any additional actions here if needed
        })
        .catch((error) => {
          console.error("Error processing files:", error);
        });

      const trackItems = Array.from(multiTracks);
      trackItems.push({ name: songName, clips: trax });
      setMultiTracks(trackItems);

      if (acceptedFiles.length <= 1) {
        window.alert("Please upload the folder containing all the files");
      } else {
      }
    },
    [songOrder, multiTracks, audioClips]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`cursor-pointer flex items-center justify-center bg-transparent h-64 w-full py-5`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className={`cursor-pointer font-semibold text-xl text-center`}>
          Drop MultiTrack Folder Here...
        </p>
      ) : (
        <p className={`cursor-pointer font-semibold text-xl text-center`}>
          Drag MultiTrack Folder Here or Click to Upload
        </p>
      )}
    </div>
  );
}

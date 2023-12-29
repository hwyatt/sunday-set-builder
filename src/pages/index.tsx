import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [songOrder, setSongOrder] = useState<any[]>([]);
  const [multiTracks, setMultiTracks] = useState<any[]>([]);
  const [audioClips, setAudioClips] = useState<any[]>([]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(songOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongOrder(items);
  }

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
                                className="pr-2 mr-2 text-gray-500 hover:text-gray-700"
                                onClick={() => console.log(`edit ${song.name}`)}
                              >
                                Edit
                              </button>
                              <button
                                className="mr-2 text-gray-500 hover:text-gray-700"
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
        </div>
        <div className={"flex justify-between gap-4 pt-5"}>
          <div className={"flex gap-4"}>
            <button className={"bg-white text-gray-800 font-bold px-4 py-3"}>
              Add Click Track
            </button>
            <button className={"bg-white text-gray-800 font-bold px-4 py-3"}>
              Upload Track
            </button>
          </div>
          <button className={"bg-white text-gray-800 font-bold px-4 py-3"}>
            Build Ableton Set
          </button>
        </div>
        <FileDropzone
          songOrder={songOrder}
          setSongOrder={setSongOrder}
          multiTracks={multiTracks}
          setMultiTracks={setMultiTracks}
          audioClips={audioClips}
          setAudioClips={setAudioClips}
        />
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
    <div className={`bg-gray-200 h-32 w-full`} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

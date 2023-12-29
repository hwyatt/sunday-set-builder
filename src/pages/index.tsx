import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const songList = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/Graves_into_Gardens_by_Elevation_Worship_%28Official_Album_Cover%29.png",
    bpm: 128,
    timeSignature: "4/4",
    hasTrack: false,
    key: "A",
    duration: "4:32",
  },
  {
    id: "cato",
    name: "Little Cato",
    thumb:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/Graves_into_Gardens_by_Elevation_Worship_%28Official_Album_Cover%29.png",
    bpm: 128,
    timeSignature: "6/8",
    hasTrack: true,
    key: "A",
    duration: "4:32",
  },
  {
    id: "kvn",
    name: "KVN",
    thumb:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/Graves_into_Gardens_by_Elevation_Worship_%28Official_Album_Cover%29.png",
    bpm: 128,
    timeSignature: "3/4",
    hasTrack: false,
    key: "A",
    duration: "4:32",
  },
  {
    id: "mooncake",
    name: "Mooncake",
    thumb:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/Graves_into_Gardens_by_Elevation_Worship_%28Official_Album_Cover%29.png",
    bpm: 128,
    timeSignature: "4/4",
    hasTrack: false,
    key: "A",
    duration: "4:32",
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    thumb:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/Graves_into_Gardens_by_Elevation_Worship_%28Official_Album_Cover%29.png",
    bpm: 128,
    timeSignature: "4/4",
    hasTrack: true,
    key: "A",
    duration: "4:32",
  },
];

export default function Home() {
  const [songs, updateSongs] = useState(songList);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateSongs(items);
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
                  {songs.map(
                    (
                      {
                        id,
                        name,
                        thumb,
                        bpm,
                        timeSignature,
                        hasTrack,
                        key,
                        duration,
                      },
                      index
                    ) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
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
                                  src={thumb}
                                  alt={`${name} Thumb`}
                                />
                              </div>
                              <div className={"flex flex-col gap-2"}>
                                <p className={`text-md font-bold text-black`}>
                                  {name}
                                </p>
                                <div
                                  className={
                                    "flex flex-col gap-1 justify-content-center"
                                  }
                                >
                                  <p
                                    className={`text-xs font-semibold text-gray-500`}
                                  >
                                    Key: {key}
                                  </p>
                                  <p
                                    className={`text-xs font-semibold text-gray-500`}
                                  >
                                    BPM: {bpm}
                                  </p>
                                  <p
                                    className={`text-xs font-semibold text-gray-500`}
                                  >
                                    Time Sig: {timeSignature}
                                  </p>
                                  <p
                                    className={`text-xs font-semibold text-gray-500`}
                                  >
                                    Duration: {duration}
                                  </p>
                                </div>
                              </div>
                              {/* Edit button */}
                              <button
                                className="absolute top-0 right-0 p-2 mr-2 text-gray-500 hover:text-gray-700"
                                onClick={() => console.log(`edit ${name}`)}
                              >
                                Edit
                              </button>
                            </li>
                          )}
                        </Draggable>
                      );
                    }
                  )}
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
      </div>
    </div>
  );
}

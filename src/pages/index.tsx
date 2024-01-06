import AddClickTrackModal from "@/components/AddClickTrackModal";
import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import DeleteSongModal from "@/components/DeleteSongModal";
import { MdEdit, MdDelete } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import LoadingOverlay from "react-loading-overlay-ts";
import { Audio } from "react-loader-spinner";
import EditSongModal, { calculateKey } from "@/components/EditSongModal";
import DownloadModal from "@/components/DownloadModal";
import Link from "next/link";
import JSZip from "jszip";
import { downloadZip } from "client-zip";

const BASE_URL = `https://sunday-set-api.onrender.com`;
// const BASE_URL = `http://localhost:8080`;

const createZip = async (tracks) => {
  // client-zip working better until it doesn't
  console.log("started");
  let files: any = [];
  tracks.map((track) => {
    track.clips.forEach((clip) => {
      files.push({ name: `${track.name}/${clip.name}`, input: clip.content });
    });
  });
  try {
    // get the ZIP stream in a Blob
    const blob = await downloadZip(files).blob();

    // make and click a temporary link to download the Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MultiTracks.zip";
    link.click();
    link.remove();
    console.log("finished");
  } catch (err) {
    console.log(err);
  }

  // JSZIP: create zip for each song
  // const zipPromises = tracks.map(async (track) => {
  //   const zip = new JSZip();
  //   const songFolder = zip.folder(`MultiTracks/${track.name}`);

  //   track.clips.forEach((clip, clipIndex) => {
  //     const clipName = `${clip.name}`;
  //     console.log(clipName);
  //     console.log(clip.content);

  //     songFolder.file(clipName, clip.content);
  //   });

  //   const zipBlob = await zip.generateAsync({ type: "blob" });

  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = URL.createObjectURL(zipBlob);
  //   downloadLink.download = `${track.name}.zip`;

  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();

  //   document.body.removeChild(downloadLink);
  //   URL.revokeObjectURL(downloadLink.href);

  //   return `${track.name}.zip`;
  // });

  // try {
  //   const zipFiles = await Promise.all(zipPromises);
  //   console.log("All tracks zipped successfully:", zipFiles);
  // } catch (error) {
  //   console.error("Error zipping tracks:", error);
  // }
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [songOrder, setSongOrder] = useState<any[]>([]);
  const [multiTracks, setMultiTracks] = useState<any[]>([]);
  const [audioClips, setAudioClips] = useState<any[]>([]);
  const [trackFiles, setTrackFiles] = useState<any[]>([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);

  const [songToDeleteId, setSongToDeleteId] = useState("");
  const [songToEditId, setSongToEditId] = useState("");
  const [setToDownloadId, setSetToDownloadId] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openDeleteModal = (id: string) => {
    setDeleteModalOpen(true);
    setSongToDeleteId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openEditModal = (songId: string) => {
    setSongToEditId(songId);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSongToEditId("");
    setEditModalOpen(false);
  };

  const openDownloadModal = (setId: string) => {
    setSetToDownloadId(setId);
    setDownloadModalOpen(true);
  };

  const closeDownloadModal = () => {
    setSetToDownloadId("");
    setDownloadModalOpen(false);
  };

  const handleAddClickTrack = ({ clickName, clickBPM, clickTime }: any) => {
    const items = Array.from(songOrder);
    const timeTop = clickTime === "4/4" ? "4" : "6";
    const timeBottom = clickTime === "4/4" ? "4" : "8";
    const duration = timeTop === "4" ? "4" : "3";

    items.push({
      id: (Date.now() + Math.random()).toString().replace(".", ""),
      name: clickName,
      bpm: clickBPM,
      originalBPM: clickBPM,
      time_signature_top: timeTop,
      time_signature_bottom: timeBottom,
      track: false,
      key: "0",
      duration: duration,
      clips: [],
      img: "/metronome.png",
    });
    setSongOrder(items);
  };

  const handleDeleteSong = () => {
    const updatedSongOrder = songOrder.filter(
      (song) => song.id !== songToDeleteId
    );
    setSongOrder(updatedSongOrder);
  };

  const handleEditSong = (songId: string, songBPM: string, songKey: string) => {
    const updatedSongOrder = songOrder.map((song) => {
      if (song.id === songId) {
        return {
          ...song,
          bpm: songBPM !== undefined ? songBPM : song.bpm,
          key: songKey !== undefined ? songKey : song.key,
        };
      }
      return song;
    });

    setSongOrder(updatedSongOrder);
  };

  const handleDownloadSet = () => {
    window.open(`${BASE_URL}/download?id=${setToDownloadId}`);
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(songOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongOrder(items);
  }

  const postBuildSet = async () => {
    try {
      setIsLoading(true);
      createZip(trackFiles);
      const formData = new FormData();
      formData.append("json", JSON.stringify(songOrder));

      // for (let i = 0; i < multiTracks.length; i++) {
      //   for (let j = 0; j < multiTracks[i].clips.length; j++) {
      //     formData.append(multiTracks[i].name, multiTracks[i].clips[j]);
      //   }
      // }

      const response = await fetch(`${BASE_URL}/set`, {
        method: "POST",
        body: formData,
      });

      const setInfoRes = await response.json();
      const downloadSet = window.open(
        `${BASE_URL}/download?id=${setInfoRes.id}`
      );
      if (downloadSet == null || typeof downloadSet == "undefined") {
        openDownloadModal(setInfoRes.id);
      }
    } catch (e) {
      return console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingOverlay
      active={isLoading}
      spinner={
        <Audio
          height="100"
          width="100"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperClass={"mb-4"}
        />
      }
      // text="Building your Ableton set. This may take a minute..."
      styles={{
        overlay: (base) => ({
          ...base,
          position: "fixed",
          height: "100vh", // Set the height to 100% of the viewport
        }),
      }}
    >
      <div className="bg-gray-600 p-5 mb-5">
        <div style={{ maxWidth: "1280px" }} className="mx-auto">
          <div className={"pb-5 border-b"}>
            <header className="App-header flex flex-col md:flex-row justify-between md:items-center mb-5 border-b">
              <div className={"flex items-center mb-4 md:mb-3"}>
                <Image
                  src={"/ssb_logo.png"}
                  alt={"ssb_logo"}
                  width={50}
                  height={50}
                  priority
                  className={"mr-3"}
                />
                <h1 className={`text-3xl md:text-4xl font-semibold uppercase`}>
                  Sunday Set Builder
                </h1>
              </div>

              <Link
                className={"flex items-center font-semibold pb-3"}
                href="/how"
                target="_blank"
                rel="noopener noreferrer"
              >
                How It Works
                <RiExternalLinkLine className={"ml-2"} />
              </Link>
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
                                <Image
                                  className={`w-full h-auto`}
                                  src={song.img}
                                  alt={`${name} Thumb`}
                                  height={150}
                                  width={150}
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
                                    Key:{" "}
                                    {song.displayKey !== undefined
                                      ? song.key === "0"
                                        ? song.displayKey
                                        : calculateKey(
                                            song.displayKey,
                                            Number(song.key)
                                          )
                                      : "-"}
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
                                    Duration:{" "}
                                    {song.clips.length !== 0
                                      ? song.duration
                                      : `Click Loop`}
                                  </p>
                                </div>
                              </div>
                              {/* Edit button */}
                              <div className={"absolute top-0 right-0 p-2"}>
                                <button
                                  className="text-2xl font-bold mr-2 text-gray-600 hover:text-gray-800"
                                  onClick={() => openEditModal(song.id)}
                                >
                                  <MdEdit />
                                </button>
                                <button
                                  className="text-2xl font-bold text-gray-600 hover:text-gray-800"
                                  onClick={() => openDeleteModal(song.id)}
                                >
                                  <MdDelete />
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
              setIsLoading={setIsLoading}
              trackFiles={trackFiles}
              setTrackFiles={setTrackFiles}
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
          {isDeleteModalOpen && (
            <DeleteSongModal
              onClose={closeDeleteModal}
              onDeleteSong={handleDeleteSong}
            />
          )}
          {isEditModalOpen && songToEditId && (
            <EditSongModal
              onClose={closeEditModal}
              onEditSong={handleEditSong}
              song={songOrder.find((song) => song.id === songToEditId)}
            />
          )}
          {isDownloadModalOpen && setToDownloadId && (
            <DownloadModal
              id={setToDownloadId}
              onClose={closeDownloadModal}
              onDownloadSet={handleDownloadSet}
            />
          )}
        </div>
        <button onClick={() => createZip(trackFiles)}>Click me</button>
      </div>
    </LoadingOverlay>
  );
}

function FileDropzone({
  songOrder,
  setSongOrder,
  multiTracks,
  setMultiTracks,
  audioClips,
  setAudioClips,
  setIsLoading,
  trackFiles,
  setTrackFiles,
}: any) {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const result = acceptedFiles.filter((obj: any) => {
        return obj.name.toLowerCase().indexOf("guide") !== -1;
      });
      let name = result[0].path;
      let displayKey: string = "";
      try {
        displayKey = name.split("-")[2];
      } catch (err) {
        console.log("Could not get key from string: ", err);
      }
      const songName = name.split("/")[1];
      const getTrackInfo = async (file: any) => {
        try {
          setIsLoading(true);
          const formData = new FormData();
          formData.append("session", file);

          const response = await fetch(`${BASE_URL}/song`, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to process file");
          }

          const trackInfoRes = await response.json();
          return trackInfoRes;
        } catch (e) {
          return console.log(e);
        } finally {
          setIsLoading(false);
        }
      };

      const readFileAsArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();

          fileReader.onload = (event) => {
            resolve(event.target.result);
          };

          fileReader.onerror = (event) => {
            reject(new Error("Error reading file."));
          };

          fileReader.readAsArrayBuffer(file);
        });
      };
      // separate
      let clips: any = [];
      let trax: any = [];
      let trax2: any = [];
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

          const fileContents = await readFileAsArrayBuffer(file);
          const blob = new Blob([fileContents], { type: file.type });
          const trackHref = URL.createObjectURL(blob);
          const trackName = file.name;

          // // Create a download link
          // const downloadLink = document.createElement("a");
          // downloadLink.href = URL.createObjectURL(blob);
          // downloadLink.download = file.name;

          // // Trigger a click event on the link to start the download
          // downloadLink.click();

          trax2.push({ name: trackName, content: blob });
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
                originalBPM: res?.bpm,
                time_signature_top: res?.time_signature_top,
                time_signature_bottom: res?.time_signature_bottom,
                track: true,
                key: "0",
                displayKey: displayKey,
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
        .then(() => {})
        .catch((error) => {
          console.error("Error processing files:", error);
        });

      const trackItems = Array.from(multiTracks);
      trackItems.push({ name: songName, clips: trax });
      setMultiTracks(trackItems);
      const trackFileArray = Array.from(trackFiles);
      trackFileArray.push({ name: songName, clips: trax2 });
      setTrackFiles(trackFileArray);

      if (acceptedFiles.length <= 1) {
        window.alert("Please add the parent folder containing all the files");
      } else {
      }
    },
    [
      songOrder,
      multiTracks,
      audioClips,
      setAudioClips,
      setMultiTracks,
      setSongOrder,
      setIsLoading,
      trackFiles,
      setTrackFiles,
    ]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`cursor-pointer flex flex-col items-center justify-center bg-transparent h-64 w-full py-5`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Image
        src="/folder.png"
        width={150}
        height={150}
        alt="Add Tracks Icon"
        priority
      />
      {isDragActive ? (
        <p className={`cursor-pointer font-semibold text-xl text-center`}>
          Drop MultiTrack Folder Here...
        </p>
      ) : (
        <p className={`cursor-pointer font-semibold text-xl text-center`}>
          Drag MultiTrack Folder Here or Click to Add
        </p>
      )}
    </div>
  );
}

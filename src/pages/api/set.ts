import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(200).send("Set POSTed");

    //     const json = JSON.parse(req.body.json);
    //   const setlist = json;
    //   const downloadSid = crypto
    //     .createHash("md5")
    //     .update(Math.random().toString())
    //     .digest("hex");

    //   await copyDir("Automated Session", `AutomatedSession-${downloadSid}`);

    //   try {
    //     if (!req.files) {
    //       // res.send({
    //       //   status: false,
    //       //   message: "No file uploaded",
    //       // });
    //     } else {
    //       let data = [];

    //       //loop all files
    //       _.forEach(_.keysIn(req.files), (key) => {
    //         let clips = req.files[key];

    //         for (let i = 0; i < clips.length; i++) {
    //           clips[i].mv(
    //             `./AutomatedSession-${downloadSid}/MultiTracks/` +
    //               "/" +
    //               key +
    //               "/" +
    //               clips[i].name
    //           );
    //         }
    //       });
    //     }
    //     // read XML
    //     fs.readFile("components/Skeleton.xml", "utf-8", function (err, data) {
    //       if (err) console.log(err);

    //       // convert to JS
    //       // we then pass the data to our method here
    //       parseString(data, function (err, result) {
    //         if (err) console.log(err);

    //         // array for float events (tempo changes)
    //         let floatEventsArray =
    //           result.Ableton.LiveSet[0].MasterTrack[0].AutomationEnvelopes[0]
    //             .Envelopes[0].AutomationEnvelope[1].Automation[0].Events[0]
    //             .FloatEvent;
    //         // array for locators of songs and loops
    //         let locatorsArray =
    //           result.Ableton.LiveSet[0].Locators[0].Locators[0].Locator;
    //         // array for click clips
    //         let clickArray =
    //           result.Ableton.LiveSet[0].Tracks[0].MidiTrack[1].DeviceChain[0]
    //             .MainSequencer[0].ClipTimeable[0].ArrangerAutomation[0].Events[0]
    //             .MidiClip;
    //         // array for tempo clips
    //         let tempoArray =
    //           result.Ableton.LiveSet[0].Tracks[0].AudioTrack[0].DeviceChain[0]
    //             .MainSequencer[0].Sample[0].ArrangerAutomation[0].Events[0]
    //             .AudioClip;
    //         // array for guide clips
    //         let guideArray =
    //           result.Ableton.LiveSet[0].Tracks[0].AudioTrack[1].DeviceChain[0]
    //             .MainSequencer[0].Sample[0].ArrangerAutomation[0].Events[0]
    //             .AudioClip;
    //         // array for loop clips
    //         let loopTriggerArray =
    //           result.Ableton.LiveSet[0].Tracks[0].MidiTrack[0].DeviceChain[0]
    //             .MainSequencer[0].ClipTimeable[0].ArrangerAutomation[0].Events[0]
    //             .MidiClip;
    //         // array for artist audio tracks
    //         let audioTrackArray = result.Ableton.LiveSet[0].Tracks[0].AudioTrack;

    //         let timeChangeArray =
    //           result.Ableton.LiveSet[0].MasterTrack[0].AutomationEnvelopes[0]
    //             .Envelopes[0].AutomationEnvelope[0].Automation[0].Events[0]
    //             .EnumEvent;

    //         // result.Ableton.LiveSet[0].Tracks[0].GroupTrack = [];
    //         // let groupTrackArray = result.Ableton.LiveSet[0].Tracks[0].GroupTrack;

    //         let id = 10000;
    //         let startTime = 8;
    //         let trackIndex = 4;
    //         let currentTimeSig = "4";

    //         for (let i = 0; i < setlist.length; i++) {
    //           let endTime;
    //           const loopNote = setlist[i].time_signature_top === "4" ? "2" : "1.5";

    //           if (setlist[i].track === false) {
    //             endTime = (
    //               parseFloat(startTime) + parseFloat(setlist[i].duration)
    //             ).toString();

    //             loopTrigger.createLoopTrigger(
    //               id++,
    //               startTime,
    //               endTime,
    //               loopNote,
    //               loopTriggerArray
    //             );
    //           } else {
    //             const loopBars = setlist[i].time_signature_top === "4" ? 4 : 3;

    //             endTime = (
    //               parseFloat(
    //                 getNumberOfBars(
    //                   setlist[i].duration,
    //                   setlist[i].bpm,
    //                   setlist[i].time_signature_top
    //                 )
    //               ) +
    //               parseFloat(startTime) +
    //               loopBars
    //             ).toString();

    //             loopTrigger.createLoopTrigger(
    //               id++,
    //               (parseFloat(endTime) - 4).toString(),
    //               endTime,
    //               loopNote,
    //               loopTriggerArray
    //             );

    //             locator.createLocator(
    //               id++,
    //               "LOOP",
    //               (parseFloat(endTime) - 4).toString(),
    //               "",
    //               locatorsArray
    //             );

    //             // "-1" - testing with no groupings
    //             // id++; - what we'll use once grouping works
    //             const trackGroupId = "-1";

    //             let tracksTestContainer = [];
    //             // insert tracks for songs
    //             for (let j = 0; j < setlist[i].clips.length; j++) {
    //               const clipName = setlist[i].clips[j].name;

    //               // if it's a guide clip, put it in the GUIDE track
    //               if (clipName.includes("Guide")) {
    //                 audioClip.createAudioClip(
    //                   id++,
    //                   clipName.toUpperCase(),
    //                   setlist[i].clips[j].path,
    //                   startTime,
    //                   endTime,
    //                   guideArray
    //                 );
    //                 continue;
    //               }

    //               if (clipName.toLowerCase().includes("click")) {
    //                 // don't push original click track
    //                 continue;
    //               }

    //               // put together group track in audioTrackArray - come back and rename xml to GroupTrack based on ID
    //               // if (j === 0) {
    //               //   console.log(trackGroupId);
    //               //   groupTrack.createGroupTrack(
    //               //     trackGroupId,
    //               //     setlist[i].name,
    //               //     audioTrackArray
    //               //   );
    //               // }
    //               audioTrackAndClip.createAudioTrackAndClip(
    //                 id++,
    //                 setlist[i].clips[j].name,
    //                 trackGroupId,
    //                 setlist[i].clips[j].path,
    //                 startTime,
    //                 endTime,
    //                 setlist[i].bpm,
    //                 setlist[i].key,
    //                 audioTrackArray
    //               );
    //             }
    //           }

    //           const bpm = setlist[i].bpm;
    //           const songName = setlist[i].name;

    //           floatEvent.createFloatEvent(id++, startTime, bpm, floatEventsArray);
    //           floatEvent.createFloatEvent(id++, endTime, bpm, floatEventsArray);

    //           locator.createLocator(
    //             id++,
    //             `${i + 1}:: ${songName.toUpperCase()}`,
    //             startTime,
    //             `${i + 1}`,
    //             locatorsArray
    //           );

    //           if (currentTimeSig !== setlist[i].time_signature_top) {
    //             timeChange.createTimeChange(
    //               id++,
    //               startTime,
    //               setlist[i].time_signature_top,
    //               timeChangeArray
    //             );
    //             currentTimeSig = setlist[i].time_signature_top;
    //           }

    //           clickTrack.createClick(
    //             id++,
    //             startTime,
    //             endTime,
    //             setlist[i].time_signature_top,
    //             clickArray
    //           );

    //           tempo.createTempoClip(id++, startTime, endTime, bpm, tempoArray);

    //           id++;
    //           startTime = (parseFloat(endTime) + 8).toString();
    //         }

    //         // floatEventsArray.shift();
    //         locatorsArray.shift();
    //         clickArray.shift();
    //         tempoArray.shift();
    //         loopTriggerArray.shift();
    //         guideArray.shift();

    //         // write to new XML file
    //         var builder = new xml2js.Builder();
    //         var xml = builder.buildObject(result);

    //         // convert to Ableton session file
    //         fs.writeFile(
    //           `AutomatedSession-${downloadSid}/Session.als`,
    //           xml,
    //           function (err, data) {
    //             if (err) console.log(err);

    //             console.log("successfully written our update xml to file");

    //             // working zip and download
    //             const child_process = require("child_process");
    //             child_process.execSync(`zip -r AutomatedSession-${downloadSid} *`, {
    //               cwd: `AutomatedSession-${downloadSid}`,
    //             });

    //             res.send({ id: downloadSid });
    //           }
    //         );
    //       });
    //     });
    //   } catch (err) {
    //     res.status(500).send(err);
    //   }
  } else {
    // Handle any other HTTP method
    res.status(500).send("Not a POST");
  }
}

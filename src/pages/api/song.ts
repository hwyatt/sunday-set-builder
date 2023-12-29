import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(200).send("Song POSTed");
    // try {
    //     if (!req.files) {
    //       res.send({
    //         status: false,
    //         message: "No file uploaded",
    //       });
    //     } else {
    //       let session = req.files.session;

    //       if (!fs.existsSync("./uploads")) {
    //         fs.mkdirSync("./uploads");
    //       }

    //       await session.mv("./uploads/" + session.name);

    //       let dest = "./uploads/MultiTrack.als";
    //       console.log(dest.lastIndexOf(".") + ".xml");

    //       gunzip("./uploads/MultiTrack.als", "./uploads/MultiTrack.xml", () => {
    //         console.log("gunzip done!");

    //         fs.readFile("./uploads/MultiTrack.xml", "utf-8", (err, data) => {
    //           if (err) {
    //             throw err;
    //           }

    //           parseString(data, function (err, result) {
    //             if (err) {
    //               throw err;
    //             }

    //             const bpm =
    //               result.Ableton.LiveSet[0].MasterTrack[0].MasterChain[0].Mixer[0]
    //                 .Tempo[0].ArrangerAutomation[0].Events[0].FloatEvent[0].$.Value;

    //             const timeSig =
    //               result.Ableton.LiveSet[0].MasterTrack[0].MasterChain[0].Mixer[0]
    //                 .TimeSignature[0].ArrangerAutomation[0].Events[0].EnumEvent[0].$
    //                 .Value;

    //             const start =
    //               result.Ableton.LiveSet[0].Tracks[0].AudioTrack[0].DeviceChain[0]
    //                 .MainSequencer[0].Sample[0].ArrangerAutomation[0].Events[0]
    //                 .AudioClip[0].CurrentStart[0].$.Value;

    //             const end =
    //               result.Ableton.LiveSet[0].Tracks[0].AudioTrack[0].DeviceChain[0]
    //                 .MainSequencer[0].Sample[0].ArrangerAutomation[0].Events[0]
    //                 .AudioClip[0].CurrentEnd[0].$.Value;

    //             const seconds = parseFloat(end) - parseFloat(start);
    //             const date = new Date(0);
    //             date.setSeconds(seconds); // specify value for SECONDS here
    //             const duration = date.toISOString().substr(14, 5);

    //             const timeTop = timeSig === "201" ? "4" : "6";
    //             const timeBottom = timeSig === "201" ? "4" : "8";

    //             res.send({
    //               bpm: bpm,
    //               time_signature_top: timeTop,
    //               time_signature_bottom: timeBottom,
    //               duration: duration,
    //             });

    //             fs.rmdirSync("./uploads", { recursive: true });
    //           });
    //         });
    //       });
    //     }
    //   } catch (err) {
    //     res.status(500).send(err);
    //   }
  } else {
    // Handle any other HTTP method
    res.status(500).send("Not a POST");
  }
}

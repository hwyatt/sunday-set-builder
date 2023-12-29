import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const id = req.query.id;
    res.status(200).send(id);

    // const filePath = path.join(
    //   process.cwd(),
    //   `AutomatedSession-${id}/AutomatedSession-${id}.zip`
    // );

    // res.setHeader(
    //   "Content-Disposition",
    //   `attachment; filename=AutomatedSession-${id}.zip`
    // );

    // const fileStream = fs.createReadStream(filePath);
    // fileStream.pipe(res);

    // fileStream.on("close", () => {
    //   // Delete the directory after the download is complete
    //   fs.rmdirSync(`AutomatedSession-${id}`, { recursive: true });
    // });

    // fileStream.on("error", (err) => {
    //   console.error(err);
    //   res.status(500).end("Internal Server Error");
    // });
  } else {
    res.status(405).end("Method Not Allowed");
  }
}

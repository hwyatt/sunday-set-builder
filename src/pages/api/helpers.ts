import path from "path";

export const timeStringToFloat = (time: any) => {
  const minutesSeconds = time.split(/[.:]/);
  const minutes = parseInt(minutesSeconds[0], 10);
  const seconds = minutesSeconds[1] ? parseInt(minutesSeconds[1], 10) : 0;
  return (minutes + seconds / 60).toFixed(2);
};

export const getNumberOfBars = (time: any, bpm: any, timeSignatureTop: any) => {
  const bars =
    parseFloat(timeStringToFloat(time)) *
    (parseFloat(bpm) / Number(timeSignatureTop));
  return Math.ceil(bars * 4).toString();
};

export async function copyDir(src: any, dest: any) {
  const { promises: fsc } = require("fs");
  await fsc.mkdir(dest, { recursive: true });
  let entries = await fsc.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fsc.copyFile(srcPath, destPath);
  }
}

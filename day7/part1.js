const fs = require("fs");
const get = require("lodash.get");
const set = require("lodash.set");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

let files = {
  "/": { files: [], size: 0 },
};

let workingDirectory = [];
for (let [index, line] of allLines.entries()) {
  if (line === "$ cd ..") {
    //go up a directory, so remove the last item in the working directory
    workingDirectory.pop();

    //we are leaving a
  } else if (line.includes("$ cd")) {
    //going into a directory, so add that to the path
    const folderName = line.split("cd ")[1];
    workingDirectory.push(folderName);
  } else if (line === "$ ls") {
    //ignore, just listing out the files
  } else if (line.includes("dir")) {
    //result of an ls, folder, so create an empty object for the folder
    const folderName = line.split("dir ")[1];
    set(files, `${workingDirectory.join(".")}.${folderName}`, {
      files: [],
      size: 0,
    });
  } else {
    //files are the only command left
    const [sizeStr, name] = line.split(" ");
    const size = parseInt(sizeStr);
    const currentFolder = get(files, `${workingDirectory.join(".")}.files`);
    set(files, `${workingDirectory.join(".")}.files`, [
      ...currentFolder,
      { size, name },
    ]);

    for (let i = workingDirectory.length; i > 0; i--) {
      const pathToUpdateSize = workingDirectory.slice(0, i);
      const currentSize = get(files, `${pathToUpdateSize.join(".")}.size`);
      set(files, `${pathToUpdateSize.join(".")}.size`, currentSize + size);
    }
  }
}

let totalSize = 0;
const recursiveFolderCrawler = (folder) => {
  if (folder.size <= 100000) {
    totalSize += folder.size;
  }

  for (let [key, value] of Object.entries(folder)) {
    if (key !== "size" && key !== "files") {
      recursiveFolderCrawler(value);
    }
  }
};

recursiveFolderCrawler(files["/"]);

console.log(totalSize);

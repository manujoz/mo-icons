const fs = require("fs");
const path = require("path");

const iconsFolders = ["filled", "outlined", "round", "sharp", "two-tone"];
iconsFolders.forEach((folderName) => {
    const dirPath = path.join(__dirname, "icons", folderName);
    const svgFiles = fs.readdirSync(dirPath);
    const objectIcons = {};
    svgFiles.map((fileName) => {
        const fileContent = fs.readFileSync(path.join(dirPath, fileName), "utf-8");
        const iconName = fileName.split(".svg")[0];
        objectIcons[iconName] = fileContent;
    });

    fs.writeFileSync(
        path.join(__dirname, "..", "icons", `${folderName}.js`),
        `export default ${JSON.stringify(objectIcons)}`
    );
});

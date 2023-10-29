import fs from "fs";
import docJson from "../doc.json" assert { type: "json" };

const types = docJson.types;

// Write a markdown file with types json.
let head = "---\nlayout: default\ntitle: Type Reference\nnav-order: 4\n---\n";
let markdown =
    "# Mandarina Type Reference \n This is an automatically generated documentation of the types used in Mandarina. See it in [GitHub](https://github.com/lajbel/mandarina/wiki/Types)";
let mandarinaFunctions = "# Methods";
let mandarinaProperties = "# Properties";
let mandarinaTypes = "# Types";

// Process doc.json data
const files = {};

function constructType(types) {
    for (const type of Object.keys(types)) {
        if (type === "undefined") continue;
        const typeData = types[type];
        const fileContent = "";

        files[type] = {
            content: fileContent,
            type: typeData.type?.kind,
        };
    }

    for (const file of Object.keys(files)) {
        const fileContent = files[file].content;
        const type = files[file].type;

        fs.writeFileSync(
            "../mandarina.wiki/types/" + file + ".md",
            head + fileContent,
        );
    }
}

constructType(types);

// Create the type reference docs
fs.writeFileSync("../mandarina.wiki/Type Reference.md", head + markdown);

// Copy wiki in docs
for (const file of fs.readdirSync("../mandarina.wiki/")) {
    if (!file.endsWith(".md") || file.startsWith("_")) continue;
    if (file === "Home.md") {
        fs.copyFileSync("../mandarina.wiki/" + "Home.md", "docs/" + "index.md");
        continue;
    }
    fs.copyFileSync("../mandarina.wiki/" + file, "docs/" + file);
}

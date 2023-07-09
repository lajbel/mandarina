import fs from "fs";
import docjson from "../site/public/doc.json" assert { type: "json" };

const types = docjson.types;

// Write a markdown file with types json.
let markdown = "# Functions";

for (const member of Object.keys(types["MandarinaPlugin"][0].type.members)) {
    const data = types["MandarinaPlugin"][0].type.members[member][0];

    markdown += `\n\n## \`${data.name}\` \n${
        data.jsDoc?.doc ?? "No doc found."
    }`;
}

fs.writeFileSync("types.md", markdown);

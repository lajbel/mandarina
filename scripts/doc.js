import fs from "fs";
import docJson from "../site/public/doc.json" assert { type: "json" };

const types = docJson.types;

// Write a markdown file with types json.
let head = "---\nlayout: default\ntitle: Type Reference \nnav_order: 2\n---\n";
let markdown = "# Mandarina Type Reference";
let mandarinaFunctions = "# Functions";
let mandarinaProperties = "# Props";

// Functions
function fixValue(dataType) {
    if (dataType?.typeName)
        return `[${dataType.typeName}](#${dataType.typeName})`;

    switch (dataType?.kind) {
    case "NumberKeyword":
        return "`number`";
    case "StringKeyword":
        return "`string`";
    case "BooleanKeyword":
        return "`boolean`";
    case "AnyKeyword":
        return "`any`";
    case "NullKeyword":
        return "`null`";
    case "VoidKeyword":
        return "`void`";

    case "FunctionType":
        return funcType(dataType);
    case "ArrayKeyword":
        return "`[]`";
    case "ArrayType":
        return arrType(dataType);
    case "LiteralType":
        return litType(dataType);
    }
}

function funcType(type) {
    return `() => ${fixValue(type)}`;
}

for (const member of Object.keys(types["MandarinaPlugin"][0].type.members)) {
    const data = types["MandarinaPlugin"][0].type.members[member][0];

    if (data.kind === "MethodSignature") {
        mandarinaFunctions += `\n\n## \`${data.name}\`${funcType(
            data.type,
        )} \n ${data.jsDoc?.doc ?? "No doc found."}`;
    }
}

for (const type of Object.keys(types)) {
    if (type === "MandarinaPlugin" || type === "undefined") continue;
    const data = types[type][0];

    fixValue(data);
}

markdown += `\n\n${mandarinaFunctions}`;

fs.writeFileSync("docs/types.md", head + markdown);

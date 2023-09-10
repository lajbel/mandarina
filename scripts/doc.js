import fs from "fs";
import docJson from "../doc.json" assert { type: "json" };

const types = docJson.types;

// Write a markdown file with types json.
let head = "---\nlayout: default\ntitle: Type Reference\n---\n";
let markdown =
    "# Mandarina Type Reference \n This is an automatically generated documentation of the types used in Mandarina. See it in [GitHub](https://github.com/lajbel/mandarina/wiki/Types)";
let mandarinaFunctions = "# Methods";
let mandarinaProperties = "# Properties";
let mandarinaTypes = "# Types";

const kindAlias = {
    StringKeyword: "string",
    NumberKeyword: "number",
    BooleanKeyword: "boolean",
};

function getTypeKind(type) {
    if (!type) return "";
    if (type.kind === "TypeReference") {
        return type.typeName;
    } else if (type.kind === "UnionType") {
        return type.types.map(getTypeKind).join(" | ");
    } else if (type.kind === "LiteralType") {
        return type.literal.text;
    } else return kindAlias[type.kind];
}

function writeTypes(level, type) {
    let str = "";
    for (const t of type) {
        str += writeType(level, t);
    }
    return str;
}

function writeMembers(level, members) {
    let str = "";
    for (const member of Object.values(members)) {
        str += `\n${writeTypes(level, member)}`;
    }
    return str;
}

function writeType(level, type) {
    let str = "";
    str += `${"#".repeat(level)} \`${type.name}${
        type.questionToken ? "?" : ""
    }\``;

    if (type?.type?.members) {
        str += writeMembers(level + 1, type.type.members);
    } else {
        str += `: ${getTypeKind(type.type)}\n`;
    }

    return str;
}

// Write documentation
for (const type of Object.keys(types)) {
    if (type === "undefined") continue;

    mandarinaTypes += "\n" + writeTypes(2, types[type]);
}

markdown += `\n\n${mandarinaFunctions}\n\n${mandarinaTypes}`;

// Create the type reference docs
fs.writeFileSync("docs/Type Reference.md", head + markdown);
fs.writeFileSync("../mandarina.wiki/Type Reference.md", markdown);

// Copy wiki in docs
for (const file of fs.readdirSync("../mandarina.wiki/")) {
    if (!file.endsWith(".md")) continue;
    if (file === "Home.md" || file == "Type Reference.md") continue;
    fs.copyFileSync("../mandarina.wiki/" + file, "docs/" + file);
}

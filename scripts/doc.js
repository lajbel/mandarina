import fs from "fs";
import docJson from "../site/public/doc.json" assert { type: "json" };

const types = docJson.types;

// Write a markdown file with types json.
let head = "---\nlayout: default\ntitle: Type Reference \nnav_order: 2\n---\n";
let markdown = "# Mandarina Type Reference";
let mandarinaFunctions = "# Methods";
let mandarinaProperties = "# Props";
let mandarinaTypes = "# Types";

const kindAlias = {
    InterfaceDeclaration: "object",
    TypeAliasDeclaration: "type",
    StringKeyword: "string",
    NumberKeyword: "number",
    BooleanKeyword: "boolean",
    ArrayType: "array",
    TypeLiteral: "object",
    UnionType: "union",
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

fs.writeFileSync("docs/types.md", head + markdown);
fs.writeFileSync("../mandarina.wiki/Types.md", markdown);

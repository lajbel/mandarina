import docJson from "../site/public/doc.json" assert { type: "json" };

const types = docJson.types;

// Write a markdown file with types json.
const _head =
    "---\nlayout: default\ntitle: Type Reference \nnav_order: 2\n---\n";
let markdown =
    "# Mandarina Type Reference \n This is an automatically generated documentation of the types used in Mandarina. See it in [GitHub](https://github.com/lajbel/mandarina/wiki/Types)";
const mandarinaFunctions = "# Methods";
const _mandarinaProperties = "# Properties";
let mandarinaTypes = "# Types";

const kindAlias = {
    StringKeyword: "string",
    NumberKeyword: "number",
    BooleanKeyword: "boolean",
};

function getTypeKind(type: any) {
    if (!type) return "";
    if (type.kind === "TypeReference") {
        return type.typeName;
    } else if (type.kind === "UnionType") {
        return type.types.map(getTypeKind).join(" | ");
    } else if (type.kind === "LiteralType") {
        return type.literal.text;
    } else return kindAlias[type.kind as keyof typeof kindAlias];
}

function writeTypes(level = 0, type: any) {
    let str = "";
    for (const t of type) {
        str += writeType(level, t);
    }
    return str;
}

function writeMembers(level = 0, members: any) {
    let str = "";
    for (const member of Object.values(members)) {
        str += `\n${writeTypes(level, member)}`;
    }
    return str;
}

function writeType(level = 0, type: any) {
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

    mandarinaTypes += "\n" + writeTypes(2, types[type as keyof typeof types]);
}

markdown += `\n\n${mandarinaFunctions}\n\n${mandarinaTypes}`;

// Create the type reference document
const encoder = new TextEncoder();
const indexData = encoder.encode(markdown);

Deno.writeFileSync("../mandarina.wiki/Type Reference.md", indexData);

// Copy mandarina.wiki in docs/
for (const file of Deno.readDirSync("../mandarina.wiki/")) {
    if (!file.name.endsWith(".md")) continue;
    if (file.name == "Home.md") continue;
    Deno.copyFileSync("../mandarina.wiki/" + file, "docs/" + file);
}

Deno.copyFileSync("../mandarina.wiki/Home.md", "docs/index.md");

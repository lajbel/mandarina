// This file builds the project
import esbuild from "esbuild";
import fs from "fs";
import ts from "typescript";

const distDir = "dist";
const srcDir = "src";
const srcPath = "src/main.ts";

// Build all formats
const formats = [
    {
        format: "iife",
        globalName: "mandarina",
        outfile: `${distDir}/mandarina.js`,
        footer: {
            js: "window.mandarina = mandarina.default",
        },
    },
    { format: "cjs", outfile: `${distDir}/mandarina.cjs` },
    { format: "esm", outfile: `${distDir}/mandarina.mjs` },
];

const config = {
    bundle: true,
    sourcemap: true,
    minify: true,
    keepNames: true,
    loader: {
        ".png": "dataurl",
        ".glsl": "text",
        ".mp3": "binary",
    },
    entryPoints: [ srcPath ],
};

formats.forEach((fmt) => {
    esbuild
        .build({
            ...config,
            ...fmt,
        })
        .then(() => console.log(`-> ${fmt.outfile}`));
});

// Create d.ts file
function buildTypes() {
    let dts = fs.readFileSync(`${srcDir}/types.ts`, "utf-8");

    function writeFile(path, content) {
        fs.writeFileSync(path, content);
        console.log(`-> ${path}`);
    }

    const f = ts.createSourceFile("ts", dts, ts.ScriptTarget.Latest, true);

    function transform(o, f) {
        for (const k in o) {
            if (o[k] == null) {
                continue;
            }
            const v = f(k, o[k]);
            if (v != null) {
                o[k] = v;
            } else {
                delete o[k];
            }
            if (typeof o[k] === "object") {
                transform(o[k], f);
            }
        }
        return o;
    }

    // transform and prune typescript ast to a format more meaningful to us
    const stmts = transform(f.statements, (k, v) => {
        switch (k) {
        case "end":
        case "flags":
        case "parent":
        case "modifiers":
        case "transformFlags":
        case "modifierFlagsCache":
            return;
        case "name":
        case "typeName":
        case "tagName":
            return v.escapedText;
        case "pos":
            return typeof v === "number" ? undefined : v;
        case "kind":
            return ts.SyntaxKind[v];
        case "questionToken":
            return true;
        case "members": {
            const members = {};
            for (const mem of v) {
                const name = mem.name?.escapedText;
                if (!name || name === "toString") {
                    continue;
                }
                if (!members[name]) {
                    members[name] = [];
                }
                members[name].push(mem);
            }
            return members;
        }
        case "jsDoc": {
            const doc = v[0];
            const taglist = doc.tags ?? [];
            const tags = {};
            for (const tag of taglist) {
                const name = tag.tagName.escapedText;
                if (!tags[name]) {
                    tags[name] = [];
                }
                tags[name].push(tag.comment);
            }
            return {
                doc: doc.comment,
                tags: tags,
            };
        }
        default:
            return v;
        }
    });

    // contain the type data for doc gen
    const types = {};

    for (const stmt of stmts) {
        if (!types[stmt.name]) {
            types[stmt.name] = [];
        }

        types[stmt.name].push(stmt);
    }

    writeFile(
        "site/public/doc.json",
        JSON.stringify({
            types,
        }),
    );
}

buildTypes();

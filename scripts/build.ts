// This file builds the project
import esbuild, { BuildOptions } from "esbuild";
import ts from "typescript";

const distDir = "dist";
const srcPath = "src/main.ts";

// Build all formats
const formats: BuildOptions[] = [
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

const config: BuildOptions = {
    bundle: true,
    sourcemap: true,
    minify: true,
    keepNames: true,
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
    const dts = Deno.readFileSync(`${distDir}/types.d.ts`);
    const decoder = new TextDecoder("utf-8");
    const dtsString = decoder.decode(dts);

    function writeFile(path: string, content: string) {
        const encoder = new TextEncoder();
        const fileContent = encoder.encode(content);
        Deno.writeFileSync(path, fileContent);
        console.log(`-> ${path}`);
    }

    const f = ts.createSourceFile(
        "ts",
        dtsString,
        ts.ScriptTarget.Latest,
        true,
    );

    function transform(o: any, f: any) {
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
    const stmts = transform(f.statements, (k: string, v: any) => {
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
            const members: Record<string, any> = {};
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
            const tags: Record<string, any> = {};
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
    const types: Record<string, any> = {};

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

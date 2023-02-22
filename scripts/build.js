// This file builds the project
import esbuild from "esbuild";
import ts from "typescript";
import fs from "fs";

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
    esbuild.build({
        ...config,
        ...fmt,
    }).then(() => console.log(`-> ${fmt.outfile}`));
});

// Create d.ts file
function buildTypes() {
    let dts = fs.readFileSync(`${srcDir}/types.ts`, "utf-8");

    fs.writeFileSync(`${distDir}/mandarina.d.ts`, dts,);
}

buildTypes();
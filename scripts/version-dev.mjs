import fs from "node:fs";

const path = process.argv[2];

const ver = process.argv[3];

const content = fs.readFileSync(path, "utf-8");

const updated = content.replace(
    /\b(\d+\.\d+\.\d+)(-dev\.\d+)?\b/g,
    (_match, base, devSuffix) => {
        if (!ver) return base;
        return devSuffix ? base : `${base}-dev.${ver}`;
    },
);

fs.writeFileSync(path, updated, "utf-8");

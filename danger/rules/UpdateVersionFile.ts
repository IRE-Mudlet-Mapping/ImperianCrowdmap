import type { DangerDSLType } from "danger";
import { MapChangeRule } from "../classes/Rule.ts";

const versionFilePath = "Map/version.txt";

export const updateVersionFile = new MapChangeRule(
    async (danger: DangerDSLType) => {
        const versionFile = danger.git.fileMatch(versionFilePath);
        if (!versionFile.edited) {
            return false;
        }
        const versionFileDiff = await danger.git.diffForFile(versionFilePath);
        return parseInt(versionFileDiff.before) + 1 === parseInt(versionFileDiff.after);
    },
    "Updated `version.txt` by 1."
);

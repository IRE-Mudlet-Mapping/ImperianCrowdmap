import type { DangerDSLType } from "danger";
import { SanityCheckRule } from "../classes/Rule.ts";

export const updateMainMapFile = new SanityCheckRule(
  async (danger: DangerDSLType) => danger.git.fileMatch('Map/map').edited,
  "Main map file not edited. Are you sure you uploaded the file with the correct name?"
);

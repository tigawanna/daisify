import { safeJSONParse } from "#/src/utils/helpers/json/json";
import { readFile } from "fs/promises";
import { ShadcnProperties } from "./types";
import { findAndReplaceStringValues } from "#/src/utils/helpers/fs/findAndReplace";
import { resolveImport } from "#/src/utils/helpers/pkg-manager/tsconfig";
import { textPrompt } from "#/src/utils/helpers/clack/prompts";
import { loadConfig } from "tsconfig-paths";
import { TshadcnOptions } from "../shadcn-args";
import { printHelpers } from "#/src/utils/helpers/print-tools";

export async function daisyfyShadcn(options?:TshadcnOptions) {
  try {
    const shadcn_config = await safeJSONParse<ShadcnProperties>(
      await readFile("components.json", "utf8")
    );
    const tsConfig = await loadConfig(".");

    // @ts-expect-error
    const aliased_directory = await resolveImport(shadcn_config.aliases?.["components"], tsConfig);
 
    const components_directory =
    options?.dir??
      aliased_directory + "/ui" ??
      (await textPrompt({
        message: "where are your  shadcn components?",
        initialValue: "src/components/ui",
      }));

    await findAndReplaceStringValues({
      dir_path: components_directory,
      target: [
        {
          find: "primary-foreground",
          replace: "primary-content",
        },
        {
          find: "secondary-foreground",
          replace: "secondary-content",
        },
        {
          find: "accent-foreground",
          replace: "accent-content",
        },
      ],
    });
  } catch (error: any) {
      printHelpers.error("error running daisify shadcn" + error);
      throw error
  }
}

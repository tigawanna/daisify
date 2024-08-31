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
      options?.dir ??
      aliased_directory + "/ui" ??
      (await textPrompt({
        message: "where are your  shadcn components?",
        initialValue: "src/components/ui",
      }));

    // --background: 0 0% 100%;
    // --foreground: 222.2 47.4% 11.2%;

    // --primary: 222.2 47.4% 11.2%;
    // --primary-foreground: 210 40% 98%

    // --secondary: 210 40% 96.1%;
    // --secondary-foreground: 222.2 47.4% 11.2%;

    // --accent: 210 40% 96.1%;
    // --accent-foreground: 222.2 47.4% 11.2%;

    // --muted: 210 40% 96.1%;
    // --muted-foreground: 215.4 16.3% 46.9%;

    // --card: 0 0% 100%;
    // --card-foreground: 222.2 47.4% 11.2%;

    // --popover: 0 0% 100%;
    // --popover-foreground: 222.2 47.4% 11.2%;

    // --border: 214.3 31.8% 91.4%;
    // --input: 214.3 31.8% 91.4%;

    // --destructive: 0 100% 50%;
    // --destructive-foreground: 210 40% 98%;

    // --ring: 215 20.2% 65.1%;
    // --radius: 0.5rem;

    await findAndReplaceStringValues({
      dir_path: components_directory,
      target: [
        {
          find: "bg-foreground",
          replace: "bg-base-content",
        },
        {
          find: "bg-background",
          replace: "bg-base-100",
        },
        {
          find: "text-foreground",
          replace: "text-base-content",
        },
        {
          find: "text-background",
          replace: "text-base-100",
        },

        {
          find: "-card",
          replace: "-base-300",
        },
        {
          find: "-card-foreground",
          replace: "-base-content",
        },
        {
          find: "-primary-foreground",
          replace: "-primary-content",
        },
        {
          find: "-secondary-foreground",
          replace: "-secondary-content",
        },
        {
          find: "-accent-foreground",
          replace: "-accent-content",
        },
        {
          find: "-muted",
          replace: "-base-200",
        },
        {
          find: "-muted-foreground",
          replace: "-base-content",
        },
        {
          find: "-background",
          replace: "-base-100",
        },
        {
          find: "-destructive",
          replace: "-error",
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

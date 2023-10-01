import { createMatchPath, type ConfigLoaderSuccessResult } from "tsconfig-paths"
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { safeJSONParse } from "../json/json";
import { ITsConfig } from "./types";

export async function getTsConfig(){
   try {
    if(existsSync("tsconfig.json")){
        const ts_config_json = await safeJSONParse<ITsConfig>(await readFile("tsconfig.json", {
            encoding: "utf-8",
        }))

        return ts_config_json
    }

   } catch (error) {
    throw error
   } 
}



export async function resolveImport(
    importPath: string,
    config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">
) {
    return createMatchPath(config.absoluteBaseUrl, config.paths)(
        importPath,
        undefined,
        () => true,
        [".ts", ".tsx"]
    )
}


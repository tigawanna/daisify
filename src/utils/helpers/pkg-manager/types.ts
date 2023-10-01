export type KeyStringObject = { [key: string]: string };

export interface IPackageJson {
  name: string;
  private?: boolean;
  version: string;
  type?: string;
  scripts: KeyStringObject;
  dependencies: KeyStringObject;
  devDependencies: KeyStringObject;
  workspaces?: string[];
  [key: string]: any | undefined;
}

export interface ITSConfigMini {
  compilerOptions: {
    target?: string;
    lib?: string[];
    module?: string;
    skipLibCheck?: boolean;
    moduleResolution?: string;
    allowImportingTsExtensions?: boolean;
    resolveJsonModule?: boolean;
    isolatedModules?: boolean;
    noEmit?: boolean;
    strict?: boolean;
    noUnusedLocals?: boolean;
    noUnusedParameters?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    paths?: {
      [key: string]: string[];
    };
  };
  include?: string[];
  exclude?: string[];
}



export interface ITsConfig {
  compilerOptions: Partial<CompilerOptions>
  include: string[]
  exclude: string[]
}

export interface CompilerOptions {
  target: string
  lib: string[]
  module: string
  moduleResolution: string
  skipLibCheck: boolean
  allowImportingTsExtensions: boolean
  resolveJsonModule: boolean
  isolatedModules: boolean
  noEmit: boolean
  strict: boolean
  noUnusedParameters: boolean
  noFallthroughCasesInSwitch: boolean
  noUnusedLocals: boolean
  paths: Paths
}

export interface Paths {
  "#/*": string[]
  "@/*": string[]
}

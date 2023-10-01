
import { Command } from "commander";
import { shadcn_command_options } from "./shadcn-args";
import { daisyfyShadcn } from "./helpers/daisyfy-shadcn";
import { printHelpers } from "#/src/utils/helpers/print-tools";


const program = new Command();

export const daisyfyShadcnCommand = program
  .command("shadcn")
  .description("convert shadcn components to use daisyui themes")
  // .argument("[inputs...]", "string to split")
  // .option('-y, --yes', 'Accept all defaults', false)
  .option('-d, --dir <shadcn_directory>', 'shadcn components directory path')

  .action(async (options) => {
    try {
      const opts = await shadcn_command_options(options)
       await daisyfyShadcn(opts)
       process.exit(0)
      } catch (error: any) {
      printHelpers.error("error running daisyfy shadcn" + error);
      process.exit(1)
    }
});




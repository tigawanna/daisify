#!/usr/bin/env node

import { Command } from "commander";
import { getPkgJson } from "@/utils/helpers/pkg-json";
import { printHelpers } from "@/utils/helpers/print-tools";
import { testCommand } from "./commands/test/test";
import { daisyfyShadcnCommand } from "./commands/shadcn/shadcn-command";


const program = new Command();

program.name("daisyfy").description("cli toolkit to daisify your tailwind");
program.hook("preSubcommand", async(_) => {
const pkg_json = await getPkgJson();
  if (!pkg_json) {
    return
  }
if(pkg_json.workspaces){
    printHelpers.warning("You appear to be in a workspace , \n consider running this command in your web project's root directory");
    process.exit(1)
  }
})
program.addCommand(daisyfyShadcnCommand);
program.addCommand(testCommand);

// program.addCommand(defaultCommand);
program.command('404', { isDefault: true })
    .description("catch all command")
    .argument('[args...]', 'Catch all arguments/flags provided.')
    .allowUnknownOption()
    .action(() => {
        program.help();
     });


program.parse();

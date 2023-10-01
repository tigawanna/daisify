import { printHelpers } from "@/utils/helpers/print-tools";
import { z } from "zod";

// const shadcn_args = ["tailwind", "panda", "tanstack"] as const;
// const shadcnArgsSchema = z.array(z.enum(shadcn_args));
// export type TshadcnArgs = z.infer<typeof shadcnArgsSchema>;

// export async function shadcn_command_args(args: any) {
//   try {
//     const parsed_args = await shadcnArgsSchema.parse(args);
//     return parsed_args;
//   } catch (error: any) {
//     printHelpers.error("invalid arguments: " + error.message);
//     process.exit(1);
//   }
// }

const shadcnOptionsShema = z.object({
  // yes:z.boolean().default(false),
  dir:z.string().optional(),
});
export type TshadcnOptions = z.infer<typeof shadcnOptionsShema>;
export async function shadcn_command_options(options: any) {
  try {
    const parsed_options = await shadcnOptionsShema.parse(options);
    return parsed_options;
  } catch (error: any) {
    printHelpers.error("invalid arguments: " + error.message);
    return
    // process.exit(1);
  }
}

import fs from "fs";
import path from "path";
import { printHelpers } from "../print-tools";

interface IFindAndReplaceStringValues {
    dir_path: string;
    target: { find: string; replace: string }[];
}
export async function findAndReplaceStringValues({ dir_path, target }: IFindAndReplaceStringValues) {
    try {
        const directoryPath = path.resolve(dir_path);
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
              printHelpers.error("Error loding dir "+dir_path+" :", err);
                return;
            }
            // console.log("files", files);
            files.forEach((file) => {
                const filePath = path.join(directoryPath, file);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                      printHelpers.error("Error reading file "+filePath+" :", err);
                        return;
                    }

                    let updatedData = data;

                    // Replace values based on the target array
                    target.forEach(({ find, replace }) => {
                        updatedData = updatedData.replace(new RegExp(find, 'g'), replace);
                    });

                    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                        if (err) {
                            printHelpers.error("Error writing file "+filePath+" :", err);
                            return;
                        }
                    printHelpers.success("File updated:", filePath);
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

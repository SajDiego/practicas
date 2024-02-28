import {fileURLToPath} from "URL";
import {dirname} from "path";
import path from "path";

const __filename=fileURLToPath(import.meta.url)

console.log ("import.meta.url:", import.meta.url)

const __dirname=dirname(__filename)
export default __dirname;
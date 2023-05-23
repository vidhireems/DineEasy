"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = __importStar(require("child_process"));
const path = __importStar(require("path"));
let connectionString = "mongodb+srv://cluster0.lcc9vdm.mongodb.net";
const port = "27017";
const user = "dbAdmin";
const password = "test";
const authenticationDB = "admin";
const database = "dineEasy";
const collectionScriptDirectory = "CreateDb";
const createUserFile = "adminDbUser.js";
const updateCollectionFiles = ["createRestaurantData.js", "createMenuData.js", "createOrderDetails.js"];
// Handle localhost scenario
const args = process.argv.slice(2);
const envArgIndex = args.findIndex(arg => arg === '--env');
if (envArgIndex !== -1 || args[envArgIndex + 1] === 'localhost') {
    connectionString = `mongodb://localhost:${port}`;
}
// User with correct privilieges must be created before updating databases
const pathToScript = path.join(collectionScriptDirectory, createUserFile);
const command = `mongosh "${connectionString}/${authenticationDB}" -u ${user} -p ${password} --eval "load('${pathToScript}')"`;
const createUserResult = child_process.spawnSync(command, { shell: true });
if (createUserResult.status !== 0) {
    console.error(`Error running script ${pathToScript}: ${createUserResult.stderr.toString()}`);
}
else {
    console.log(createUserResult.stdout.toString().trim());
}
// Populate data in the collections of database
updateCollectionFiles.forEach((updateCollectionFile) => {
    const pathToScript = path.join(collectionScriptDirectory, updateCollectionFile);
    console.log(`Running script ${pathToScript}...`);
    const command = `mongosh "${connectionString}/${database}" -u ${user} -p ${password} --authenticationDatabase ${authenticationDB} --eval "load('${pathToScript}')"`;
    const updateCollectionresult = child_process.spawnSync(command, { shell: true });
    if (updateCollectionresult.status !== 0) {
        console.error(`Error running script ${pathToScript}: ${updateCollectionresult.stderr.toString()}`);
    }
    else {
        console.log(updateCollectionresult.stdout.toString().trim());
    }
});

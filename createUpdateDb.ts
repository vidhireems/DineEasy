import * as child_process from "child_process";
import * as path from "path";

const host                      = "localhost";
const port                      = "27017";
const user                      = "dbAdmin";
const password                  = "test";
const authenticationDB          = "admin";
const database                  = "dineEasy";
const collectionScriptDirectory = "CreateDb";
const createUserFile            = "adminDbUser.js"
const updateCollectionFiles     = ["createRestaurantData.js"];

// User with correct privilieges must be created before updating databases
const pathToScript = path.join(collectionScriptDirectory, createUserFile);
const command = `mongosh --host ${host} --port ${port} ${authenticationDB} ${pathToScript}`;
const createUserResult = child_process.spawnSync(command, { shell: true });
if (createUserResult.status !== 0) {
  console.error(`Error running script ${pathToScript}: ${createUserResult.stderr.toString()}`);
} else {
  console.log(createUserResult.stdout.toString().trim());
}

// Populate data in the collections of database
updateCollectionFiles.forEach((updateCollectionFile) => {
  const pathToScript = path.join(collectionScriptDirectory, updateCollectionFile);
  console.log(`Running script ${pathToScript}...`);
  const command = `mongosh --host ${host} --port ${port} -u ${user} -p ${password} --authenticationDatabase ${authenticationDB} ${database} ${pathToScript}`;
  const updateCollectionresult = child_process.spawnSync(command, { shell: true });
  if (updateCollectionresult.status !== 0) {
    console.error(`Error running script ${pathToScript}: ${updateCollectionresult.stderr.toString()}`);
  } else {
    console.log(updateCollectionresult.stdout.toString().trim());
  }
});

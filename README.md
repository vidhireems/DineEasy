# DineEasy

Automate DB steps:
createUpdateDb.ts allows you to update the database automatically without the need to use mongosh explicitly and manually.

1. Ensure that the mongod server is on and listening on localhost with port 27017.
2. Ensure that adminDbUser.js has all the required users with required priviliges.
3. All the other files in Createdb folder are meant to create and/or update collections in the database.
4. Ensure that all the files in the Createdb folder are present in createUpdateDb.ts.
5. Compile createUpdateDb.ts using 'tsc createUpdateDb.ts'
6. Run the auto-generated file createUpdateDb.js using 'node createUpdateDb.js'
db = db.getSiblingDB('dineEasy')
db.createUser(
{
	user: "dbAdmin", 
	pwd: "test",
	roles: [ "readWriteAnyDatabase", "dbAdminAnyDatabase", "clusterAdmin"]	
});
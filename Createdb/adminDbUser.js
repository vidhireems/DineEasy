// Connect to mongo
const conn = new Mongo();

// Connect to admin DB
db = conn.getDB('admin');

// Check if the user already exists
if (db.getUser("dbAdmin")) {
	// Warn that this user is already present
	print("Warning: Skipping creation step. The 'dbAdmin' user already exists. ");
} else {
	// If user is not present, then create one
	db.createUser({
		user: "dbAdmin",
		pwd: "test",
		roles: ["readWriteAnyDatabase", "dbAdminAnyDatabase", "clusterAdmin"]
    });
	print("Successfully created dbAdmin user!!")
}

import 'server-only';
import { DonutSQL } from 'donutsql';
/*
    Connecting Database
*/

/*
    1. Create the .env file and then create 3 variables named
        I. USERNAME = Your donutsql username
       II. DATABASE = your database name
      III. DATABASE_KEY = database password that created when database create
*/
const cofig = {
    username: process.env.USERNAME,
    database: process.env.DATABASE,
    databaseKey: process.env.DATABASE_KEY
}

export async function connectDatabase() {

    try {
        const db = new DonutSQL(cofig);

        await db.connect();


        return db;
    } catch (err) {

        console.log("ERROR", err);
        return null
    }
}

/*
Sample .env, copy paste these into your env file and replace with your credentials

# donutSQL configuration
USERNAME = [your username]
DATABASE = [your database name]
DATABASE_KEY = [database password]

*/
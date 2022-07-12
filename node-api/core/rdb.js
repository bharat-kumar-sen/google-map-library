/**
 * Name: database connection.
 * @description : This file use for google cloud google cloud db connection and We use globally.
 */

 const Knex = require('knex');

 // HERE IS START CONNECTION FOR STAGING DATABASE
 const connect = () => {
   const config = {
     user: 'root',
     password: '',
     database: 'rajat-google-maps',
     charset: 'utf8mb4',
   };
 
   if (
     process.env.INSTANCE_CONNECTION_NAME &&
     process.env.NODE_ENV === 'production'
   ) {
     config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
   }
 
   // Connect to the database
   const knex = Knex({
     client: 'mysql',
     connection: config,
   });
   // [END gae_flex_mysql_connect]
 
   return knex;
 };
 const db = connect();
 
 
 module.exports = {
   db: db
 };
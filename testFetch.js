const testFetch = async () => {
    // Load the `.env` file
    require('dotenv').config();

    // Require the PostgreSQL Client
    const { Client } = require('pg');

    // Create a client instance
    const client = new Client({
    // does not properly get database_url?
    connectionString: process.env.DATABASE_URL || 'postgres://qxluyvrcooexya:53d31d94d272cf211b6048b010e416dfe9c0328587b8be224fcc3345ab97fa9c@ec2-54-170-90-26.eu-west-1.compute.amazonaws.com:5432/d4a7d8fcarbtit',
    ssl: {
        rejectUnauthorized: false
    }
    });
    client.connect();
    const result = await client.query('SELECT * FROM test;');
    return result.rows[0]
}

module.exports.testFetch = testFetch;
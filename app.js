import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import { validateForm } from './services/validation.js'

// set up config
dotenv.config();

// configure database connections
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

// set up app port
const PORT = process.env.APP_PORT || 3000;

// set up database connection function
async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database!');
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`);
    }
}

// set up express
const app = express();

app.use(express.urlencoded( { extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');


// routes
app.get('/', (req, res) => {
    res.render(`home`);
});

app.post('/submit', async (req, res) => {

    const page = {
        fname: req.body.fname,
        lname: req.body.lname,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        // mailing list is yes or no, so this is set to 0 or 1 (boolean)
        mailing_list: req.body.mailing_list ? 1 : 0,
        format: req.body.format,
        timestamp: new Date()
    };
    
    //check if page was correctly built
    console.log(page);


    // check for errors and return the errors page if so
    const result = validateForm(page);
    if(!result.isValid) {
        console.log(result.errors);
        res.render('invalid-input', { result });

        // return so bad data is not entered into database
        return;
    }

    // otherwise connect to the db
    const conn = await connect();

    // add data to table
    const insertQuery = await conn.query(`insert into entries (fname, lname, jobtitle, company, linkedin, email, meet, other, message, mailing_list, format)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [page.fname, page.lname, page.jobtitle, page.company, page.linkedin, page.email, page.meet, page.other, page.message, page.mailing_list, page.format]
    );
    
    res.render('thank-you', { page });
});

app.get('/admin', (req, res) => {
    
    res.render('admin', { guestbook });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:3000`);
})
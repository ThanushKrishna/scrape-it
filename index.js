const express = require('express');
const scrape = require('scrape-it');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(express.json());

app.listen(8080, (err)=> {
    console.log("App Started");
})
.on('error', (err)=>{
    console.log(err)
})

app.get('/webscrape', (req, res) => {
    res.status(200).send( "<h1> Welcome to Web Scrapper</h1>" )
})

// axios.get("https://themeisle.com/blog/best-free-blogging-sites")
// .then( 
//     (res)=>{
//         console.log(res);
//     }
// )
// .catch(
//     (err)=>{
//         console.log(err);

// })
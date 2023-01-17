const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const scrapeIt = require('scrape-it');

const app = express();

app.use(express.json());

app.listen(8080, ()=> {
    console.log("App Started");
})
.on('error', (err)=>{
    console.log(err)
})

app.get('/webscrape', (req, res) => {
    res.status(200).send( "<h1> Welcome to Web Scrapper</h1>" )
})

app.get('/webscrape/scrape-it', (req, response) => {
    axios.get(req.body.url)
    .then((res) => {
        const $ = cheerio.load(res.data);
        console.log(req.body.tag);
        console.log(req.body.url);
        const data = scrapeIt.scrapeHTML($, {scrapedData: {            
            listItem: req.body.tag, data: {
                createdAt: {
                    selector: ".date"
                  , convert: x => new Date(x)
                }
              , title: "a.article-title"
              , content: {
                  selector : req.body.class!=null?`.${req.body.class}`:null,
                  how: "text"
                }
              , traverseOtherNode: {
                    selector: ".upperNode"
                  , closest: "div"
                  , convert: x => x.length
                }
        }
        }})
        if(data.scrapedData.length!=0){
            return response.status(200).send(data.scrapedData.map((element)=>{
              return element.content.replace(/\n/g, '');
            }))
           }
           else{
             return response.status(200).send(`there is no ${req.body.tag} tag present`)
           }
    })
    .catch((err) => {
        console.log(err)
    })
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
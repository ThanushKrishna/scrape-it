const axios = require("axios")
const scrapeit = require("scrape-it")
const cheerio = require("cheerio")
axios.get("https://themeisle.com/blog/best-free-blogging-sites")
.then(
    (res)=>{
        const $ = cheerio.load(res.data)
        const data = scrapeit.scrapeHTML($,{scrapedData:{
            listItem: "h3", data: {
                createdAt: {
                    selector: ".date"
                  , convert: x => new Date(x)
                }
              , title: "article"
              , tags: {
                    listItem: "a"
                }
              , content: {                    
                   how: "text"
                }
              , traverseOtherNode: {
                    selector: ".upperNode"
                  , closest: "div"
                  , convert: x => x.length
                }
        }}})
        console.log(data)
        
    })
.catch((err)=>{console.log(err)})

console.log("Hello")
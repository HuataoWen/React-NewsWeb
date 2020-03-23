var express = require('express');
var cors = require('cors');
var request = require('request');

var app = express();
app.use(cors());

var NY_API_KEY = 'LPqcV435gYSnG5AmlyU9DdHHC34tozKE';
var pageGroup = {'home': 1, 'world': 1, 'politics': 1, 'business': 1, 'technology': 1, 'sports': 1};

// http://127.0.0.1:4000/search/tesla-ss
app.get('/search/:keyword-:source', function (req, res) {
   var requestPage = req.params;
   res.send(requestPage)
})

//https://api.nytimes.com/svc/topstories/v2/home.json?api-key=LPqcV435gYSnG5AmlyU9DdHHC34tozKE


// http://127.0.0.1:4000/page/home-ny
app.get('/page/:page-:source', function (req, res) {
   let result = [];
   
   if (req.params.source == 'NYT_SRC') {
      let requestedUrl = 'https://api.nytimes.com/svc/topstories/v2/' + req.params.page + '.json?api-key=' + NY_API_KEY;

      request(requestedUrl, function (error, response, body) {
         if (!error && response.statusCode == 200) {
            body = JSON.parse(body);

            var i = 0;
            let section;
            while (i < body.num_results)
            {
               if (req.params.page == 'home') {
                  if (pageGroup[body.results[i].section] == 1) section = [body.results[i].section];
                  else if (pageGroup[body.results[i].subsection] == 1) section = [body.results[i].subsection];
                  else section = ['health'];
               }
               else if (body.results[i].section == req.params.page) {
                  section = [body.results[i].section];
               }
               else if (body.results[i].subsection == req.params.page) {
                  section = [body.results[i].subsection];
               }

               result.push(
                  {
                     id: i,
                     title: body.results[i].title,
                     date: body.results[i].published_date,
                     urlToImg: body.results[i].multimedia[0].url,
                     url: body.results[i].url,
                     tags: section,
                     description: body.results[i].abstract,
                  }
               )
               i++;
               if (i == 10) break;
            }
            res.send(result);
         }
      });
   }
})




app.get('/', function (req, res) {
   var data = [
      {
          id: 1,
          title: "sss Davidson",
          date: "2020-03-27",
          urlToImg: "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png",
          url: "www.google.com",
          tags: ['world', 'health'],
          description: "Met at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with laterMet at a party. Will connect with later"
      },
      {
          id: 2,
          title: "Mark Markson",
          date: "2020-03-27",
          urlToImg: "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png",
          url: "www.google.com",
          tags: ['world', 'health'],
          description: "Met at a party. Will connect with later"
      },
      {
          id: 3,
          title: "Judy Judyson",
          date: "2020-03-27",
          urlToImg: "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png",
          url: "www.google.com",
          tags: ['world', 'health'],
          description: "Met at a party. Will connect with later"
      }];
    res.json(data);
})

var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
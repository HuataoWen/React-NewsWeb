var express = require('express');
var cors = require('cors');
var request = require('request');

var app = express();
app.use(cors());

var NY_API_KEY = 'LPqcV435gYSnG5AmlyU9DdHHC34tozKE';
//https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22https://www.nytimes.com/2020/01/24/realestate/dealing-with-clutter-hangover.html%22)&api-key=LPqcV435gYSnG5AmlyU9DdHHC34tozKE
var GUAD_API_KEY = '50290f90-1c40-44ff-a2c7-8a04aa499afa';
//https://content.guardianapis.com/world/2020/mar/18/wednesday-briefing-coronavirus-the-race-home?api-key=50290f90-1c40-44ff-a2c7-8a04aa499afa&show-blocks=all
var pageGroup = { 'home': 1, 'world': 1, 'politics': 1, 'business': 1, 'technology': 1, 'sports': 1 };
let NYT_SRC = 'false', GUARDIAN_SRC = 'true';


app.get('/getArticle', function (req, res) {
  let requestedUrl, result = [];
  let section, url_img;
  console.log(req.query.source);
  console.log(req.query.article_id);

  if (req.query.source == NYT_SRC) {
    requestedUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' + req.query.article_id + '")&api-key=' + NY_API_KEY;
    request(requestedUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        console.log(body);

        if (pageGroup[body.response.docs[0].news_desk.toLowerCase()] == 1) section = [body.response.docs[0].news_desk.toLowerCase()];
        else section = ['health'];

        if (body.response.docs[0].multimedia == null || body.response.docs[0].multimedia.length == 0) {
          url_img = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        }
        else {
          url_img = 'https://www.nytimes.com/' + body.response.docs[0].multimedia[0].url;
        }

        result.push(
          {
            id: body.response.docs[0].web_url,
            title: body.response.docs[0].headline.main,
            date: body.response.docs[0].pub_date.substring(0, 10),
            urlToImg: url_img,
            url: body.response.docs[0].web_url,
            tags: section,
            description: body.response.docs[0].abstract,
            source: req.query.source
          }
        )

        res.send(result);
      }
    });
  }
  else {
    requestedUrl = 'https://content.guardianapis.com/' + req.query.article_id + '?api-key=' + GUAD_API_KEY + '&show-blocks=all';
    request(requestedUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        section = body.response.content.sectionId.toLowerCase();
        if (section == 'sport') section = 'sports';
        if (pageGroup[section] == 1) section = [section];
        else section = ['health'];

        if (body.response.content.blocks.main == undefined || body.response.content.blocks.main.elements[0].assets.length == 0) {
          url_img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
        }
        else {
          url_img = body.response.content.blocks.main.elements[0].assets[0].file;
        }

        result.push(
          {
            id: body.response.content.id,
            title: body.response.content.webTitle,
            date: body.response.content.webPublicationDate.substring(0, 10),
            urlToImg: url_img,
            url: body.response.content.webUrl,
            tags: section,
            description: body.response.content.blocks.body[0].bodyTextSummary,
            source: req.query.source
          }
        )

        res.send(result);
      }
    });
  }
})

var getAPIresponse = function (requestedUrl, cb) {
  let result = [];
  request(requestedUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      var i = 0;
      while (i < body.response.docs.length) {
        if (pageGroup[body.response.docs[i].news_desk.toLowerCase()] == 1) section = [body.response.docs[i].news_desk.toLowerCase()];
        else section = ['health'];

        if (body.response.docs[i].multimedia == null || body.response.docs[i].multimedia.length == 0) {
          url_img = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        }
        else {
          url_img = 'https://www.nytimes.com/' + body.response.docs[i].multimedia[0].url;
        }

        result.push(
          {
            id: body.response.docs[i].web_url,
            title: body.response.docs[i].headline.main,
            date: body.response.docs[i].pub_date.substring(0, 10),
            urlToImg: url_img,
            url: body.response.docs[i].web_url,
            tags: section,
            description: body.response.docs[i].abstract,
            source: NYT_SRC
          }
        )
        i++;
        if (result.length == 5) break;
      }
      cb(error, result);
    }
  });
}


// http://127.0.0.1:4000/search/tesla-ss
app.get('/search/:keyword-:source', function (req, res) {
  let requestedUrl, requestPage;
  let section, url_img;

  if (true) {

    requestedUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + req.params.keyword + '&api-key=' + NY_API_KEY;
    poolList = getAPIresponse(requestedUrl, function (err, poolList) {

      // This is run in a callback once the request is done. 
      result = poolList;

      requestedUrl = 'https://content.guardianapis.com/search?q=' + req.params.keyword + '&api-key=' + GUAD_API_KEY + '&show-blocks=all';;
      request(requestedUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(body);

          i = 0;
          while (i < body.response.results.length) {
            section = body.response.results[i].sectionId.toLowerCase();
            if (section == 'sport') section = 'sports';

            if (pageGroup[section] == 1) section = [section];
            else section = ['health'];

            if (body.response.results[i].blocks.main == undefined || body.response.results[i].blocks.main.elements[0].assets.length == 0) {
              url_img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
            }
            else {
              url_img = body.response.results[i].blocks.main.elements[0].assets[0].file;
            }
            poolList.push(
              {
                id: body.response.results[i].id,
                title: body.response.results[i].webTitle,
                date: body.response.results[i].webPublicationDate.substring(0, 10),
                urlToImg: url_img,
                url: body.response.results[i].webUrl,
                tags: section,
                description: body.response.results[i].blocks.body[0].bodyTextSummary,
                source: GUARDIAN_SRC
              }
            )

            i++;
            if (poolList.length == 10) break;
          }
          res.send(poolList);
        }
      });
      //console.log(poolList);
    });
  }
})

//https://api.nytimes.com/svc/topstories/v2/home.json?api-key=LPqcV435gYSnG5AmlyU9DdHHC34tozKE


// http://127.0.0.1:4000/page/home-ny
app.get('/page/:page-:source', function (req, res) {
  let result = [];
  let requestedUrl, requestPage;
  let section, url_img;


  if (req.params.source == NYT_SRC) {
    requestedUrl = 'https://api.nytimes.com/svc/topstories/v2/' + req.params.page + '.json?api-key=' + NY_API_KEY;

    request(requestedUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        var i = 0;
        while (i < body.num_results) {
          if (req.params.page == 'home') {
            if (pageGroup[body.results[i].section.toLowerCase()] == 1) section = [body.results[i].section.toLowerCase()];
            else if (pageGroup[body.results[i].subsection.toLowerCase()] == 1) section = [body.results[i].subsection.toLowerCase()];
            else section = ['health'];
          }
          else if (body.results[i].section.toLowerCase() == req.params.page) {
            section = [body.results[i].section.toLowerCase()];
          }
          else if (body.results[i].subsection.toLowerCase() == req.params.page) {
            section = [body.results[i].subsection.toLowerCase()];
          }
          else {
            section = null;
          }

          if (body.results[i].multimedia == null || body.results[i].multimedia.length == 0) {
            url_img = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
          }
          else {
            url_img = body.results[i].multimedia[0].url;
            //url_img = 'https://www.nytimes.com/' + body.results[i].multimedia[0].url;
          }

          if (section != null) {
            result.push(
              {
                id: body.results[i].url,
                title: body.results[i].title,
                date: body.results[i].published_date.substring(0, 10),
                urlToImg: url_img,
                url: body.results[i].url,
                tags: section,
                description: body.results[i].abstract,
                source: NYT_SRC
              }
            )
          }
          i++;
          if (result.length == 10) break;
        }
        res.send(result);
      }
    });
  }
  else {
    result = [];
    requestPage = req.params.page;
    if (req.params.page == 'sports') requestPage = 'sport';
    if (requestPage == 'home') requestedUrl = 'https://content.guardianapis.com/search?api-key=' + GUAD_API_KEY + '&section=(sport|business|technology|politics)&show-blocks=all';
    else requestedUrl = 'https://content.guardianapis.com/' + requestPage + '?api-key=' + GUAD_API_KEY + '&show-blocks=all';

    request(requestedUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        i = 0;
        while (i < body.response.results.length) {
          section = body.response.results[i].sectionId.toLowerCase();

          if (requestPage == 'home') {
            if (pageGroup[section] == 1) section = [section];
            else section = ['health'];
          }
          else if (section == requestPage) {
            section = [section];
            if (section == 'sport') section = ['sports'];
          }
          else {
            section = null;
          }

          if (body.response.results[i].blocks.main == undefined || body.response.results[i].blocks.main.elements[0].assets.length == 0) {
            url_img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
          }
          else {
            url_img = body.response.results[i].blocks.main.elements[0].assets[0].file;
          }

          if (section != null) {

            result.push(
              {
                id: body.response.results[i].id,
                title: body.response.results[i].webTitle,
                date: body.response.results[i].webPublicationDate.substring(0, 10),
                urlToImg: url_img,
                url: body.response.results[i].webUrl,
                tags: section,
                description: body.response.results[i].blocks.body[0].bodyTextSummary,
                source: GUARDIAN_SRC
              }
            )
          }
          i++;
          if (result.length == 10) break;
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
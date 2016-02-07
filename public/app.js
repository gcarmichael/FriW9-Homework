window.onload = function(){
  var selectedApp = document.getElementById("select").value;
  console.log(selectedApp);

  var json = JSON.parse(localStorage.getItem('selectedApp'));
  console.log(json);

  var appNews = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=' + (json) + '&count=10&maxlength=300&format=json';

  var appAchi = 'http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=' + (json) + '&format=json';
  console.log(appAchi);

  var newsRequest = new XMLHttpRequest();
  newsRequest.open("GET", appNews);

  var achiRequest = new XMLHttpRequest();
  achiRequest.open("GET", appAchi);

  newsRequest.onload = function(){
    if(newsRequest.status === 200){
      console.log("got the news data");
      var newsList = JSON.parse(newsRequest.responseText);

      for (var i = 0; i < newsList.appnews.newsitems.length; i++) {
        var news = document.getElementById("news");
        var heading = document.createElement("h4");
        var para = document.createElement("p");
        heading.innerText = newsList.appnews.newsitems[i].title;
        para.innerHTML = (newsList.appnews.newsitems[i].contents)+'<br>';
        news.appendChild(heading);
        news.appendChild(para);
      }
    };
  };

  achiRequest.onload = function(){
    if(newsRequest.status === 200){
      console.log("got the achi data");
      var achiList = JSON.parse(achiRequest.responseText);
      console.log(achiList);

      for (var i = 0; i < achiList.achievementpercentages.achievements.length; i++) {
        var achi = document.getElementById("achi");
        var heading = document.createElement("h4");
        var para = document.createElement("p");
        heading.innerText = achiList.achievementpercentages.achievements[i].name;
        para.innerHTML = Number(achiList.achievementpercentages.achievements[i].percent).toLocaleString()+ "% of users have this achievement." + '<br>';
        news.appendChild(heading);
        news.appendChild(para);
      }

      new PieChart(achiList);
    };
  };

  select.oninput = function(){
    var selectedApp = document.getElementById("select").value;
    // var appNews = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=' + selectedApp + '&count=10&maxlength=300&format=json';
    // var appAchi = 'http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=' + selectedApp + '&format=json';

    // var newsRequest = new XMLHttpRequest();
    // newsRequest.open("GET", appNews);

    // var achiRequest = new XMLHttpRequest();
    // achiRequest.open("GET", appAchi);

    localStorage.setItem('selectedApp', JSON.stringify(selectedApp));
    window.location.reload();

  };

  newsRequest.send(null);
  achiRequest.send(null);

};

var authKey = '';

chrome.storage.sync.get({
  authKey: ''
}, function(items) {
  authKey = items.authKey;
});

function parseIdKinopoisk(url) {
  var res = url.match(/^https:\/\/www.kinopoisk.ru\/film\/(\d+)/);
  if (res[1].length) {
    return res[1];
  }

  return 0;
}


function parseTitle(title) {

  return 0;
}

chrome.runtime.onMessage.addListener(function(message, sender, cb) {
  var id = 0;
  var movie_title = "";

  if (!message) return;

  chrome.tabs.query({
    active: true, // Select active tabs
    lastFocusedWindow: true // In the current window
  }, function(tabs) {
    // Since there can only be one active tab in one active window,
    //  the array has only one element
    var tab = tabs[0];

    id = parseIdKinopoisk(tab.url);
    movie_title = parseTitle(tab.title);

    if (id === 0) {
      cb();
      return false;
    }

    var requesrUrl = '';

    switch (message.name) {
      case 'addView':
        requesrUrl = 'http://ba1467be.ngrok.io/user/views/kinopoisk/' + id;
        break;
      case 'addWant':
        requesrUrl = 'http://ba1467be.ngrok.io/user/wants/kinopoisk/' + id;
        break;
      default:
        break;
    }

    if (requesrUrl !== '') {
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', requesrUrl, true);
      xhr.setRequestHeader('Authorization', 'Basic '+authKey);
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          alert(xhr.responseText);
        }

      };
    }
  });

  cb();
});

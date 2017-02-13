var bottomView = document.getElementById('view'),
    bottomWant = document.getElementById('want');


    bottomView.disabled = false;
    bottomWant.disabled = false;

    bottomView.addEventListener('click', function () {
      console.log('addView');
      chrome.runtime.sendMessage({name: 'addView'});
    });

    bottomWant.addEventListener('click', function () {
      console.log('addWant');
      chrome.runtime.sendMessage({name: 'addWant'});
    });

// Saves options to chrome.storage
function save_options() {
  var auth_key = document.getElementById('auth_key').value;
  chrome.storage.sync.set({
    authKey: auth_key
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    authKey: ''
  }, function(items) {
    document.getElementById('auth_key').value = items.authKey;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

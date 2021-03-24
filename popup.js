chrome.storage.sync.get('links', function(response) {
  if(response.links) {
    document.getElementById('data').value = JSON.stringify(response.links, null, 2);
  }
});

var updateBtn = document.getElementById('update');
updateBtn.addEventListener('click', async () => {
  var json = document.getElementById('data').value;
  var links = JSON.parse(json);

  chrome.storage.sync.set({ links: links }, function(response) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
      updateBtn.innerHTML = 'Saved!';
      updateBtn.style.backgroundColor = '#5cc67d';
      setTimeout(function() {
        updateBtn.innerHTML = 'Update';
        updateBtn.style.backgroundColor = '#001eff';
      }, 2000);
    });
  });
});

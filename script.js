// Globals
var roomClass = 'gHz6xd'
    roomBtnsClass = 'SZ0kZe',
    waitSeconds = 3;


// Create Link
function createLink(data) {
  var link = '<div style="position: relative; top: 50%; transform: translateY(-50%); font-size: 15px;">' +
    (data.curs.length > 0 ? '<a href="' + data.curs + '" style="text-decoration: none; padding: 5px 9px; background-color: #001eff; color: #fff;" target="_blank">C</a>' : '') +
    (data.laborator.length > 0 ? '<span style="margin: 0px 10px;"></span>' +
    '<a href="' + data.laborator + '" style="text-decoration: none; padding: 5px 9px; background-color: #001eff; color: #fff;" target="_blank">L</a>' : '') +
    (data.proiect.length > 0 ? '<span style="margin: 0px 10px;"></span>' +
    '<a href="' + data.proiect + '" style="text-decoration: none; padding: 5px 9px; background-color: #001eff; color: #fff;" target="_blank">P</a>' : '') +
  '</div>';

  return link;
}

// Render Links
function renderLinks() {
  var rooms = document.getElementsByClassName(roomClass);
  var div;

  chrome.storage.sync.get('links', function(response) {
    for(var i = 0; i < rooms.length; i++) {
      for(var j = 0; j < response.links.length; j++) {
        if(rooms[i].dataset.courseId == response.links[j].id) {
          div = document.createElement('div');

          div.style.display = 'inline-block';
          div.style.height = '100%';
          div.style.width = 'auto';
          div.style.paddingLeft = '15px';
          div.style.paddingRight = '15px';
          div.style.textAlign = 'center';

          div.innerHTML = createLink(response.links[j]);

          rooms[i].getElementsByClassName(roomBtnsClass)[0].appendChild(div);
        }
      }
    }
  });
}

//
function checkForDOM() {
  if(document.body && document.head) {
    chrome.storage.sync.get('links', function(response) {
      if(response.links.length > 0) {
        setTimeout(function() {
          renderLinks();
        }, waitSeconds * 1000);
      } else {
        console.log('No links provided.');
      }
    });
  } else {
    requestIdleCallback(checkForDOM);
  }
}
requestIdleCallback(checkForDOM);

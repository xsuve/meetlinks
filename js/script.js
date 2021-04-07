// Globals
var roomClass = 'gHz6xd'
    roomTitleClass = 'csjh4b',
    roomBtnsClass = 'SZ0kZe';

// Get Rooms
const getRooms = () => {
  var rooms = [];

  $('.' + roomClass).each((i, room) => {
    rooms.push(room);
  });

  return rooms;
}

// Save Rooms
const saveRooms = () => {
  var rooms = getRooms();
  var roomsToSave = [];

  for(var i = 0 ; i < rooms.length; i++) {
    roomsToSave.push({
      id: rooms[i].dataset.courseId,
      title: rooms[i].getElementsByClassName(roomTitleClass)[0].innerHTML
    });
  }

  chrome.storage.sync.set({ rooms: roomsToSave });
}


// Create Link
const link = (link) => {
  return `
    <div style="position: relative; top: 50%; transform: translateY(-50%); font-size: 15px;">
      ${link.course.length > 0 ? '<a href="' + link.course + '" style="text-decoration: none; padding: 5px 9px; background-color: #001eff; color: #fff;" target="_blank">C</a>' : ''}
      ${link.laboratory.length > 0 ? '<span style="margin: 0px 10px;"></span><a href="' + link.laboratory + '" style="text-decoration: none; padding: 5px 9px; background-color: #001eff; color: #fff;" target="_blank">L</a>' : ''}
      ${link.project.length > 0 ? '<span style="margin: 0px 10px;"></span><a href="' + link.project + '" style="text-decoration: none; padding: 5px 9px; background-color: #001eff; color: #fff;" target="_blank">P</a>' : ''}
    </div>
  `;
}

// Render Links
const renderLinks = () => {
  var rooms = document.getElementsByClassName(roomClass);
  var div;

  chrome.storage.sync.get('links', (response) => {
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

          div.innerHTML = link(response.links[j]);

          rooms[i].getElementsByClassName(roomBtnsClass)[0].appendChild(div);
        }
      }
    }
  });
}

// Check Rooms
const checkRooms = (callback) => {
  console.log('Loading classroom.');
  var interval = setInterval(() => {
    var rooms = document.getElementsByClassName(roomClass);
    if(rooms.length > 0) {
      clearInterval(interval);
      callback();
    }
  }, 100);
}


// Dark mode
const darkMode = () => {
  var darkColor = '#121212',
      lightColor = '#1e1e1e';

  $('.joJglb').css('background-color', lightColor);
  $('.joJglb').css('border-color', '#333');
  $('.IqJTee').css('color', '#fff');
  $('.GmuOkf').css('color', '#fff');
  $('body').css('background-color', darkColor);
  $('.TQYOZc').css('background-color', lightColor);
  $('.' + roomClass).css('border-color', darkColor);
  $('.' + roomBtnsClass).css('background-color', lightColor);
  $('.' + roomBtnsClass).css('border-color', '#333');
  $('.NMm5M').css('color', '#fff');
}

//
const checkForDOM = () => {
  if(document.body && document.head) {
    checkRooms(() => {
      //darkMode();
      console.log('Classroom loaded.');
      saveRooms();

      chrome.storage.sync.get('links', (response) => {
        if(response.links) {
          renderLinks();
        } else {
          console.log('No links provided.');
        }
      });
    });
  } else {
    requestIdleCallback(checkForDOM);
  }
}
requestIdleCallback(checkForDOM);

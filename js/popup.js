// Box
const box = (link) => {
  return `
    <div class="box" data-course-id="${link.id}">
      <div class="box-delete" data-course-id="${link.id}"><span>✕</span></div>
      <div class="box-title">${link.title.length > 45 ? (link.title.substr(0, 45)) + '...' : link.title}</div>
      <div class="box-links">
        ${link.course.length ? '<div><span>C</span></div>' : ''}
        ${link.laboratory.length ? '<div><span>L</span></div>' : ''}
        ${link.project.length ? '<div><span>P</span></div>' : ''}
      </div>
    </div>
  `;
};

// Render Boxes
const renderBoxes = () => {
  $('#boxes').empty();

  chrome.storage.sync.get('links', (response) => {
    if(response.links) {
      for(var i = 0; i < response.links.length; i++) {
        $('#boxes').append(box(response.links[i]));
      }
    }
  });
}
renderBoxes();



// Add Link
$('.add-link').on('click', () => {
  $('body').addClass('no-scroll');
  $('.add-link-section').show();

  $('#selectedCourseId').data('course-id', "");
  $('#selectedCourseId').hide();
  $('#afterCourseSelected').hide();

  // Reset
  $('#addLinkCourseLink').val('');
  $('#addLinkLaboratoryLink').val('');
  $('#addLinkProjectLink').val('');

  chrome.storage.sync.get('rooms', (response) => {
    if(response.rooms) {
      for(var i = 0; i < response.rooms.length; i++) {
        $('#addLinkCoursesSelect').append(`<option value="${response.rooms[i].id}" data-course-title="${response.rooms[i].title}">${response.rooms[i].title}</option>`);
      }
    }
  });
});
$('.add-link-back').on('click', () => {
  $('body').removeClass('no-scroll');
  $('.add-link-section').hide();
  $('#addLinkCoursesSelect').prop('selectedIndex', 0).val();
});
$('#addLinkCoursesSelect').on('change', (event) => {
  $('#selectedCourseId').data('course-id', event.target.value);
  $('#selectedCourseId').text('ID: ' + event.target.value);
  $('#selectedCourseId').show();
  $('#afterCourseSelected').show();
});
$('#submitAddLink').on('click', () => {
  var addLinkCourseLink = $('#addLinkCourseLink').val(),
      addLinkLaboratoryLink = $('#addLinkLaboratoryLink').val(),
      addLinkProjectLink = $('#addLinkProjectLink').val();
      $('#addLinkCoursesSelect').prop('selectedIndex', 0).val();

  if(addLinkCourseLink.length > 0 || addLinkLaboratoryLink.length > 0 || addLinkProjectLink.length > 0) {
    var linksToSave = [];

    chrome.storage.sync.get('links', (response) => {
      if(response.links) {
        linksToSave = response.links;
      }

      linksToSave.push({
        id: $('#selectedCourseId').data('course-id'),
        title: $('#addLinkCoursesSelect').children('option:selected').data('course-title'),
        course: addLinkCourseLink,
        laboratory: addLinkLaboratoryLink,
        project: addLinkProjectLink
      });

      chrome.storage.sync.set({ links: linksToSave });

      renderBoxes();

      $('body').removeClass('no-scroll');
      $('.add-link-section').hide();
    });
  }
});


// Delete link
$(document).on('click', '.box', function() {
  $(this).children('.box-delete').css('right', '0px');
  setTimeout(() => {
    $(this).children('.box-delete').css('right', '-40px');
  }, 1500);
});

$(document).on('click', '.box-delete', function() {
  var id = $(this).data('course-id');
  var linksToSave = [];

  chrome.storage.sync.get('links', (response) => {
    if(response.links) {
      for(var i = 0; i < response.links.length; i++) {
        if(response.links[i].id != id) {
          linksToSave.push(response.links[i]);
        }
      }
    }

    chrome.storage.sync.set({ links: linksToSave });

    renderBoxes();
  });
});

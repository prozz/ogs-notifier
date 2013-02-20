function saveOptions() {
  var open = $('input:radio[name=open]:checked').val();
  localStorage["open"] = open;

  var chatAtStartup = $('#chatAtStartup').is(':checked');
  localStorage["chatAtStartup"] = chatAtStartup;

  var chatAtGamesOpen = $('#chatAtGamesOpen').is(':checked');
  localStorage["chatAtGamesOpen"] = chatAtGamesOpen;

  $('#status').fadeIn().fadeOut('slow');
}

function restoreOptions() {
  var open = getFromStorage("open", "summary");
  $('#'+open).prop('checked', 'checked');

  var chatAtStartup = getFromStorage("chatAtStartup", "false");
  setCheckboxValue("chatAtStartup", chatAtStartup);

  var chatAtGamesOpen = getFromStorage("chatAtGamesOpen", "false");
  setCheckboxValue("chatAtGamesOpen", chatAtGamesOpen);
}

function getFromStorage(key, defaultValue) {
  var value = localStorage[key];
  var result = value == null ? defaultValue : value;
  console.debug("value taken from local storage: " + key + " = " + result);
  return result;
}

function setCheckboxValue(id, checked) {
  var e = $("#" + id);
  if(checked == "true") { // stupid js!
    console.log('checkbox ' + id + ' is checked');
    e.prop('checked', true);
  } else {
    console.log('checkbox ' + id + ' is unchecked');
    e.removeAttr('checked');
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);

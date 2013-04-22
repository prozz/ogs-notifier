var boardsToMove;

var gamesToOpen = [];

function openGames() {
    var chatAtGamesOpen = localStorage['chatAtGamesOpen'];
    if (chatAtGamesOpen == "true") {
        chrome.tabs.create({url: "http://nova.gs/chat"});
    }

    var open = localStorage['open'];
    if (gamesToOpen.length == 0 || open == null || open == 'summary') {
        chrome.tabs.create({url: "http://nova.gs/"});
        return;
    }

    for (var i = 0; i < gamesToOpen.length; i++) {
        chrome.tabs.create({url: "http://nova.gs/game/" + gamesToOpen[i]});
        if ( open == 'firstGame' )
            break;
    }
    
    gamesToOpen = []
    chrome.browserAction.setBadgeText({text: ""});
}

function checkForGames() {
    $.get("http://nova.gs/api/0/notifications", updateAwaitingGames, "json")
}


function updateAwaitingGames(notifications) {
    console.debug(JSON.stringify(notifications));

    var awaitingGamesNo = 0;
    var newGamesToOpen = []
    for(var i = 0; i < notifications.length; i++){
        if(notifications[i].type == 'yourMove'){
            awaitingGamesNo++;
            newGamesToOpen.push(notifications[i].game_id);
        }
    }
    console.debug("awaiting games number: " + awaitingGamesNo);

    var awaitingGamesLabel = awaitingGamesNo > 0 ? "" + awaitingGamesNo : "";
    chrome.browserAction.setBadgeText({text: awaitingGamesLabel});
    gamesToOpen = newGamesToOpen;
}

chrome.browserAction.onClicked.addListener(openGames);
window.setInterval(checkForGames, 60000);

var chatAtStartup = localStorage['chatAtStartup'];
if (chatAtStartup == "true") {
    chrome.tabs.create({url: "http://nova.gs/chat"});
}

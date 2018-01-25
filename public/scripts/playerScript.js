/*window.onload = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.status === 200 || request.status === 304){
            var result = JSON.parse(request.responseText);
            document.getElementById('player-name').innerHTML = result.name + ' [' + result.tag + ']';
            document.getElementById('player-info').innerHTML = '<p class="card-text">Trophies:' + result.trophies + "</p>" + 
            '<p class="card-text">Arena Name: ' + result.arena.name + '</p>' + 
            '<p class="card-text">Arena: ' + result.arena.arena + '</p>' + 
            '<p class="card-text">Player Level: ' + result.stats.level + '</p>' + 
            '<p class="card-text">Wins: ' + result.games.wins + '</p>' + 
            '<p class="card-text">Losses: ' + result.games.losses + '</p>';
        }
    }
    request.open('GET', '/api' + window.location.pathname);
    request.send();
}*/

window.onload = function(){
    fetch('/api' + localStorage.getItem('playerTag')).then(function(response){
        response.text().then(function(text){
            //console.log(text);
            var result = JSON.parse(text);
            document.getElementById('player-name').innerHTML = result.name + ' [' + result.tag + ']';
            document.getElementById('player-info').innerHTML = '<p class="card-text">Trophies:' + result.trophies + "</p>" + 
            '<p class="card-text">Arena Name: ' + result.arena.name + '</p>' + 
            '<p class="card-text">Arena: ' + result.arena.arena + '</p>' + 
            '<p class="card-text">Player Level: ' + result.stats.level + '</p>' + 
            '<p class="card-text">Wins: ' + result.games.wins + '</p>' + 
            '<p class="card-text">Losses: ' + result.games.losses + '</p>';
        });
    });
}
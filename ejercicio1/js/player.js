$(document).ready(() => {
    getData();
});

let audio = document.getElementById('player');
let music;

const getData = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            const {songs} = JSON.parse(this.responseText);
            music = songs;
            getList(songs);
        }
    };
    xhttp.open("GET", "../utils/music/songs.json", true);
    xhttp.send();
};

const getList = (songs) => {
    songs.forEach(element => {
        console.log(element);
        $('#playlist').append(`<li class="list-group-item list-group-item-dark" style="cursor: pointer;" id="${element.id}">${element.name}</li>`);
    });
    $('#playlist li').click(function(){
        var selectedSong =  $(this).attr('id');
        playSong(selectedSong);
    });
}

const playSong = (id) => {
    if(music[id] == music[music.lenght - 1]){
        console.log(id);
        audio.pause();
    }else{
        $('#img-album').attr('src', music[id].cover);
        $('#player').attr('src', music[id].song);
        audio.play();
        playNextSong(id);
    }
}

const playNextSong = (id) => {
    audio.onended = function () {
        playSong(parseInt(id) + 1);
    };
}
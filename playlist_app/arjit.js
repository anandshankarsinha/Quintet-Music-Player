const music = new Audio('audio/1.mp3');
// music.play();

const songs = [
    {
        id: 1,
        songName: `Kesariya(From "Brahmastra") <br> <div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/1.jpg"
    },
    {
        id: 2,
        songName: `Deva Deva <br> <div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/2.jpg"
    },
    {
        id: 3,
        songName: `Humari adhuri kahani <br> <div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/3.jpg"
    }, {
        id: 4,
        songName: `Ve maahi(From "Keshari") <br> <div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/4.jpg",
    }, {
        id: 5,
        songName: `Saware <br><div class=" "subtitle">Arjit singh</div>`,
        poster: "../img/arjit/5.jpg",
    }, {
        id: 6,
        songName: `Qaafirana (Kedarnath) <br> <div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/6.jpg",
    }, {
        id: 7,
        songName: `NasHe Si Chadh Gayi <br><div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/7.jpg",
    }, {
        id: 8,
        songName: `Khairiyat <br><div class="subtitle" ">Arjit singh</div>`,
        poster: "../img/arjit/8.jpg",
    }, {
        id: 9,
        songName: `Raat bhar <br><div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/9.jpg",
    }, {
        id: 10,
        songName: `Agar tum sath ho <br><div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/10.jpg",
    }, {
        id: 11,
        songName: `Tu soch na sake <br><div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/11.jpg",
    }, {
        id: 12,
        songName: `Desh mere <br><div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/12.jpg",
    }, {
        id: 13,
        songName: `Apna bana le <br><div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/13.jpg",
    }, {
        id: 14,
        songName: `Kabhi jo badal barse <br><div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/14.jpg",
    }, {
        id: 15,
        songName: `Tu hai to mujhe <br><div class="subtitle">Arjit singh</div>`,
        poster: "../img/arjit/15.jpg",
    },
]



Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})



let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
})

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=>{
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
        el.style.background = 'rgb(105, 105, 105, .0)';
    })
}
 


let index =0;
let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e)=>{
    e.addEventListener('click', (el) => {
        index= el.target.id;
        // console.log(index);
        music.src = `../audio/arjit/${index}.mp3`;
        poster_master_play.src = `../img/arjit/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href = `../audio/arjit/${index}.mp3`;

        let songTitles = songs.filter((els) => {
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName } = elss;
            title.innerHTML = songName; 
            download_music.setAttribute('download' , songName);
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)"; 
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
    });
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () =>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    // console.log(music_dur);

    let min1 = Math.floor(music_dur/60);
    let sec1 = Math.floor(music_dur%60);


    if (sec1<10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;
    
    let min2 = Math.floor(music_curr/60);
    let sec2 = Math.floor(music_curr%60);

    if (sec2<10) {
        sec2 = `0${sec2}`;
    }

    currentStart.innerText = `${min2}:${sec2}`;

    let progressBar =  parseInt((music_curr/music_dur) * 100)
    seek.value =progressBar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

});

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value* music.duration/100;
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', ()=>{
    if(vol.value == 0)
    {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if(vol.value > 0)
    {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if(vol.value > 50)
    {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a /100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=> {
    index -= 1;
    if (index <1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    } 


    music.src = `../audio/arjit/${index}.mp3`;
    poster_master_play.src = `../img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName } = elss;
        title.innerHTML = songName; 
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)"; 
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
})

next.addEventListener('click', ()=> {
    index ++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }  

    music.src = `../audio/arjit/${index}.mp3`;
    poster_master_play.src = `../img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName } = elss;
        title.innerHTML = songName; 
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)"; 
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
});




let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];


pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})
pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})


let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let Artists_bx = document.getElementsByClassName('Artists_bx')[0];

pop_art_right.addEventListener('click', () => {
    Artists_bx.scrollLeft += 330;
})
pop_art_left.addEventListener('click', () => {
    Artists_bx.scrollLeft -= 330;
})  



let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click', () => {
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;
        case "repeat":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;
        case "random":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }
});



const next_music = () =>{

    if (index == songs.length) {
        index = 1;
    } else {
        index++;
    }
    music.src = `../audio/arjit/${index}.mp3`;
    poster_master_play.src = `../img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `../audio/arjit/${index}.mp3`;

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName } = elss;
        title.innerHTML = songName; 
        download_music.setAttribute('download' , songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)"; 
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}
const repeat_music = () =>{

    index;
    music.src = `../audio/arjit/${index}.mp3`;
    poster_master_play.src = `../img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `../audio/arjit/${index}.mp3`;

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName } = elss;
        title.innerHTML = songName; 
        download_music.setAttribute('download' , songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)"; 
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}
const random_music = () =>{

    if (index == songs.length) {
        index = 1;
    } else {
        index = Math.floor((Math.random() * songs.length) + 1 );
    }

    music.src = `../audio/arjit/${index}.mp3`;
    poster_master_play.src = `img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `../audio/arjit/${index}.mp3`;

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName } = elss;
        title.innerHTML = songName; 
        download_music.setAttribute('download' , songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)"; 
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}



music.addEventListener('ended', () => {
   let b  = shuffle.innerHTML;

   switch (b) {
    case 'repeat':
        repeat_music();
        break;
    case 'next':
        next_music();
        break;
    case 'random':
        random_music();
        break;
   }
} )




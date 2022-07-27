
// Date and Time

function updateClock() {
  var now = new Date();
  var day = now.getDay(),
      month = now.getMonth(),
      date = now.getDate(),
      year = now.getFullYear(),
      hour = now.getHours(),
      minute = now.getMinutes(),
      second = now.getSeconds(),
      period = "AM";

  if (hour >= 12) {
    period = "PM";
  }
  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour = hour - 12;
  }

  Number.prototype.pad = function(digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  }

  var months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
  var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ids = ["day-name", "month", "day-num", "year", "hour", "minutes", "seconds", "period"];
  var values = [week[day], months[month], date.pad(2), year, hour.pad(2), minute.pad(2), second.pad(2), period];
  for (var i = 0; i < ids.length; i++)
  document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}

// Music player code

const playBtn = document.querySelector(".play"),
      skipForwardBtn = document.querySelector(".skip-forward"),
      skipBackwardBtn = document.querySelector(".skip-backward"),
      img = document.querySelector(".cover-img"),
      title = document.querySelector(".audio-title"),
      singer = document.querySelector(".audio-artist"),
      playIcon = document.querySelector(".fa-play"),
      progressContainer = document.querySelector(".progress"),
      progressBar = document.querySelector(".progress-bar"),
      progressHead = document.querySelector(".progress-head"),
      currentTimeHtml = document.querySelector(".current-time"),
      durationHtml = document.querySelector(".duration");

      this.tracks = [
        {
            name: "Romantic Evening",
            artist: "SonicPulse",
            cover: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&dl=amy-shamblen-qdPnQuGeuwU-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
            source: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/659/versions/328.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1658573840&Signature=QS3Zivfyoe1Ddk5360D15JSgZiE%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_659_romantic-evening_by_sonicpulse.mp3",
        },
        {
            name: "Inspiring Background",
            artist: "Musicstockproduction",
            cover: "https://images.unsplash.com/photo-1533119408463-b0f487583ff6?ixlib=rb-1.2.1&dl=dmytro-tolokonov-Jq3WI9IQgEs-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
            source: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/2293/versions/1421.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1658574710&Signature=pbmL%2FwTatXSeTwgjh9fUY3C95qQ%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_2293_inspiring-background_by_musicstockproduction.mp3",
        },
        {
            name: "Night City",
            artist: "SonicPulse",
            cover: "https://images.unsplash.com/photo-1577943306215-c7cc19b1ff89?ixlib=rb-1.2.1&dl=josue-as-QOBW_juS9Nc-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
            source: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/892/versions/453.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1658625624&Signature=cuA%2FALPNiKv8Rla3YsUAk31Ijq8%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_892_night-city_by_sonicpulse.mp3",
        },
    ];

let audio = null,
barWidth = null,
duration = null,
currentTime = null,
isTimerPlaying = false,
currentTrackIndex = 0,
currentTrack = tracks[0];

audio = new Audio();
audio.src = currentTrack.source;
img.src = currentTrack.cover;
title.innerText = currentTrack.name;
singer.innerText = currentTrack.artist;

playBtn.addEventListener('click', () => {
  if (audio.paused){
    audio.play();
    isTimerPlaying = true;
  }
  else {
    audio.pause();
    isTimerPlaying = false;
  }
});

progressContainer.addEventListener('click', (x)=> {
  let maxduration = audio.duration;
  let position = x.pageX - progressContainer.offsetLeft;
  let percentage = (100 * position) / progressContainer.offsetWidth;
  if(percentage > 100) percentage = 100;
  if(percentage < 0) percentage = 0;

  audio.currentTime = (maxduration * percentage) / 100;
  barWidth = percentage + "%";
  progressBar.style.width = `${barWidth}`;
  progressHead.style.setProperty("left", `${barWidth}`);
  
});

skipForwardBtn.addEventListener('click', ()=> {
  if (currentTrackIndex < tracks.length - 1 ) {
    currentTrackIndex++;
  }
  else {
    currentTrackIndex = 0;
  }
  currentTrack = tracks[currentTrackIndex];

  audio.src = currentTrack.source;
  img.src = currentTrack.cover;
  title.innerText = currentTrack.name;
  singer.innerText = currentTrack.artist;

  barWidth = 0;
  progressBar.style.width = `${barWidth}%`;
  progressHead.style.setProperty("left", `${barWidth}%`);
  currentTimeHtml.innerText = `00:00`;
  durationHtml.innerText = `00:00`;

  audio.currentTime = 0;
  audio.src = currentTrack.source;

  setTimeout(() => {
    if(isTimerPlaying){
      audio.play();
    }
    else {
      audio.pause();
    }
  }, 300)
});

skipBackwardBtn.addEventListener('click', ()=> {
  if (currentTrackIndex > 0 ) {
    currentTrackIndex--;
  }
  else {
    currentTrackIndex = this.tracks.length - 1;
  }
  currentTrack = tracks[currentTrackIndex];

  audio.src = currentTrack.source;
  img.src = currentTrack.cover;
  title.innerText = currentTrack.name;
  singer.innerText = currentTrack.artist;

  barWidth = 0;
  progressBar.style.width = `${barWidth}%`;
  progressHead.style.setProperty("left", `${barWidth}%`);
  currentTimeHtml.innerText = `00:00`;
  durationHtml.innerText = `00:00`;

  audio.currentTime = 0;
  audio.src = currentTrack.source;

  setTimeout(() => {
    if(isTimerPlaying){
      audio.play();
    }
    else {
      audio.pause();
    }
  }, 300)
});

audio.ontimeupdate = function(){
  if (audio.duration) {
    barWidth = (100/ audio.duration) * audio.currentTime;

    let durmin = Math.floor(audio.duration / 60);
    let dursec = Math.floor(audio.duration - durmin * 60);
    let curmin = Math.floor(audio.currentTime / 60);
    let cursec = Math.floor(audio.currentTime - curmin * 60);

    if (durmin < 10) durmin = "0" + durmin;
    if (dursec < 10) dursec = "0" + dursec;
    if (curmin < 10) curmin = "0" + curmin;
    if (cursec < 10) cursec = "0" + cursec;

    duration = durmin + ":" + dursec;
    currentTime = curmin + ":" + cursec;

    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `${currentTime}`;
    durationHtml.innerText = `${duration}`;

    if (isTimerPlaying) {
      playIcon.classList.remove('fa-play');
      playIcon.classList.add('fa-pause');
    }
    else {
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
    }
  }
}

// Folder Opening and Closeing

let folderPage = document.getElementsByClassName('folder-open')[0];
function openF() {
  folderPage.style.visibility = "visible";
}
function closeF() {
  folderPage.style.visibility = "hidden";
}
document.getElementsByClassName('folder') [0].addEventListener('click', openF);
document.getElementsByClassName('exit') [0].addEventListener('click', closeF);

let folderTaskBar = document.getElementsByClassName('folder-wrapper')[0];
function highlight() {
  folderTaskBar.style.backgroundColor = "rgba(000, 000, 000, .1)";
}
function notHighlight() {
  folderTaskBar.style.backgroundColor = "";
}
document.getElementsByClassName('folder') [0].addEventListener('click', highlight);
document.getElementsByClassName('exit') [0].addEventListener('click', notHighlight);
document.getElementsByClassName('folder-wrapper') [0].addEventListener('click', openF);
document.getElementsByClassName('folder-wrapper') [0].addEventListener('click', highlight);
document.getElementsByClassName('folder-wrapper') [0].addEventListener('click', notHighlightM);
document.getElementsByClassName('folder-wrapper') [0].addEventListener('click', closeP);
document.getElementsByClassName('folder') [0].addEventListener('click', closeP);
document.getElementsByClassName('folder') [0].addEventListener('click', notHighlightM);
document.getElementsByClassName('folder') [0].addEventListener('click', notHighlightS);
document.getElementsByClassName('folder-wrapper') [0].addEventListener('click', notHighlightS);
document.getElementsByClassName('folder-wrapper') [0].addEventListener('click', closeS);
document.getElementsByClassName('folder') [0].addEventListener('click', closeS);

// Music player Opening and Closeing

let musicPage = document.getElementsByClassName('audio-player')[0];
function openP() {
  musicPage.style.visibility = "visible";
}
function closeP() {
  musicPage.style.visibility = "hidden";
}
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', openP);
document.getElementsByClassName('exit-audio') [0].addEventListener('click', closeP);
document.getElementsByClassName('exit-audio') [0].addEventListener('click', closeB);

let musicTaskBar = document.getElementsByClassName('music-player-wrapper')[0];
function highlightM() {
  musicTaskBar.style.backgroundColor = "rgba(000, 000, 000, .1)";
}
function notHighlightM() {
  musicTaskBar.style.backgroundColor = "";
}
document.getElementsByClassName('exit-audio') [0].addEventListener('click', notHighlightM);
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', openF);
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', highlightM);
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', notHighlight);
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', closeF);
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', notHighlightS);
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', closeS);

// Start Opening and Closeing

let startPage = document.getElementsByClassName('start-wrapper')[0];
function openS() {
  startPage.style.visibility = "visible";
}
function closeS() {
  startPage.style.visibility = "hidden";
}
document.getElementsByClassName('win-wrwpper') [0].addEventListener('click', openS);
// document.getElementsByClassName('win-wrwpper') [0].addEventListener('click', closeS);

let startTaskBar = document.getElementsByClassName('win-wrwpper')[0];
function highlightS() {
  startTaskBar.style.backgroundColor = "rgba(000, 000, 000, .1)";
}
function notHighlightS() {
  startTaskBar.style.backgroundColor = "";
}
document.getElementsByClassName('win-wrwpper') [0].addEventListener('click', highlightS);
document.getElementsByClassName('win-wrwpper') [0].addEventListener('click', notHighlight);
document.getElementsByClassName('win-wrwpper') [0].addEventListener('click', notHighlightM);
document.getElementsByClassName('start-wrapper') [0].addEventListener('click', closeS);

// Post Opening and Closeing

let backIcon = document.getElementsByClassName('back')[0];
function openB() {
  backIcon.style.visibility = "visible";
}
function closeB() {
  backIcon.style.visibility = "hidden";
}
document.getElementsByClassName('grid-element-1') [0].addEventListener('click', openB);
document.getElementsByClassName('grid-element-2') [0].addEventListener('click', openB);
document.getElementsByClassName('grid-element-3') [0].addEventListener('click', openB);
document.getElementsByClassName('grid-element-4') [0].addEventListener('click', openB);
document.getElementsByClassName('grid-element-5') [0].addEventListener('click', openB);
document.getElementsByClassName('grid-element-6') [0].addEventListener('click', openB);
document.getElementsByClassName('grid-element-7') [0].addEventListener('click', openB);
document.getElementsByClassName('grid-element-8') [0].addEventListener('click', openB);
document.getElementsByClassName('grid-element-9') [0].addEventListener('click', openB);
document.getElementsByClassName('back') [0].addEventListener('click', closeB);
document.getElementsByClassName('exit') [0].addEventListener('click', closeB);

let mainGrid = document.getElementsByClassName('grid-overflow')[0];
function openMainGrid() {
  mainGrid.style.visibility = "visible";
}
function closeMainGrid() {
  mainGrid.style.visibility = "hidden";
}

document.getElementsByClassName('back') [0].addEventListener('click', openMainGrid);
document.getElementsByClassName('folder') [0].addEventListener('click', openMainGrid);
document.getElementsByClassName('folder-wrapper') [0].addEventListener('click', openMainGrid);
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('music-player-wrapper') [0].addEventListener('click', closeB);
document.getElementsByClassName('folder') [0].addEventListener('click', closeB);
document.getElementsByClassName('folder-wrapper') [0].addEventListener('click', closeB);
document.getElementsByClassName('exit') [0].addEventListener('click', closeMainGrid);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let exitIcon = document.getElementsByClassName('exit')[0];
let folderIcon = document.getElementsByClassName('folder')[0];


let g11Grid = document.getElementsByClassName('grid-overflow-1')[0];
function openG11Grid() {
  g1Grid.style.visibility = "visible";
}
let g1Grid = document.getElementsByClassName('grid-overflow-1')[0];
  backIcon.addEventListener('click', () => {
    g1Grid.style.visibility = 'hidden';
  });
  exitIcon.addEventListener('click', () => {
    g1Grid.style.visibility = 'hidden';
  });
  folderTaskBar.addEventListener('click', () => {
    g1Grid.style.visibility = 'hidden';
  })
  musicTaskBar.addEventListener('click', () => {
    g1Grid.style.visibility = 'hidden';
  })
  folderIcon.addEventListener('click', () => {
    g1Grid.style.visibility = 'hidden';
  })


  let g22Grid = document.getElementsByClassName('grid-overflow-2')[0];
  function openG22Grid() {
      g2Grid.style.visibility = "visible";
   }
  let g2Grid = document.getElementsByClassName('grid-overflow-2')[0];
  backIcon.addEventListener('click', () => {
    g2Grid.style.visibility = 'hidden';
  });
  exitIcon.addEventListener('click', () => {
    g2Grid.style.visibility = 'hidden';
  });
  folderTaskBar.addEventListener('click', () => {
    g2Grid.style.visibility = 'hidden';
  })
  musicTaskBar.addEventListener('click', () => {
    g2Grid.style.visibility = 'hidden';
  })
  folderIcon.addEventListener('click', () => {
    g2Grid.style.visibility = 'hidden';
  })
  

let g33Grid = document.getElementsByClassName('grid-overflow-3')[0];
function openG33Grid() {
    g3Grid.style.visibility = "visible";
 }
let g3Grid = document.getElementsByClassName('grid-overflow-3')[0];
backIcon.addEventListener('click', () => {
  g3Grid.style.visibility = 'hidden';
});
exitIcon.addEventListener('click', () => {
  g3Grid.style.visibility = 'hidden';
});
folderTaskBar.addEventListener('click', () => {
  g3Grid.style.visibility = 'hidden';
})
musicTaskBar.addEventListener('click', () => {
  g3Grid.style.visibility = 'hidden';
})
folderIcon.addEventListener('click', () => {
  g3Grid.style.visibility = 'hidden';
})


let g44Grid = document.getElementsByClassName('grid-overflow-4')[0];
function openG44Grid() {
    g4Grid.style.visibility = "visible";
 }
let g4Grid = document.getElementsByClassName('grid-overflow-4')[0];
backIcon.addEventListener('click', () => {
  g4Grid.style.visibility = 'hidden';
});
exitIcon.addEventListener('click', () => {
  g4Grid.style.visibility = 'hidden';
});
folderTaskBar.addEventListener('click', () => {
  g4Grid.style.visibility = 'hidden';
})
musicTaskBar.addEventListener('click', () => {
  g4Grid.style.visibility = 'hidden';
})
folderIcon.addEventListener('click', () => {
  g4Grid.style.visibility = 'hidden';
})


let g55Grid = document.getElementsByClassName('grid-overflow-5')[0];
function openG55Grid() {
    g5Grid.style.visibility = "visible";
 }
let g5Grid = document.getElementsByClassName('grid-overflow-5')[0];
backIcon.addEventListener('click', () => {
  g5Grid.style.visibility = 'hidden';
});
exitIcon.addEventListener('click', () => {
  g5Grid.style.visibility = 'hidden';
});
folderTaskBar.addEventListener('click', () => {
  g5Grid.style.visibility = 'hidden';
})
musicTaskBar.addEventListener('click', () => {
  g5Grid.style.visibility = 'hidden';
})
folderIcon.addEventListener('click', () => {
  g5Grid.style.visibility = 'hidden';
})


let g66Grid = document.getElementsByClassName('grid-overflow-6')[0];
function openG66Grid() {
    g6Grid.style.visibility = "visible";
 }
let g6Grid = document.getElementsByClassName('grid-overflow-6')[0];
backIcon.addEventListener('click', () => {
  g6Grid.style.visibility = 'hidden';
});
exitIcon.addEventListener('click', () => {
  g6Grid.style.visibility = 'hidden';
});
folderTaskBar.addEventListener('click', () => {
  g6Grid.style.visibility = 'hidden';
})
musicTaskBar.addEventListener('click', () => {
  g6Grid.style.visibility = 'hidden';
})
folderIcon.addEventListener('click', () => {
  g6Grid.style.visibility = 'hidden';
})


let g77Grid = document.getElementsByClassName('grid-overflow-7')[0];
function openG77Grid() {
    g7Grid.style.visibility = "visible";
 }
let g7Grid = document.getElementsByClassName('grid-overflow-7')[0];
backIcon.addEventListener('click', () => {
  g7Grid.style.visibility = 'hidden';
});
exitIcon.addEventListener('click', () => {
  g7Grid.style.visibility = 'hidden';
});
folderTaskBar.addEventListener('click', () => {
  g7Grid.style.visibility = 'hidden';
})
musicTaskBar.addEventListener('click', () => {
  g7Grid.style.visibility = 'hidden';
})
folderIcon.addEventListener('click', () => {
  g7Grid.style.visibility = 'hidden';
})


let g88Grid = document.getElementsByClassName('grid-overflow-8')[0];
function openG88Grid() {
    g8Grid.style.visibility = "visible";
 }
let g8Grid = document.getElementsByClassName('grid-overflow-8')[0];
backIcon.addEventListener('click', () => {
  g8Grid.style.visibility = 'hidden';
});
exitIcon.addEventListener('click', () => {
  g8Grid.style.visibility = 'hidden';
});
folderTaskBar.addEventListener('click', () => {
  g8Grid.style.visibility = 'hidden';
})
musicTaskBar.addEventListener('click', () => {
  g8Grid.style.visibility = 'hidden';
})
folderIcon.addEventListener('click', () => {
  g8Grid.style.visibility = 'hidden';
})


let g99Grid = document.getElementsByClassName('grid-overflow-9')[0];
function openG99Grid() {
    g9Grid.style.visibility = "visible";
 }
let g9Grid = document.getElementsByClassName('grid-overflow-9')[0];
backIcon.addEventListener('click', () => {
  g9Grid.style.visibility = 'hidden';
});
exitIcon.addEventListener('click', () => {
  g9Grid.style.visibility = 'hidden';
});
folderTaskBar.addEventListener('click', () => {
  g9Grid.style.visibility = 'hidden';
})
musicTaskBar.addEventListener('click', () => {
  g9Grid.style.visibility = 'hidden';
})
folderIcon.addEventListener('click', () => {
  g9Grid.style.visibility = 'hidden';
})


document.getElementsByClassName('grid-element-1') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-1') [0].addEventListener('click', openG11Grid);

document.getElementsByClassName('grid-element-2') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-2') [0].addEventListener('click', openG22Grid);

document.getElementsByClassName('grid-element-3') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-3') [0].addEventListener('click', openG33Grid);

document.getElementsByClassName('grid-element-4') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-4') [0].addEventListener('click', openG44Grid);

document.getElementsByClassName('grid-element-5') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-5') [0].addEventListener('click', openG55Grid);

document.getElementsByClassName('grid-element-6') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-6') [0].addEventListener('click', openG66Grid);

document.getElementsByClassName('grid-element-7') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-7') [0].addEventListener('click', openG77Grid);

document.getElementsByClassName('grid-element-8') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-8') [0].addEventListener('click', openG88Grid);

document.getElementsByClassName('grid-element-9') [0].addEventListener('click', closeMainGrid);
document.getElementsByClassName('grid-element-9') [0].addEventListener('click', openG99Grid);







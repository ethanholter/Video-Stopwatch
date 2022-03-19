let video
const slider = document.getElementById("videoslider");
const pausebutton = document.getElementById("pausebutton");
const fileInput = document.getElementById('fileInput');
const sliderResolution = 100;

//TODO hardcoded wait load time. need to make this better later

function roundTo(num, numDecimals) {
  return Math.round(num * (10 ** numDecimals))/(10 ** numDecimals)
}

function playPause() {
  if (video == null) return
  if (video.paused) {
    video.play(); 
    pausebutton.innerHTML = "Pause"
  } else {
    video.pause(); 
    pausebutton.innerHTML = "Play"
  }
}

function loadVideo(filePath) {
  let videoContainer = document.getElementById("videoContainer");

  if (video) {
    clearInterval(refreshTimer);
    removeEventListener('change', checkSliderChange);
  }


  videoContainer.innerHTML = ''
  video = document.createElement('video');
  try {
    video.setAttribute('src', filePath);
  } catch(error) {
    alert(error);
  }

  video.setAttribute('id', 'video');
  videoContainer.appendChild(video);

  setTimeout(() => {
    sliderMax = Math.round(video.duration) * sliderResolution; //mp4s play at 24 fps
    slider.setAttribute("max", sliderMax)
    slider.value = 0;
  }, 50)

  var refreshTimer = setInterval(() => {
    if (video.paused) return
    slider.value = video.currentTime * sliderResolution;
    updateTimeIndicator()
  }, 50);

  var checkSliderChange = slider.addEventListener('input', function () {
    if (!video.paused) video.pause(); pausebutton.innerHTML = "Play";
    video.currentTime = slider.value / sliderResolution;
    updateTimeIndicator()
  })
}

function updateTimeIndicator() {
  document.getElementById('timeIndicator').innerHTML = roundTo(video.currentTime, 2)
}

function addTime(num) {
  if (video == null) return
  if (!video.paused) video.pause(); pausebutton.innerHTML = "Play";
  video.currentTime += num
  slider.value = video.currentTime * sliderResolution;
  updateTimeIndicator()
}

//workaround solution to get rid of "No file selected" text for file select
fileInput.firstElementChild.addEventListener('change', () => {
  loadVideo(fileInput.firstElementChild.files[0].path);
})
fileInput.lastElementChild.addEventListener('click', () => {
  fileInput.firstElementChild.click();
})
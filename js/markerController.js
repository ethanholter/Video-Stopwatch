const dataContainer = document.getElementById("data");
var markerTimes = []

function sort(arr){
    for(var i = 0; i < arr.length; i++){
      // Last i elements are already in place  
      for(var j = 0; j < ( arr.length - i -1 ); j++){
        // Checking if the item at present iteration 
        // is greater than the next iteration
        if(arr[j] > arr[j+1]){
          // If the condition is true then swap them
          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j+1] = temp
        }
      }
    }
    return arr
}

document.querySelector('#newMarkerButton').addEventListener('click', () => {
    addMarker();
})

function updateMarkers() {
    let string = ""
    for (let i = 0; i < markerTimes.length; i++) {
        diff = i > 0 ? markerTimes[i] - markerTimes[i - 1] : markerTimes[0];
        diff = roundTo(diff, 2)
        splitNum = i > 0 ? `Split ${i}` : "Start"
        string = string.concat(`<div class = \"split\"><b>${splitNum}: ${roundTo(markerTimes[i] - markerTimes[0], 2)} sec</b> (+${diff})</div>`)
    }
    dataContainer.innerHTML = string;

    let markerElements = document.querySelectorAll('.split');

    for (let i = 0; i < markerElements.length; i++) {
        markerElements[i].addEventListener('click', () => {
            removeMarker(i);
        })
    }
}

function removeMarker(index) {
    markerTimes.splice(index, 1)
    updateMarkers()
}

function addMarker() {
    if(!video) return;
    markerTimes.push(video.currentTime)
    markerTimes = sort(markerTimes);
    updateMarkers()
}




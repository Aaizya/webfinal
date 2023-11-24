
// Function to open a specific tab and hide others
function openTab(tabId) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "block";
}


// Sound
 
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("myAudio");
    const playButton = document.getElementById("playButton");
    let isPlaying = false;

    playButton.addEventListener("click", function() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = "Play Sound";
            isPlaying = false;
        } else {
            audio.play()
                .then(() => {
                    playButton.innerHTML = "Pause Sound";
                    isPlaying = true;
                })
                .catch(error => {
                    console.error("Error playing audio: " + error);
                });
        }
    });
});

// navbar
document.getElementById('playButton').addEventListener('mouseover', function () {
    this.classList.add('hovered'); 
});

document.getElementById('playButton').addEventListener('mouseout', function () {
    this.classList.remove('hovered');
});

// game

const jumbledWords = document.querySelectorAll('#jumbledWordsWrapper > span');
const orderedWords = document.querySelectorAll('#orderedWordsWrapper > span');
jumbledWords.forEach(el => {
  el.addEventListener('dragstart', dragStartHandler);
  el.addEventListener('dragend', dragEndHandler);
})
orderedWords.forEach(el => {
  el.addEventListener('dragenter', dragEnterHandler);
  el.addEventListener('dragover', dragOverHandler);
  el.addEventListener('dragleave', dragLeaveHandler);
  el.addEventListener('drop', dropHandler);
})
function dragStartHandler(e) {
  e.dataTransfer.setData('text', e.target.getAttribute('data-source-id'));
  e.target.style = 'opacity: 0.3';
}
function dragEndHandler(e) {
  e.target.style = 'opacity: 1';
}
function dragEnterHandler(e) {
  e.target.style = 'border: 2px dashed gray; box-sizing: border-box; background: whitesmoke';
}
function dragOverHandler(e) {
  event.preventDefault();
}
function dragLeaveHandler(e) {
  e.target.style = 'border: none; background: #abcdef';
}
function dropHandler(e) {
  e.preventDefault();
  dragLeaveHandler(e); 
  
  const dataSourceId = e.dataTransfer.getData('text'); 
  const dataTargetId = e.target.getAttribute('data-target-id');
  
  if(dataSourceId === dataTargetId) {
    e.target.insertAdjacentHTML('afterbegin', dataSourceId);
    e.target.style = 'border: none; background: #abcdef';
    
    let sourceElemDataId = 'span[data-source-id="' + dataSourceId + '"]';
    let sourceElemSpanTag = document.querySelector(sourceElemDataId);
    
    Object.assign(sourceElemSpanTag, {
      className: 'no-longer-draggable',
      draggable: false,
    });
  }
  
}

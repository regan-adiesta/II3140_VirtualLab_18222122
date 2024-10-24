const navMenu = document.getElementById('menu'),
      navToggle = document.getElementById('toggle'),
      navClose = document.getElementById('close');


if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('showmenu');
        temp=document.getElementById('help').style.zIndex=-1;
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('showmenu');
        temp=document.getElementById('help').style.zIndex=1;
    })
}

const navLink = document.querySelectorAll('.navlink')

const linkA = () =>{
    const navMenu = document.getElementById('menu')
    navMenu.classList.remove('showmenu')
}
navLink.forEach(i => i.addEventListener('click' , linkA) )

// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook(false);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;
            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;
            default:
                throw new Error("unkown state");
        }

        currentLocation--;
    }
}

const photos = document.querySelectorAll('.photo');
const photosZone = document.getElementById('photoszone')
const dropZones = document.querySelectorAll('.dropzone');


// photos.addEventListener('dragstart', function(event) {
// 	console.log(event)
// })

// photosZone.addEventListener('dragover', function(event) {
// 	event.preventDefault()
// })
// photosZone.addEventListener('drop', function(event) {
//     event.preventDefault();
//     photosZone.appendChild(photos); // Move the photos back to the photos zone
//     console.log('photos returned to photos zone');
// })

// dropZone.addEventListener('dragover', function(event) {
// 	event.preventDefault()
// })
// dropZone.addEventListener('drop', function(event) {
//     event.preventDefault();
//     dropZone.appendChild(photos); // Move the photos into the drop zone
//     console.log('photos dropped in drop zone');
// })

// photos.forEach(photo => {
//     photo.addEventListener('dragstart', function(event) {
//         event.dataTransfer.setData('text', event.target.id);
//     });
// });

// Allow drop on each drop zone

// Loop through each photo and add the dragstart event
// Loop through each photo and add the dragstart event
photos.forEach(photo => {
    photo.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text', event.target.id); // Set the photo id
    });
});

// Allow drop on each drop zone
dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', function(event) {
        event.preventDefault(); // Necessary to allow dropping
    });

    dropZone.addEventListener('drop', function(event) {
        event.preventDefault();
        const photoId = event.dataTransfer.getData('text'); // Get the photo id
        const draggedPhoto = document.getElementById(photoId); // Find the dragged photo
        
        // Check if the dropzone is empty (no child elements)
        if (!dropZone.hasChildNodes()) {
            dropZone.appendChild(draggedPhoto); // Append the photo to the drop zone if it's empty
        } else {
            alert("Try "); // Show a message if it's not empty
        }
    });
});

// Allow returning the photo back to the photos zone
photosZone.addEventListener('dragover', function(event) {
    event.preventDefault();
});

photosZone.addEventListener('drop', function(event) {
    event.preventDefault();
    const photoId = event.dataTransfer.getData('text'); // Get the photo id
    const draggedPhoto = document.getElementById(photoId); // Find the dragged photo
    photosZone.appendChild(draggedPhoto); // Append the photo back to the original zone
});
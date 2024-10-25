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


photos.forEach(photo => {
    photo.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text', event.target.id); 
    });
});

// dropZones.forEach(dropZone => {
//     dropZone.addEventListener('dragover', function(event) {
//         event.preventDefault(); 
//     });

//     dropZone.addEventListener('drop', function(event) {
//         event.preventDefault();
//         const photoId = event.dataTransfer.getData('text'); 
//         const draggedPhoto = document.getElementById(photoId); 
        
//         if (!dropZone.hasChildNodes()) {
//             dropZone.appendChild(draggedPhoto); 
//         } else {
//             alert("Sudah terisi silahkan coba kotak yang lain."); 
//         }
//     });
// });
dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', function(event) {
        event.preventDefault(); 
    });

    dropZone.addEventListener('drop', function(event) {
        event.preventDefault();
        const photoId = event.dataTransfer.getData('text'); 
        const draggedPhoto = document.getElementById(photoId); 
        
        if (!dropZone.hasChildNodes()) {
            dropZone.appendChild(draggedPhoto); 
            checkFormula(); // Trigger formula check after successful drop
        } else {
            alert("Sudah terisi silahkan coba kotak yang lain."); 
        }
    });
});

photosZone.addEventListener('dragover', function(event) {
    event.preventDefault();
});

photosZone.addEventListener('drop', function(event) {
    event.preventDefault();
    const photoId = event.dataTransfer.getData('text'); 
    const draggedPhoto = document.getElementById(photoId); 
    photosZone.appendChild(draggedPhoto); 
});


function checkFormula() {
    const dropzone1 = document.getElementById("dropzone1").children[0]?.id || null;
    const dropzone2 = document.getElementById("dropzone2").children[0]?.id || null;
    const dropzone3 = document.getElementById("dropzone3").children[0]?.id || null;

    const currenPhotos = new Set([dropzone1, dropzone2, dropzone3]);

    let formula = "";
    let desc1 = "";
    let desc2 = "";

    const formula1 = new Set(["photo1", "photo2", "photo5"]); 
    const formula2 = new Set(["photo3", "photo4", "photo5"]); 
    const formula3 = new Set(["photo6", "photo7", "photo5"]); 

    if (isEqualSet(currenPhotos, formula1)) {
        formula = "sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1";
        desc1 = "Do you mean this formula?? >W<";
        desc2 = "This is a <b>Pythagorean identities</b>, as the name suggests, are derived from the Pythagoras theorem."
    } else if (isEqualSet(currenPhotos, formula2)) {
        formula = "1 + tan<sup>2</sup>θ = sec<sup>2</sup>θ";
        desc1 = "Do you mean this formula?? >W<";
        desc2 = "This is a <b>Pythagorean identities</b>, as the name suggests, are derived from the Pythagoras theorem."
    } else if ((isEqualSet(currenPhotos, formula3))) {
        formula = "1 + cot<sup>2</sup>θ = csc<sup>2</sup>θ";
        desc1 = "Do you mean this formula?? >W<";
        desc2 = "This is a <b>Pythagorean identities</b>, as the name suggests, are derived from the Pythagoras theorem."
    } else {
        formula = "Hmmm...Sorry!";
        desc1 = "I dont know this formula yet >__<";
    }

    document.getElementById("revealText").innerHTML = formula;
    document.getElementById("revealDesc1").innerText = desc1;
    document.getElementById("revealDesc2").innerHTML = desc2;
}

function isEqualSet(setA, setB) {
    if (setA.size !== setB.size) return false;
    for (let item of setA) {
        if (!setB.has(item)) return false;
    }
    return true;
}
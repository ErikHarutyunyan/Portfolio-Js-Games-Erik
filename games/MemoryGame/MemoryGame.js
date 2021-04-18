// For picture-name data save
let comprasionArray = [];

// For event-picture-name data save
let eventHistory = [];

// For Clear Event data save
let clearEventHistory = [];

// Score
let count = 0;

let style = 0;

// For Main Function
let bool = false;

// For Mix 
// Full Name picture-name
let backImgClass = [
  "vic",
  "king",
  "uzi",
  "shoes",
  "yup",
  "mask",
  "oko",
  "hand",
  "vic",
  "king",
  "uzi",
  "shoes",
  "yup",
  "mask",
  "oko",
  "hand",
];

// Mix Up Picture Places
let mixArray = function (numsMixed) {
  let tmp;
  let i = 0;
  while (i < backImgClass.length / 2) {
    tmp = backImgClass[i];
    backImgClass[i] = backImgClass[numsMixed[i]];
    backImgClass[numsMixed[i]] = tmp;
    i++;
  }
  installImg(backImgClass);
};

// Install Picture to class img
let installImg = function (backImgClass) {
  let imgClass = document.getElementsByClassName("img");
  for (let i = 0; i < backImgClass.length; ++i) {
    imgClass[i].classList.toggle(backImgClass[i]);
  }
};

// Random Array-Index
let randomArrayIndex = function() {
  let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    numsMixed = [];
    while (nums.length) {
      numsMixed = numsMixed.concat(nums.splice(Math.random() * nums.length, 1));
    }
    mixArray(numsMixed);
}

randomArrayIndex()

// ImgInfo  1 Get image class picture-name, 2 class img, 3 full div where is class img class picture-name
ImgInfo = function (element) {
    let imgClass = {
      name: element.lastElementChild.firstElementChild.classList[1],
      img: element.lastElementChild.firstElementChild.classList[0],
      imgDiv: element.lastElementChild.firstElementChild,
    };
    return imgClass;
};

// Check Two Pictures if Equal Go To AddAnime
let checkTwoTwins = function () {
  if (comprasionArray[0].name === comprasionArray[1].name) {
    addAnime(comprasionArray);
  } else {
    reverseFlip(eventHistory[0]);
    reverseFlip(eventHistory[1]);
  }
};

// Add Animation twin pictures 
let addAnime = function () {
  comprasionArray[0].imgDiv.classList.toggle("animation");
  comprasionArray[1].imgDiv.classList.toggle("animation");
  clearEventHistory.push(eventHistory[0]);
  clearEventHistory.push(eventHistory[1]);
  let text = document.getElementsByClassName("point")[0];
  text.innerHTML = `Score: ${++count}`;
};

// Push comprasionArray-> {picture-name} and eventHistory-> {event-picture-name}
let pushHistory = function (cardsFlip, imgClass) {
  let pushBool = true;

  for (let j = 0; j < clearEventHistory.length; ++j) {
    if (cardsFlip === clearEventHistory[j]) {
      pushBool = false;
      // return false;
    }
  }
  if (eventHistory.length === 0 && comprasionArray.length === 0 && pushBool) {
    comprasionArray.push(imgClass);
    eventHistory.push(cardsFlip);
  }
  for (let i = 0; i < eventHistory.length; ++i) {
    if (cardsFlip === eventHistory[i]) {
      pushBool = false;
    }
  }
  if (pushBool) {
    comprasionArray.push(imgClass);
    eventHistory.push(cardsFlip);
  }
  return pushBool
};

//  Delete the first two data comprasionArray eventHistory
let deletHistory = function () {
  comprasionArray.splice(0, 2);
  eventHistory.splice(0, 2);
};

// Reverse Picture
let reverseFlip = function (event) {
  let element = event;
  if (element.classList[0] === "card") {
    if (element.style.transform == "rotateY(180deg)") {
      element.style.transform = "rotateY(0deg)";
    } else {
    }
  }
  bool = false;
};

// Clears All Installed Data (Score and class {picture-name} and class animation)
let restartGame = function () {
  let img = document.getElementsByClassName("img");
  let card = document.getElementsByClassName("card");
  
  for (let k = 0; k < card.length; ++k) {
    reverseFlip(card[k]);
  }

  for (let i = 0; i < img.length; ++i) {
    if (img[i].classList.length == 2) {
      img[i].classList.remove(img[i].classList[1]);
    } 
    else if (img[i].classList.length == 3) {
      img[i].classList.remove(img[i].classList[1]);
      img[i].classList.remove(img[i].classList[1]);
    }

    count = 0;
    let text = document.getElementsByClassName("point")[0];
    text.innerHTML = `Score: ${count}`;
  }
  randomArrayIndex();
  clearEventHistory = []
  changeImg()
 
};

// Show Restart Game
let showClass = function() {
  let elemClass = document.getElementById("new-game")
  elemClass.classList.toggle('show')
  return true
}

// Change Background Image
let changeImg = function() {
  
  let bodyImg = `url('img/style${style}.jpg')`
  let frontImgUrl = `url('img/front/${style}.gif')`
  document.body.style.backgroundImage = bodyImg;
  let frontImg = document.getElementsByClassName("front")
  
  for(let i = 0; i < frontImg.length; ++i) {
    frontImg[i].style.backgroundImage = frontImgUrl
  }

  if(++style === 3) {
    style = 0;
  }
};

// Click Event
let click = $(".card").on("click", function (event) {
  $(this).css("transform", "rotateY(180deg)");

  bool = true;
  main(bool, event);
});

// Main function
let main = function (bool, event) {
  while (bool) {
    let element = event.currentTarget;
    let cardsFlip = element;
    let imgClass = ImgInfo(element);

    let imgClassName = imgClass.img === "img" ? imgClass.name : null;

    if (imgClassName !== null && comprasionArray.length < 3 && eventHistory.length < 3) {
      let pushBool = pushHistory(cardsFlip,imgClass);
      bool = pushBool;
    }

    if (comprasionArray.length == 2) {
      if (comprasionArray[0].name === comprasionArray[1].name) {
        checkTwoTwins();
        deletHistory();
        bool = false;
      } 
      else {
        bool = false;
      }
    } else if (comprasionArray.length >= 3) {
      checkTwoTwins();
      deletHistory();
      bool = false;
    }
  }
// clearEventHistory.length = 16;
  if(clearEventHistory.length === 16) {
      restartGame()
      showClass()
  }

};
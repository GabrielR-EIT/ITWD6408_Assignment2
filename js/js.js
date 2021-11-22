/*--- Variables ---*/
allButtons = document.getElementsByClassName("demo-button");//Return an array storing all buttons
allDemoAreas = document.getElementsByClassName("demo-box");//Return an array storing all demo boxes
demoAreaColor = ["linear-gradient(0deg, rgb(216, 132, 36) 0%, rgb(233, 150, 55) 62%, rgb(250, 163, 63) 100%);", "linear-gradient(0deg, rgb(220, 220, 220) 0%, rgb(235, 235, 235) 62%,rgb(250, 250, 250) 100%)", "linear-gradient(0deg, #295b9b 0%, #427cc9 62%,#619deb 100%)", "#28B463"];

allFilms = [{title:"X-Men Origins: Wolverine", img_src:"https://images.saymedia-content.com/.image/t_share/MTc0NTA2NjYzMDgyOTkzNjA5/should-i-watch-x-men-origins-wolverine.jpg", description:"2009"},
                {title:"Daredevil", img_src:"https://flxt.tmsimg.com/assets/p31328_p_v10_aa.jpg", description:"2003"},
                {title:"Catwoman", img_src:"https://images.moviesanywhere.com/daeca644a378d8342338668d72977456/9c8149e9-bd9b-45bd-a689-2a533d738069.jpg", description:"2004"}]
slideCont = document.getElementById("slideshow-container");

userAccounts = [{user:null,pass:null}];

commentArea = document.getElementById("comments");
allComments = [{userName:"Ian",userComment:"Recommended, good one"},
                  {userName:"Graham",userComment:"I don't like the colour"},
                  {userName:"Eamon",userComment:"Love it"}];

jsonContainer = document.getElementById("json-data");

/* Open */
function toggleNav() {
  if (document.getElementById("dropDown-Box").classList.contains(".active")) {
    document.getElementById("dropDown-Box").style.height = "0%";
    document.getElementById("dropDown-Box").style.visibility = "hidden";
    document.getElementById("dropDown-Box").classList.remove(".active");
    } else {  
    document.getElementById("dropDown-Box").style.height = "100%";
    document.getElementById("dropDown-Box").style.visibility = "visible";
    document.getElementById("dropDown-Box").className = ".active";
    }
}

/*Demonstration*/
function showDemo(n) {
	//Set all buttons to white color
	for (let i=0; i < allButtons.length; i++) {
		allButtons[i].style.background = "linear-gradient(0deg, rgb(220, 220, 220) 0%, rgb(235, 235, 235) 62%,rgb(250, 250, 250) 100%)";
    allButtons[i].style.color = "black";
		allDemoAreas[i].style.display = "none";
	}
	
	//Set the background color of the demo-button-1 to orange
	allButtons[n].style.background = "linear-gradient(0deg, rgb(172, 23, 23) 0%, rgb(209, 44, 44) 62%,rgb(247, 65, 65) 100%)";
	allButtons[n].style.color = "white";
  allDemoAreas[n].style.display = "flex";
}

/*--- Slideshow ---*/
function addAllFilms() {
  for (var i=0; i < allFilms.length; i++) {
    let filmTitle = allFilms[i].title;
    let filmImg = allFilms[i].img_src;
    let filmDesc = allFilms[i].description;
    let newFilm = document.createElement("div");
    newFilm.classList.add("mySlides");
    newFilm.classList.add("fade");
    let newFilmTitle = document.createElement("h2");
    newFilmTitle.classList.add("item-title");
    newFilmTitle.innerHTML = filmTitle
    let newFilmImg = document.createElement("img");
    newFilmImg.classList.add("item-img");
    newFilmImg.src = filmImg;
    let newFilmDesc = document.createElement("p");
    newFilmDesc.classList.add("item-description");
    newFilmDesc.innerHTML = filmDesc;
    newFilm.append(newFilmTitle, newFilmImg, newFilmDesc);
    slideCont.appendChild(newFilm);
  }
}

slideIndex = 1;
autoActive = false;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}

// Toggle Auto Slideshow
function autoSlide() {
  if (autoActive !== true) {
    autoActive = true;
    slideTimer = setInterval(function(){plusSlides(1);}, 4250); // Change image every 4.25 seconds
    document.getElementById("autoButton").className += " active";
  }
  else {
    autoActive = false;
    clearInterval(slideTimer);
    document.getElementById("autoButton").className = document.getElementById("autoButton").className.replace(" active", "");
  }
}

// Change Background
function changeColour() {
let selectedBGColour = document.getElementById("backgroundColour").value;
document.getElementById("customization").style.background = selectedBGColour;
document.getElementById("customization").style.backgroundImage = selectedBGColour;
document.getElementById("customization").style.backgroundSize = "cover";
}

/*-- Change Text Size --*/
function changeText() {
  let selectedTextSize = document.getElementById("textSize").value;
  document.getElementById("customization").style.fontSize = selectedTextSize;
}

//Authentication
function signUp() {
  let newUsername = document.querySelector(".signUp .userName");
  let newPassword = document.querySelector(".signUp .password");
  if (newUsername.value == "") {
    alert("The 'username' field cannot be empty");
  } else if (newPassword.value == "") {
    alert("The 'password' field cannot be empty");
  } else {//Verifying the user name and password
    let UP = 0;
    for (var i=0; i < userAccounts.length; i++) {
      if (newUsername.value == userAccounts[i].user) {			
        UP = 1;
        break;//quit
      } 
    }
    if (UP > 0) {
      for (var i=0; i < userAccounts.length; i++) {
        if (newPassword.value == userAccounts[i].pass) {		
          UP = 2;
          alert("That username / password combination already exists");
          break;//quit
        }
      } 
    } 
    if (UP != 2) {
      userAccounts.push({user:newUsername.value,pass:newPassword.value});
      newUsername.value = "";
      newPassword.value = "";
      alert("Your account has been created");
    }
  }
}

function logIn() {
  let username = document.querySelector(".logIn .userName");
  let password = document.querySelector(".logIn .password");
  if (username.value == "") {
    alert("Please enter your username");
  } else if (password.value == "") {
    alert("Please enter your password");
  } else {//Verifying the user name and password
    let UP = 0;
    for (var i=0; i < userAccounts.length; i++) {
      if (username.value == userAccounts[i].user) {			
        UP = 1;
        break;//quit
      } 
    }
    if (UP > 0) {
      for (var i=0; i < userAccounts.length; i++) {
        if (password.value == userAccounts[i].pass) {		
          UP = 2;
          username.value = "";
          password.value = "";
          alert("You are now logged in");
          break;//quit
        }
      } 
    } 
    if (UP != 2) {
      alert("That username / password combination does not exist"); 
    }
  }
}

//Comments Area
function addAllComments() {
  for (var i=0; i < allComments.length; i++) {
    let commentName = allComments[i].userName;
    let commentText = allComments[i].userComment;
    let newComment = document.createElement("article");
    newComment.classList.add("comment");
    let newCommentName = document.createElement("P");
    newCommentName.classList.add("commentName");
    newCommentName.innerHTML = (commentName + ":");
    let newCommentText = document.createElement("P");
    newCommentText.classList.add("commentText");
    newCommentText.innerHTML = commentText;
    newComment.append(newCommentName,newCommentText);
    commentArea.appendChild(newComment);
  }
}

//Add Comment
function addComment(e) {
  let nameInput = document.querySelector(".addCommentForm .userName").value;
  let commentInput = document.querySelector(".addCommentForm .commentBox").value;
  if (nameInput == "") {
    alert("Please enter your name");
  } else if (commentInput == "") {
    alert("Please enter a comment");
  } else {
    allComments.push({userName:nameInput,userComment:commentInput});
    let newComment = document.createElement("article");
    newComment.classList.add("comment");
    let newCommentName = document.createElement("P");
    newCommentName.classList.add("commentName");
    newCommentName.innerHTML = (nameInput + ":");
    let newCommentText = document.createElement("P");
    newCommentText.classList.add("commentText");
    newCommentText.innerHTML = commentInput;
    newComment.append(newCommentName,newCommentText);
    commentArea.appendChild(newComment);
    document.querySelector(".addCommentForm .userName").value = "";
    document.querySelector(".addCommentForm .commentBox").value = "";
    alert("Your comment has been submitted");
  }
}

//LoadXML
function loadXML() {
  //Create a request and send it to server
  //use a CORS API websie as a proxy to ask permission to get files from 
  let proxy = "https://cors-anywhere.herokuapp.com/";
  //URL where the XML file is stored on server
  let url = "http://www.danieldangs.com/itwd6-408/lab5/xml/contact-eit.xml";

  //Use XMLHttpRequest object to send request
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", proxy + url, true);//true: asynchronous communication, false: synchronous
  xhttp.send();//Send this request from browser to the URL server

  //Wait for the response from server and then process it
  xhttp.onreadystatechange = function() {
      //Check the response first line to see the response status
      if (this.readyState == 4 && this.status == 200) {
          //Everything is going well and the XML file is sent back
          let receivedXMLFile = this.responseText;
          //Display this XML file on my webpage at "contact" p
          document.getElementById("contact").innerHTML = receivedXMLFile;
          document.getElementById("contact").style.backgroundColor = "yellow";
          document.getElementById("contact").style.margin = "10px";
          document.getElementById("contact").style.padding = "5px";
      }
  };
}

function loadJSONContact() {
  //1: Use CORS API website as proxy to retrieve XML file
  let proxy = "https://cors-anywhere.herokuapp.com/";
  //Declare the URL indicates the location of the XML file
  let url = "http://danieldangs.com/itwd6-408/json/contact-eit.json";
  //2: Create XMLHttpRequest object
  let ourRequest = new XMLHttpRequest();
  //Set ourRequest to URL to get data (not send data)
  ourRequest.open("GET", proxy + url, true);
  //Send XMLHttpRequest object or ourRequest to URL
  ourRequest.send();
  //Build an html string which will be rendered on browser as an html-formated element
  var htmlString = "";

  //3: Receive response (reply) from URL and Process that data
  ourRequest.onload = function() {
    //Check if the response status is OK (no error), render data on web page
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
    //
    let receivedData = JSON.parse(ourRequest.responseText);

      //Retrieve question and relevant answer
      for (var i = 0; i < receivedData.length; i++) {
      //Add a <div> open tag
      htmlString += `<div style="background-color: yellow; margin: 10px; padding: 5px;">`;
      //Get name
      htmlString += "<h4>" + receivedData[i].name + "</h4>";
      //Get email
      htmlString += "<p4>" + receivedData[i].email + "</p4><br>";
      //Get address
      htmlString += "<p4>" + receivedData[i].address + "</p4>";
      //Add the closing tag of div
      htmlString += "</div>";
      }
    //Render the whole htmlString to web page
    jsonContainer.innerHTML = htmlString;
  
    //Add style to the html elements: add the <div> tag
    } else {
    //Exception handling
    console.log("Connected to the server successfully but it returned an error!");
    }
  }
}

function loadJSONFruit() {
  //1: Use CORS API website as proxy to retrieve XML file
  let proxy = "https://cors-anywhere.herokuapp.com/";
  //Declare the URL indicates the location of the XML file
  let url = "http://danieldangs.com/itwd6-408/json/fruit.json";
  //2: Create XMLHttpRequest object
  let ourRequest = new XMLHttpRequest();
  //Set ourRequest to URL to get data (not send data)
  ourRequest.open("GET", proxy + url, true);
  //Send XMLHttpRequest object or ourRequest to URL
  ourRequest.send();
  //Build an html string which will be rendered on browser as an html-formated element
  var htmlString = "";

  //3: Receive response (reply) from URL and Process that data
  ourRequest.onload = function() {
    //Check if the response status is OK (no error), render data on web page
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
    //
    let receivedData = JSON.parse(ourRequest.responseText);

    //Retrieve question and relevant answer
    for (var i = 0; i < receivedData.length; i++) {
      //Add a <div> open tag
      htmlString += `<div style="background-color: yellow; margin: 10px; padding: 5px;">`;
      //Get name
      htmlString += "<h4>" + receivedData[i].fruit + "</h4>";
      //Get image
      htmlString += "<img src='" + receivedData[i].img_url + "' width=400px'>";
      //Add the closing tag of div
      htmlString += "</div>";
    }
    //Render the whole htmlString to web page
    jsonContainer.innerHTML = htmlString;
  
    //Add style to the html elements: add the <div> tag
    } else {
    //Exception handling
    console.log("Connected to the server successfully but it returned an error!");
    }
  }
}

function loadJSONFAQ() {
  //1: Use CORS API website as proxy to retrieve XML file
  let proxy = "https://cors-anywhere.herokuapp.com/";
  //Declare the URL indicates the location of the XML file
  let url = "http://danieldangs.com/itwd6-408/json/faqs.json";
  //2: Create XMLHttpRequest object
  let ourRequest = new XMLHttpRequest();
  //Set ourRequest to URL to get data (not send data)
  ourRequest.open("GET", proxy + url, true);
  //Send XMLHttpRequest object or ourRequest to URL
  ourRequest.send();
  //Build an html string which will be rendered on browser as an html-formated element
  var htmlString = "";

  //3: Receive response (reply) from URL and Process that data
  ourRequest.onload = function() {
    //Check if the response status is OK (no error), render data on web page
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
    //
    let receivedData = JSON.parse(ourRequest.responseText);

    //Retrieve question and relevant answer
    for (var i = 0; i < receivedData.length; i++) {
      //Add a <div> open tag
      htmlString += `<div style="background-color: yellow; margin: 10px; padding: 5px;">`;
      //Get question
      htmlString += "<h4>" + receivedData[i].question + "</h4>";
      //Get answer
      htmlString += "<p4>" + receivedData[i].answer + "</p4>";
      //Add the closing tag of div
      htmlString += "</div>";
    }
    //Render the whole htmlString to web page
    jsonContainer.innerHTML = htmlString;
  
    //Add style to the html elements: add the <div> tag
    } else {
    //Exception handling
    console.log("Connected to the server successfully but it returned an error!");
    }
  }
}

function init() { 
  addAllFilms();
  currentSlide(1);
  addAllComments();
  showDemo(0);
}
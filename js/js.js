/*--- Variables ---*/
allButtons = document.getElementsByClassName("demo-button");//Return an array storing all buttons
allDemoBoxes = document.getElementsByClassName("demo-box");//Return an array storing all demo boxes
//When loading the website, read the "BgColorPreference" and set background color
getColorPreference = localStorage.getItem("BgColorPreference");
if (getColorPreference != null) {
    document.body.style.background = getColorPreference
};
proxy = "https://cors-anywhere.herokuapp.com/";
url = "http://danieldangs.com/itwd6-408/json/faqs.json";
faqs = [];

//Create a 'Booking' class to represent our booking form
class Booking {
    //Constructor
    constructor() {
        //Customer
        this.customerType = "consumer";//default value = customer
        this.title = "";
        this.firstName = "";
        this.lastName = "";
        this.street = "";
        this.suburb = "";
        this.city = "";
        this.postCode = "";
        this.phone = "";
        this.email = "";
        //Repair Job
        this.jobNo = "";
        this.invDate = "";
        this.payDueDate = "";
        //Repair Details
        this.purcDate = "";
        this.repDate = "";
        this.warranty = false;//False: not under warranty, true: under warranty
        this.imeiNo = "";
        this.deviceMake = "";
        this.modelNo = "";
        this.faultCat = "";
        this.faultDesc = "";
        //Courtesy Loan Device Details
        this.inputTable = "";
        this.courtesy_phone = "";//default: "" = no phone loan
        this.phone_bond = 0;
        this.courtesy_charger = "";//default "" = no charger loan
        this.charger_bond = 0;
        //Totals
        this.bondAmount = 0;
        this.serviceFee = 85;
        this.totalAmount = 0;
        this.gstAmount = 0;
        this.totalGST = 0;
    }

    //Methods
    updateBond() {
        if (this.customerType == "business") {
            this.bondAmount = 0;
        } else {
            this.bondAmount = (this.phone_bond + this.charger_bond);
        };
        $("#bondAmount").val("$" + this.bondAmount);
    }

    updateServiceFee() {
        if (this.warranty == false) {
            this.service_fee = 85;
        } else {
            this.service_fee = 0;
        };
        $("#serviceFee").val("$" + this.service_fee);
    }

    updateTotals() {
        this.updateServiceFee();
        this.totalAmount = (this.bondAmount + this.service_fee);
        $("#totalAmount").val("$" + this.totalAmount);
        this.gstAmount = (this.totalAmount * .15);
        $("#gstAmount").val("$" + this.gstAmount);
        this.totalGST = (this.totalAmount + this.gstAmount);
        $("#totalGST").val("$" + this.totalGST);
    }

    updateProperties() {
        //Name
        this.title = document.getElementById("inputTitle").value;
        this.firstName = document.getElementById("inputFirstName").value;
        this.lastName = document.getElementById("inputLastName").value;
        this.street = document.getElementById("inputStreet").value;
        this.suburb = document.getElementById("inputSuburb").value;
        this.city = document.getElementById("inputCity").value;
        this.postCode = document.getElementById("inputPostCode").value;
        this.phoneNo = document.getElementById("inputPhoneNo").value;
        this.email = document.getElementById("inputEmail").value;
        //Repair Job
        localStorage.setItem("jobNo", +localStorage.getItem("jobNo") + 1)
        this.jobNo = localStorage.getItem("jobNo")
        let dateTime = new Date();
        this.invDate = (dateTime.getFullYear()) + "/" + (dateTime.getMonth()) + "/" + (dateTime.getDate()) + " " + (dateTime.getHours()) + ":" + (dateTime.getMinutes()) + ":" + (dateTime.getSeconds());
        this.payDueDate = ((dateTime.getFullYear()) + "/" + (dateTime.getMonth()) + "/" + (dateTime.getDate() + 5));
        //Repair Details
        this.purcDate = document.getElementById("inputPurcDate").value;
        this.repDate = document.getElementById("inputRepDate").value;
        this.imeiNo = document.getElementById("inputIMEI").value;
        this.deviceMake = document.getElementById("inputMake").value;
        this.modelNo = document.getElementById("inputModelNo").value;
        this.faultCat = document.getElementById("inputFault").value;
        this.faultDesc = document.getElementById("inputDesc").value;
        //Courtesy Loan Device Details
        this.itemTable = document.getElementById("itemTable").outerHTML;
    }
}

function populateForm() {
    //Get data sent from index.html stored in local storage
    let myBookingObj = JSON.parse(localStorage.getItem("myBookingInput"));
    //Customer
    document.getElementById("name").innerHTML = (myBookingObj.title + ". " + myBookingObj.firstName + " " + myBookingObj.lastName);
    document.getElementById("addressLine1").innerHTML = myBookingObj.street;
    document.getElementById("addressLine2").innerHTML = (myBookingObj.suburb + ", " + myBookingObj.city + " " + myBookingObj.postCode);
    document.getElementById("phoneNo").innerHTML = myBookingObj.phoneNo;
    document.getElementById("email").innerHTML = myBookingObj.email;
    //Repair Job
    document.getElementById("jobNo").innerHTML = myBookingObj.jobNo;
    document.getElementById("invDate").innerHTML = myBookingObj.invDate;
    document.getElementById("payDueDate").innerHTML = myBookingObj.payDueDate;
    //Repair Details
    document.getElementById("purcDate").innerHTML = myBookingObj.purcDate;
    document.getElementById("repDateTime").innerHTML = myBookingObj.repDate;
    if (myBookingObj.warranty == true) {
        document.getElementById("warranty").innerHTML = "Yes &#10004;";
    } else {
        document.getElementById("warranty").innerHTML = "No &#10006;";
    };
    document.getElementById("imeiNo").innerHTML = myBookingObj.imeiNo;
    document.getElementById("deviceMake").innerHTML = myBookingObj.deviceMake;
    document.getElementById("modelNo").innerHTML = myBookingObj.modelNo;
    document.getElementById("faultCat").innerHTML = myBookingObj.faultCat;
    document.getElementById("faultDesc").innerHTML = myBookingObj.faultDesc;
    //Courtesy Loan Device Details
    document.getElementById("itemTable").outerHTML = myBookingObj.itemTable;
    /*
    $("#itemTable").each("td:eq(2),th:eq(2)"), function() {
        $(this).remove();
    };
    */
    //Totals
    document.getElementById("bond").innerHTML = ("$" + myBookingObj.bondAmount);
    document.getElementById("servFee").innerHTML = ("$" + myBookingObj.serviceFee);
    document.getElementById("total").innerHTML = ("$" + myBookingObj.totalAmount);
    document.getElementById("gst").innerHTML = ("$" + myBookingObj.gstAmount);
    document.getElementById("totalGST").innerHTML = ("$" + myBookingObj.totalGST);
    document.getElementById("amountDue").innerHTML = ("$" + myBookingObj.totalGST);
}

//Update the customer type to 'consumer'
$("#consumerBox").change(function() {
    myBooking.customerType = "consumer";
    myBooking.updateBond();
});

//Update the customer type to 'business'
$("#businessBox").change(function() {
    myBooking.customerType = "business";
    myBooking.updateBond();
});

//Validate the purchase date - must be before today
$("#inputPurcDate").change(function() {
    let today = new Date();
    let purcDate = new Date($(this).val());
    //make sure that purcDate before today
    if (purcDate.getTime() > today.getTime()) {
        //alert("ERROR: Purchase date must be before today");
        $("p.error-message").remove();
        $("#inputPurcDate").after('<p class="error-message">Error: Purchase date must be before today</p>');
        $(this).val("");
    } else {
        //alert("You have chosen... wisely");
        $("p.error-message").remove();
    }
});

//Update the service fee according to the 'warranty' checkbox
$("#warranty").change(function() {
if(this.checked) {
    myBooking.warranty = true;
    myBooking.service_fee = 0;
} else { 
    myBooking.warranty = false;
    myBooking.service_fee = 85;
};
myBooking.updateServiceFee();
    myBooking.updateTotals();
}); 

//Add item to the table
$("#addItemBtn").click(function() {
let itemType = $("#itemType").val();//Get selected item
if (itemType == "charger") {
    if (myBooking.courtesy_charger == "") {
        //Add charger row to the table
        $("#itemTable").append('<tr id="charger-row">' + 
                                '<td style="border: 1px solid black">' + itemType + "</td>" +
                                '<td style="border: 1px solid black">' + "$30" + "</td>" +
                                '<td style="border: 1px solid black">' + '<button id="chargerBtn">REMOVE</button>' + "</td>" +
                                "</tr>"
        );
        //Update the properties of myBooking object
        myBooking.courtesy_charger = itemType;
        myBooking.charger_bond = 30;
        myBooking.updateBond();
        myBooking.updateTotals();
    } else { 
        alert("Error: Charger already added");
    }
} else {
    //alert("Phone has been added");
    if (myBooking.courtesy_phone == "") {
        let bond = (itemType == "iPhone") ? 275 : 100;
        //Add phone row to the table
        $("#itemTable").append('<tr id="phone-row">' + 
        '<td style="border: 1px solid black">' + itemType + "</td>" +
        '<td style="border: 1px solid black">' + "$" + bond + "</td>" +
        '<td style="border: 1px solid black">' + '<button id="phoneBtn">REMOVE</button>' + "</td>" +
        "</tr>"
    );
    //Update the properties of myBooking object
    myBooking.courtesy_phone = itemType;
    myBooking.phone_bond = bond;
    myBooking.updateBond();
    myBooking.updateTotals();
    } else {
        alert("Error: Phone already added");
    }
}     
});

//Remove item from the table
$("#itemTable").on("click", "td button", function() {
btn = this.closest("button").id;
if (btn == "chargerBtn") {
    myBooking.courtesy_charger = "";
    myBooking.charger_bond = 0; 
} else {
    myBooking.courtesy_phone = "";
    myBooking.phone_bond = 0; 
}
myBooking.updateBond();
myBooking.updateTotals();
$(this).closest("tr").remove();
})

//------------------------------------------------------------------
//NO ERROR --> Send data to repair-booking web page	
$("#customerForm").submit(function(e) {
    //Prevent the page from refreshing
    e.preventDefault()
    //Update the object property
    myBooking.updateProperties();
    //Send data from this page to "repair-booking" page
    let myBookingData = JSON.stringify(myBooking);//Convert JSON/JS object to string
    //Store this string into a Local Storage
    localStorage.setItem("myBookingInput", myBookingData);
    //Open the repair-booking page
    window.open("repair-booking.html");
})

/*Demonstration*/
function showDemo(n) {
	//Set all buttons to white color
	for (let i=0; i < allButtons.length; i++) {
		allButtons[i].style.background = "linear-gradient(0deg, rgb(220, 220, 220) 0%, rgb(235, 235, 235) 62%, rgb(250, 250, 250) 100%)";
        allButtons[i].style.color = "black";
		allDemoBoxes[i].style.display = "none";
	}
	
	//Set the background color of the demo-button-1 to orange
	allButtons[n].style.background = "linear-gradient(0deg, rgb(25, 25, 25) 0%, rgb(44, 44, 44) 62%,rgb(61, 61, 61) 100%)";
	allButtons[n].style.color = "white";
    allDemoBoxes[n].style.display = "block";
}

//Open the Advanced page and show FAQs
$("#faqBtn").click(function() {
    var newWindow = window.open("advanced.html");
    window.open("advanced.html");
    $(newWindow).load(function() {
        alert("yeah");
        showDemo(2);
    })
})

/*-- ---*/
$(document).ready(function() {
    //Use jQuery to add class to an existing element
    $("legend").addClass("legend-style");

    //Methods: focus() or blur()
    $("input").focus(function() {
        $(this).css("background-color","pink");
    });

    $("input").blur(function() {
        $(this).css("background-color","white");
    });

    //Btn1 event handling
    $("#btn1").click(function() {
        $("#content").hide();
    });

    //Btn2 event handling
    $("#btn2").click(function() {
        $("#content").show();
    });

    //Btn3 event handling
    $("#btn3").click(function() {
        $("#content").toggle();
    });

    //Btn4 event handling
    $("#btn4").click(function() {
        $("#content").fadeIn(1000);
    });

    //Btn5 event handling
    $("#btn5").click(function() {
        $("#content").fadeOut(1000);
    });

    //Btn6 event handling
    $("#btn6").click(function() {
        $("#content").slideUp(3000);
    });

    //Btn7 event handling
    $("#btn7").click(function() {
        $("#content").slideDown(3000);
    });

    //Chaining
    //Btn8 event handling
    $("#btn8").click(function() {
        //Slide up, slide down, fade out, fade in
        $("#content").slideUp(3000).slideDown(2000).fadeOut(2000).fadeIn(3000);
    });

    //handle event "click"
    $("#btn9").click(function() {
        //Make the ball (box) move left
        $("#box").animate({
            right:"-=200",
            //height:'300px',
            //width:'300px',
            //opacity:'0.5'
        });
    });

    //handle event "click"
    $("#btn10").click(function() {
        //Make the ball (box) move right
        $("#box").animate({
            right:"+=200",
            //height:'100px',
            //width:'100px',
            //opacity:'1'
        });
    });

    //handle event "click"
    $("#btn11").click(function() {
        //Make the ball (box) move left
        $("#box").animate({
            left:"200"}).animate({top:200}).animate({left:0,top:200}).animate({left:0,top:0});
        });
});

/*-- ---*/
function changeColor() {
    let selectedColor = document.getElementById("colorOption").value;
    document.body.style.background = selectedColor;
    //Store this selectedColor permanently using LocalStorage
    localStorage.setItem("BgColorPreference", selectedColor);
}

//Use AJAX method to load JSON file
$.getJSON(
    proxy + url,
    function(data){
        //Loop through all questions and display ony webpage
        $.each(data, function(i, question) {
            $("#questions").append('<p class="question-style">' + question.question + '<br>' + question.answer + '</p>');
        });
    //Store these questions in the variable
    faqs = data;    
});

//Add event to the button "search"
$("input#searchBtn").click(function() {
    $("#questions").html("");

    //Use filter() method to get questions containing keywords
    let searchKeyWord = $("input#searchInput").val();
    let results = faqs.filter(function(faqs){
        return faqs.question.indexOf(searchKeyWord) > -1;
    });

    //Display the results on webpage
    if (results.length == 0) {
        //No results
        $("#questions").html("No results");
    } else {
        //Loop through all filted questions
        for(var i=0; i < results.length; i++) {
            $("#questions").append('<p>' + results[i].question + '<br>' + results[i].answer + '</p>');
        }
    }
});

//Drag and Drop
$(".box").draggable({
    scope: 'demoBox',
    revertDuration: 100,
    start: function(event, ui) {
      //Reset
      $(".box").draggable("option", "revert", true);
      $(".result").html("-");
    }
});
  
$(".drag-area").droppable({
    scope: 'demoBox',
    drop: function(event, ui) {
    let area = $(this).find(".drop-area").html();
    let box = $(ui.draggable).html();     
    $(".box").draggable("option", "revert", false);
    
    //Display action in text
    $('.result').html("[Action] <b>" + box + "</b>" +
                        " dropped on " + 
                        "<b>" + area + "</b>");
    
    //Re-align item
    $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
    }
})

function init() { 
    //Create an object of this Booking class
    myBooking = new Booking();
    localStorage.setItem("jobNo", 0000)
}
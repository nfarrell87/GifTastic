//Global array of "Memes"
var memes = ["Hypnotoad", "Office Monkey", "Salt Bae", "Deal With It", "Kermit",];
//start the page with default buttons showing
renderButtons();
//waits for the "meme" button to be clicked, after it is generated
$(document).on("click", ".meme", showMeme);
$(document).on("click", ".memeImg", memeClick);
// Function for loading in our header of buttons
function renderButtons() {
    $("#header").empty();
    $("#searchTerm").val("")
    // Looping through the array of memes
    for (var i = 0; i < memes.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        var a = $("<button>");
        // Adding a class
        a.addClass("meme");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", memes[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(memes[i] + " Memes");
        // Adding the button to the HTML
        $("#header").append(a);

    }
};

// Function that adds new buttons to header when "creat my button!" is clicked
$("#addBtn").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var meme = $("#searchTerm").val().trim();
    // The movie from the textbox is then added to our array
    memes.push(meme);
    // calling renderButtons which handles the processing of our movie array
    renderButtons();
    $("#searchTerm").empty();
});

//Function that runs when user clicks a "meme" button from header
function showMeme() {
    $("#contentDiv").empty();
    var userInput = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=vsgHQJizAi8RDGZOXjtzOMdN0qPsp2oN&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                // Creating a div to hold the main body
                var mainDiv = $(".mainDiv")

                // Storing the rating data
                var rating = response.data[i].rating;

                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating).css("display", "inline");

                // Displaying the rating
                mainDiv.append(pOne);

                // Retrieving the URL for the image
                var stillURL = response.data[i].images.original_still.url;
                var animateURL = response.data[i].images.original.url;


                // Creating an element to hold the image
                var image = $("<img>").attr("src", stillURL).css("display", "inline-block").addClass("memeImg");
                image.attr("data-state", "still");
                image.attr("data-still", stillURL);
                image.attr("data-animate", animateURL);
                // Appending the image
                mainDiv.append(image);

                // Putting the entire movie above the previous movies
                $("#contentDiv").append(mainDiv);
            };

        })
};
// This functin turns the still GIF into an animated GIF when clicked
function memeClick() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };


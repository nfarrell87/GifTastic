var memes = ["Hypnotoad", "Good Guy Greg", "10/10 Guy", "Crazy Ex-Girlfriend"];

// Function for loading in our header of buttons
function renderButtons() {
    $("#header").empty();

    // Looping through the array of memes
    for (var i = 0; i < memes.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("meme");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", memes[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(memes[i]);
        // Adding the button to the HTML
        $("#header").append(a);
    }
  

}
function showMeme() {
    console.log("hi");
    var userInput = $(this).attr("data-name");
    console.log(userInput);
    var queryURL = "https://api.giphy.com/v1/stickers/search?q=" + userInput + "&api_key=vsgHQJizAi8RDGZOXjtzOMdN0qPsp2oN&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response;
            console.log(results);
            // Creating a div to hold the main body
            var mainDiv = $(".mainDiv");

            // Storing the rating data
            var rating = response.data[0].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            mainDiv.append(pOne);

            // Retrieving the URL for the image
            var imgURL = response.data[0].images.original_still.url;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appending the image
            mainDiv.append(image);

            // Putting the entire movie above the previous movies
            $("#contentDiv").append(mainDiv);

        });
}
// This function handles events where one button is clicked
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
$(document).on("click", ".meme", showMeme);

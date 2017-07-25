// JavaScript function that wraps everything
$(document).ready(function() {

// Global variables
// -----------------------------------------------

topics = ["fear", "anger", "sadness", "joy", "disgust", 
		  "surprise", "trust", "anticipation" ];


// Functions
// --------------------------------------------------

// Function for displaying buttons
function renderButtons() {
	// Delete the content inside the buttons-view div
	// prior to adding new buttons
	$('#buttons-view').empty();
	// Loop through the array of emotions, then generate
	// buttons for each emotion in the array
	for(i=0; i < topics.length; i++) {
		// create variable with jQuery button element
		var buttony = $('<button>');
		// add a class to the new variable (button element)
		buttony.addClass("emotion");
		// add an attribute to the new variable (button element)
		// from the array
		buttony.attr('data-name',topics[i]);
		// set the text of the new variable to value in array
		buttony.text(topics[i]);
		// append the buttons to the page
		$('#buttons-view').append(buttony);
	};
}

// Function for AJAX GET request
function getGifs(link) {
	$.ajax({
		url: link,
		method: "GET"
	})
		// After the data comes back from the API
		.done(function(res){
			// Storing an array of results in the results variable
			var results = res.data;
			// Looping over every result item
			for(var i = 0; i <results.length; i++) {
				// Creating a div with the class "item"
				var gifDiv = $("<div class='item'>");
				// Storing the result item's rating
				var rating = results[i].rating;
				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + rating);
				// Creating an image tag with the class "gif"
				var emotionImage = $("<img class='gif'>");

				// Giving the image tag an src attribute of a property
				// pulled off the result item
				// Use the still URL
				emotionImage.attr("src", results[i].images.fixed_height_still.url);

				// Giving the image tag a data-still attribute with 
				// still URL
				emotionImage.attr("data-still", results[i].images.fixed_height_still.url);

				// Giving the image tag a data-animate attribute with 
				// animate URL
				emotionImage.attr("data-animate", results[i].images.fixed_height.url);

				// Giving the image tag a data-state attribute with current state
				// Initial state is going to be still
				emotionImage.attr("data-state", "still");


				// Appending the paragraph and emotionImage we created
				// to the "gifDiv" div we created
				gifDiv.append(emotionImage);
				gifDiv.append(p);

				// Prepending the gifDiv to the "#gifs-appear-here" 
				// div in the HTML
				$("#gifs-appear-here").prepend(gifDiv);
			}
		})
}

// Main Code section (call functions)
// ---------------------------------------------------

// Calling the renderButtons function to display the 
// initial list of movies
renderButtons();

// Event listener for all button elements
$(document.body).on("click", "button" , function() {
	// Clear out existing gifs
	$("#gifs-appear-here").empty();
	// In this case, the "this" keyword refers to the button
	// that was clicked
	var emotion = $(this).attr("data-name");

	// Constructing a URL to search Giphy for the name of
	// the emotion 
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
					emotion + 
					"&api_key=de488d7c6d8642f591ec58687c3835bc&limit=10";

	// Performing AJAX GET request
	getGifs(queryURL);
});

// Event listener for gif class being clicked
$(document.body).on("click",".gif", function() {
	// The attr jQuery method allows us to get or set the
	// value of any attribute on our HTML element
	var state = $(this).attr("data-state");
	// If the clicked image's state is still, update its
	// src attribute to what its data animate value is.
	// Then, set the image's data-state to animate
	// Else set src to the data-still value
	if(state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

// Event listener for adding another button
$("#add-emotion").on("click", function(event) {
	event.preventDefault();	
	// This line grabs the input from the textbox
	var emotion = $("#emotion-input").val().trim();

	// Only run this code if there is something in the input box
	if(emotion !== "") {
		// The emotion from the textbox is then added to our array
		topics.push(emotion);

		// Calling renderButtons which handles the processing of 
		// our topics array
		renderButtons();
	}
})

});









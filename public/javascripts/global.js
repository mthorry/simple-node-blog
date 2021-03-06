var userListData = []

/* 
 * 	DOM
 */
$(document).ready(function() {
    // Populate the user table on initial page load
    populateList();
});
$('#btnAddBlog').on('click', addBlog);
$('ul').on('click', '#btnRemoveBlog', removeBlog);
$('ul').on('click', '#btnAddComment', addComment);


/* 
 * FUNCTIONS
 */
function populateList() {
    // Empty content string
    var content = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/posts', function( data ) {
    	// userListData = data;
        // For each item in our JSON, add an item to the ul.
        $.each(data, function(){
    	console.log(this.comments)
	        	content += '<li id="' + this._id + '">'
	        	content += '<h2>' + this.title + '</h2>'
	        	content += '<h3>Author: ' + this.author + '</h3>'
	        	content += '<p>' + this.content + '</p>'
	        	content += "<button id='btnRemoveBlog' data-id='" + this._id + "'>Delete Blog Post</button>"
	        	content += '</br>'
	        	content += '</br>'
	        	if (this.comments) {
		        	content += '<h4>Comments</h4>'
	        		$.each(this.comments, function(){
		        		content += "<p id='comment'><em>" + this.content + '</em></p>'
		        		content += "<p id='comment'>" + this.author + '</p>'
	        			content += '</br>'
		        	})
	        	}
	        	content += "<form><input type='text' placeholder='name' id='commentAuthor'><input type='textarea' placeholder='comment' id='commentContent'><input type='submit' value='Add Comment' id='btnAddComment' data-id='" + this._id + "'></form>"
	        	content += '</li>'
	        	content += '</br>'
        });

    // Append to DOM.
	$('#blogList').html(content);
    });
};

function addBlog(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addBlog input').each(function(index, val) {
        if($(this).val() === '') { errorCount++ }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        // If it is, compile all user info into one object
        var newBlog = {
            'title': $('#addBlog fieldset input#inputTitle').val(),
            'author': $('#addBlog fieldset input#inputAuthor').val(),
            'content': $('#addBlog fieldset input#inputContent').val()
        }
        // Use AJAX to post the object to our addBlog service
        $.ajax({
            type: 'POST',
            data: newBlog,
            url: '/posts/addpost',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addBlog fieldset input').val('');

                // Update the table
                populateList();

            } else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function removeBlog(event) {
	event.preventDefault()
	var id = this.dataset.id
    
    var confirmation = confirm('Are you sure you want to delete this post?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/posts/deletepost/' + id
        }).done(function( response ) {
            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateList();

        });
    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }
}

function addComment(event) {
	event.preventDefault()

	var errorCount = 0;
    $('#addBlog input').each(function(index, val) {
        if($(this).val() === '') { errorCount++ }
    });
    console.log($('#blogList #commentAuthor').val())
    console.log($('#blogList #commentContent').val())
    console.log(this.dataset.id)

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        // If it is, compile all user info into one object
        var newComment = {
            'author': $('#blogList #commentAuthor').val(),
            'content': $('#blogList #commentContent').val()
        }
        // Use AJAX to post the object to our addBlog service
        $.ajax({
            type: 'PUT',
            data: newComment,
            url: '/posts/addcomment/' + this.dataset.id,
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addBlog fieldset input').val('');

                // Update the table
                populateList();

            } else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
}

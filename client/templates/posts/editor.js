Template.editor.helpers({
	expandedPost: function(){
      var postId = Session.get("expandedPostId")
    	return Posts.findOne(postId);
    }
});

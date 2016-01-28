Template.postList.helpers({
    publishedPosts: function(){
      return Posts.find({isPublished: true}, {sort: {createdAt: -1}});
    },
    draftPosts: function(){
      return Posts.find({isPublished: false});
    },
});

Template.postList.events({
	"click #add-new": function(event){
		var emptyPost = Posts.findOne({title:'', body:''});
		if(emptyPost)
			Session.set('expandedPostId', emptyPost._id);
		else{
			Meteor.call('addPost', '', '', function(error, postId){
				console.log(postId);
				Session.set('expandedPostId', postId);
			});
		}
	},
});

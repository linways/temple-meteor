Meteor.publish("posts", function(){
	return Posts.find({
		owner: this.userId
	});
});

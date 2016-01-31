Meteor.publish("posts", function(){
	return Posts.find({
		owner: this.userId
	});
});


Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'services.github.username': 1}});
});

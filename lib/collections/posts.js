Posts = new Mongo.Collection("posts");

Meteor.methods({
	"addPost": function(title, body){
		if(! Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		check(title, String);
		check(body, String);
		Posts.insert({
			title: title,
			body: body,
			isPublished: false,
			createdAt: new Date(),
			modifiedAt: new Date(),
			owner: Meteor.userId()
		});
	},
	"updatePost": function(postId, title, body){
		if(! Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		Posts.update(postId, { $set: {
				title: title,
				body: body,
				modifiedAt: new Date(),
			}
		});
	},
});

Template.registerHelper('equals', function (a, b) {
	return a === b;
});

Template.postList.helpers({
    publishedPosts: function(){
      return Posts.find({isPublished: true});
    },
    draftPosts: function(){
      return Posts.find({isPublished: false});
    },
});

Template.postShort.helpers({
      createdAt: function(){
      return moment(this.createdAt).fromNow();
    },
});

Template.editor.helpers({
	'body': function(){
		doc.setValue(this.body);
	},
	expandedPost: function(){
    	return Posts.findOne('sBrhFQfs2cNsLxftf');
    }
});

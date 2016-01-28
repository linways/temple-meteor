Template.postList.helpers({
    publishedPosts: function(){
      return Posts.find({isPublished: true});
    },
    draftPosts: function(){
      return Posts.find({isPublished: false});
    },
});

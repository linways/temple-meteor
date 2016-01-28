Template.postShort.helpers({
      createdAt: function(){
      return moment(this.createdAt).fromNow();
    },
});

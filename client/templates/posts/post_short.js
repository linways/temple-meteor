Template.postShort.helpers({
      createdAt: function(){
      return moment(this.createdAt).fromNow();
    },
});

Template.postShort.events({
    "click .item": function(event){
        var windowWidth = $(window).width();
        if(windowWidth < 768){
            $("#wrapper").toggleClass("toggled");
        }
    },
});

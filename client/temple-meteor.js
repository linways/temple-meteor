Template.postList.events({
    "click #add-new" : function(event){

    },
});

Template.postShort.events({
	"click .postref": function(event){
		Session.set("expandedPostId", this._id);
    },
});

Template.editor.events({
	"click": function(event){

	},
});

/*Template.editor.onRendered(function(){
	doc = $('textarea[data-uk-markdownarea]').data('markdownarea').editor.getDoc();
});*/

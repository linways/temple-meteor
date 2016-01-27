Meteor.subscribe("posts");

Template.postList.events({
    "click #add-new" : function(event){
    	if($("#editor").hasClass("hidden")){
    		$("#editor").removeClass("hidden");
    	}
    	if(! doc.isClean())
    		var con = confirm("All unsaved changes will be lost. Do you want to continue?");
    	if(con){
    		$('#postId').val('');
	    	$('#title').html('');
	    	doc.setValue('');
    	}
    },
});

Template.postShort.events({
	"click .postref": function(event){

    },
});

Template.editor.events({
	"click #save": function(event){

	},
});

Template.editor.onRendered(function(){
	doc = $('textarea[data-uk-markdownarea]').data('markdownarea').editor.getDoc();
});

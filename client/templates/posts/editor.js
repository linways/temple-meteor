Template.editor.helpers({
	expandedPost: function(){
      var postId = Session.get("expandedPostId")
    	return Posts.findOne(postId);
    },
    getFEContext: function () {
    var self = this;
    return {
      // Set html content
      _value: self.body,
      // Preserving cursor markers
      _keepMarkers: true,
      // Override wrapper class
      _className: "froala-reactive-meteorized-override",

      // Set some FE options
      toolbarInline: false,
      initOnClick: false,
      tabSpaces: false,
      toolbarButtons:['fullscreen', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color',  '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink', 'insertTable', 'undo', 'redo', 'clearFormatting', 'html'],

      // FE save.before event handler function:
      "_onsave.before": function (e, editor) {
        // Get edited HTML from Froala-Editor
        var newHTML = editor.html.get(true /* keep_markers */);
        //var title = $('#title').html();
        var title = self.title;
        // Do something to update the edited value provided by the Froala-Editor plugin, if it has changed:
        if (!_.isEqual(newHTML, self.body)) {
          $('.fr-toolbar').addClass('body-dirty');
          Meteor.call('updatePost', self._id, title, newHTML,function(){
          		console.log("Changes saved");
          		$('.fr-toolbar').removeClass('body-dirty');
          });
        }
        return false; // Stop Froala Editor from POSTing to the Save URL
      },
    }
  },
});

Template.editor.events({
	"keyup #title": function(event){
		var title = $('#title').val();
		Meteor.call('updatePost', this._id, title, this.body,function(){
          		console.log("Title Saved");
          });
	},
});

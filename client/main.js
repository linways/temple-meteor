Meteor.subscribe("posts");
Meteor.subscribe("userData");



Tracker.autorun(function(){
	if(Meteor.userId()){
		console.log("Initializing Git");
		Meteor.call("initGit", function(res){
			if(Session.get("repoStatus") === "created")      // will not work since github package is async.
				alert("New repo created");
		});
	}
});

Accounts.ui.config({
    requestPermissions: {
        github: ['user:email', 'public_repo']
    }
});

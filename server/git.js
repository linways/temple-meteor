Meteor.methods({
	"initGit": function(){
		/* Creates username.github.io repo if it does not exists
			Docs: https://mikedeboer.github.io/node-github/
				  https://developer.github.com/v3/
		 */
		var Github = Meteor.npmRequire('github');

		var github = new Github({version: "3.0.0"});
		user = Meteor.users.findOne(Meteor.userId());
		//authenticate using oauth tokens
		github.authenticate({
		    type: "oauth",
		    token: user.services.github.accessToken
		});
		msg = {
				name: user.services.github.username+".github.io"
			};
		github.repos.create(msg, function(err, res){
			if(err){
				console.log("Repo already Exists");
				Session.set("repoStatus","exists");
			}
			if(res){
				console.log("Repo Created");
				Session.set("repoStatus","created");
			}
		})
	}
});

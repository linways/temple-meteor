Meteor.methods({
	"initGit": function(){
		/* Creates username.github.io repo if it does not exists
			Docs: https://mikedeboer.github.io/node-github/
				  https://developer.github.com/v3/
		 */

		gitStatus = GitStatus.findOne({userId: Meteor.userId()});

		if(!gitStatus){
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
				}
				if(res){
					console.log("Repo Created");
				}
			});
		}
	},
	"createAndPush": function(currentlyChangedId, changedIsPublished){

		//authenticate github

		var Github = Meteor.npmRequire('github');

		var github = new Github({version: "3.0.0"});
		var user = Meteor.user();
		//authenticate using oauth tokens
		github.authenticate({
		    type: "oauth",
		    token: user.services.github.accessToken
		});


		// compile the template

		SSR.compileTemplate('blog_template', Assets.getText('blog_template1.html'));
		var posts = Posts.find({isPublished: true, owner:Meteor.userId()}, {sort: {createdAt: -1}});
		var data = {
			authorName: user.profile.name,
			BlogDescription: "Created using Templeb",
			posts: posts
		}

		//rendering the template with data
		var html = SSR.render('blog_template', data);
		html = "<html>" + html + "</html>";

		gitStatus = GitStatus.findOne({userId: Meteor.userId()});
		htmlBase64 = new Buffer(html).toString('base64');

		if (!gitStatus){
			//File does not exists, so create the file.
			var msg = {
				user: user.services.github.username,
				repo: user.services.github.username + '.github.io',
				path: 'index.html',
				message: 'created index.html',
				content: htmlBase64
			};
			github.repos.createContent(msg, Meteor.bindEnvironment(function(err, res){
				if(res){
					GitStatus.insert({
						userId: Meteor.userId(),
						sha: res.content.sha
					});
					console.log("Created index.html: " + res.content.sha);
				}else{
					console.log(JSON.stringify(err));
					Meteor.call('togglePublished', currentlyChangedId, !changedIsPublished );
				}
			}));
		}
		else{
			var msg = {
				user: user.services.github.username,
				repo: user.services.github.username + '.github.io',
				path: 'index.html',
				message: 'created index.html',
				content: htmlBase64,
				sha: gitStatus.sha
			};
			github.repos.updateFile(msg, Meteor.bindEnvironment(function(err, res){
				if(res){
					GitStatus.update(gitStatus._id,{$set:{
						userId: Meteor.userId(),
						sha: res.content.sha
					}});
					console.log("Updated index.html: " + res.content.sha);
				}
				else{
					console.log(JSON.stringify(err));
					Meteor.call('togglePublished', currentlyChangedId, !changedIsPublished );
				}
			}));
		}
	},
});

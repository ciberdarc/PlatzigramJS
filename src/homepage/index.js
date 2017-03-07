var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title =require('title');

page('/', function(ctx, next){
    title('Platzigram')
    var main = document.getElementById('main-container');

    var pictures = [
    	{
    		user:{
    				username: 'alexisaraujo',
    				avatar: 'https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/15095636_10155681383018539_239145637589870926_n.jpg?oh=a116b9c31e753fd9cbea87d27e7eef57&oe=593604FA'
    		},
    		url: 'office.jpg',
    		likes: 10,
    		liked: false,
            createdAt: new Date()
    	},
    	    	{
    		user:{
    				username: 'alexisaraujo',
    				avatar: 'https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/15095636_10155681383018539_239145637589870926_n.jpg?oh=a116b9c31e753fd9cbea87d27e7eef57&oe=593604FA'
    		},
    		url: 'office.jpg',
    		likes: 2,
    		liked: true,
            createdAt: new Date().setDate(new Date().getDate() - 10)
    	}
    ];

    empty(main).appendChild(template(pictures));
})
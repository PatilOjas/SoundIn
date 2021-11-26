var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

bodyParser.urlencoded({
    extended:true
})

app.get('/',function(req,res){
    res.send([
        {
            'id': 0,
            'category': 'Work Music',
            'tagline': 'Music that suits you',
            'subcat':[
                {
                'name': 'Work Music',
                'img': "https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                'desc': 'Lorem ipsum delor vas...',
                }
            ],
        },
        {
            'id': 1,
            'category': 'Focus',
            'tagline': 'Music to help you concentrate',
            'subcat':[
                {
                'name': 'Focus PLaylist 1',
                'img': 'https://images.unsplash.com/photo-1518961039426-cdc80759ff57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1119&q=80',
                'desc': 'Lorem ipsum delor vas...',
                }
            ]
        },
        {
            'id': 2,
            'category': 'Mood',
            'tagline': 'Playlists to match your mood',
            'subcat':[
                {
                    'name': 'Mood playlists 1',
                'img':'https://images.unsplash.com/photo-1634238917234-a581f86ae740?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
                'desc': 'Lorem ipsum delor vas...',
                },
                {
                    'name': 'Mood playlists 2',
                'img': 'https://images.unsplash.com/photo-1634148969837-7feba3939ee3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=460&q=80',
                'desc': 'Lorem ipsum delor vas...',
                }
            ]
        },
        {
            'id': 3,
            'category': 'Soundtrack your home',
            'tagline': 'Lets Nacho',
            'subcat':[
                {
                    'name': 'Home PLaylist 1',
                'img': 'https://images.unsplash.com/photo-1634233942057-b75723e58180?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=388&q=80',
                'desc': 'Lorem ipsum delor vas...',
                },
                {
                    'name': 'Home PLaylist 2',
                'img': 'https://images.unsplash.com/photo-1634229952383-8e4069f75e2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
                'desc': 'Lorem ipsum delor vas...',
                },
                {
                    'name': 'Home PLaylist 3',
                'img': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
                'desc': 'Lorem ipsum delor vas...',
                }
            ]
        },
        {
            'id': 4,
            'category': 'Kick back this Sunday...',
            'tagline': 'Sunday Funday',
            'subcat':[
                {
                    'name': 'Sunday playlists 1',
                'img': 'https://images.unsplash.com/photo-1634227232738-0bb7b885fdb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=436&q=80',
                'desc': 'Lorem ipsum delor vas...',
                }
            ]
        },
		{
            'id': 5,
            'category': 'Your Telent',
            'tagline': 'Other User Crerations',
            'subcat':[
                {
                    'name': 'Your Talent Playlist',
                'img': 'https://images.unsplash.com/photo-1485579149621-3123dd979885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
                'desc': 'Lorem ipsum delor vas...',
                }
            ]
        },
    ]);
})

app.listen(3000,function () {
    console.log('App listening on port 3000!');    
})
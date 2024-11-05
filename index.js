import express from "express";
import bodyParser from "body-parser";

const port=3000;
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

let posts=[];


function Post(title,content){
    this.title=title
    this.content=content
    this.rawDate=new Date()
    this.date=this.rawDate.toLocaleString();
}

function addPost(title,content){
    let p=new Post(title,content);
    posts.push(p);
}

function deletePost(index){
    delete posts[index];
}

function editPost(index,title,content){
    posts[index]=new Post(title,content);
}

app.get('/',(req,res)=>{
    res.render('index.ejs',{posts:posts});
});

app.get('/views/:id',(req,res)=>{
    let index=req.params.id;
    let post=posts[index];
    res.render('views.ejs',{postId:index,title:post.title,content:post.content});
});

app.get('/article',(req,res)=>{
    res.render('article.ejs');
});

app.post('/article',(req,res)=>{
    let title=req.body.title;
    let content=req.body.body;
    addPost(title,content);
    res.redirect('/');
});

app.post('/delete',(req,res)=>{
    let index=req.body['postId'];
    deletePost(index);
    console.log(posts);
    res.redirect('/');
});

app.get('/edit/:id',(req,res)=>{
    let index=req.params.id;
    let post=posts[index];
    res.render('article.ejs',{postId:index,title:post.title,content:post.content});
});

app.post('/update',(req,res)=>{
    let title=req.body['title'];
    let content=req.body['content'];
    let index=req.body['index'];
    editPost(index,title,content);
    res.redirect('/');
})

app.listen(port,()=>{
    addPost('Perez admits ‘nothing really worked’ in Sao Paulo GP as Horner brands Mexican’s first-lap spin ‘annoying’','Sergio Perez was left to rue that “nothing really worked” during his eventful afternoon at the Sao Paulo Grand Prix, with the Mexican having to fight his way back to P11 following a first-lap spin branded “annoying” by Red Bull team boss Christian Horner.');
    addPost('McLaren boss Stella says ‘it’s all to play for’ in title battles despite Norris losing ground to Verstappen in Brazil','McLaren Team Principal Andrea Stella was swift to congratulate his rivals Red Bull in Brazil, with Max Verstappen’s dominant victory dealing a blow to Lando Norris’s hopes in the drivers’ championship. But McLaren somehow managed to extend their lead in the constructors’ championship – no mean feat on a day where so much went wrong for so many.');

    console.log("Listening on port "+port);
    
})
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express({defaultErrorHandler:false});
var mysql = require('mysql')

const port = 1946;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'jeffrey',
    password: '12345',
    database: 'moviebertasbih',
    port: 3306
});

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}))

app.get('/',(req,res)=>{
    res.send('<h1>Tes</h1>')
})

app.get('/list' ,(req, res)=>{
    var sql = 'select * from movies;' ;
    db.query(sql , (err,result)=>{
        res.send(result);
    })
})

app.post('/addmovies' , (req , res)=>{

    // var film = req.params.film;
    // var tahun = req.params.tahun;
    // var des = req.params.des;
    var { film , tahun , des } = req.body
    var sql = `insert into movies values(null , '${film}' , ${tahun} , '${des}');`;

    db.query(sql , (err, result)=>{
        console.log(result);
    })
}) // untuk add movies

app.post('/addmovies2' , (req , res)=>{

    var film = req.query.film;
    var tahun = req.query.tahun;
    var des = req.query.des;
    
    var sql = `insert into movies values(null , '${film}' , ${tahun} , '${des}');`;

    db.query(sql , (err, result)=>{
        console.log(result);
    })
})

app.post('/updatemovies' ,(req, res)=>{

    
    var {film , id , tahun} = req.body;
    var sql = `update movies set nama = '${film}' , tahun = ${tahun}  where idmovies = ${id} ;` ;

    db.query(sql , (err , result)=>{
        if (err) throw err;
        console.log(result);
    })
}) // untuk update movies

app.post('/updatemovies2' ,(req, res)=>{

    
    // var {film , id , tahun} = req.body;
    var film = req.query.film;
    var tahun = req.query.tahun;
    var id = req.query.id;
    // var des = req.query.des;
    var sql = `update movies set nama = '${film}' , tahun = ${tahun}   where idmovies = ${id} ;` ;

    db.query(sql , (err , result)=>{
        if (err) throw err;
        console.log(result);
    })
})

app.delete('/deletemovies' , (req, res)=>{

    var {film} = req.body;
    var sql = `delete movcat , movies from movcat
    join categories on movcat.idcategory = categories.id
    join movies on movcat.idmovie = movies.idmovies
    where(movies.nama = '${film}') ;` ;

    db.query(sql , (err , result)=>{
        console.log(result + 'Berhasil Dihapus')
    })
}) // untuk menghapus movies

app.delete('/deletemovies2' , (req, res)=>{

    var id = req.query.id;
    var sql = `delete movcat , movies from movcat
    join categories on movcat.idcategory = categories.id
    join movies on movcat.idmovie = movies.idmovies
    where(movies.idmovies = '${id}') ;` ;

    db.query(sql , (err , result)=>{
        console.log(result + 'Berhasil Dihapus')
    })
})

app.get('/getcategories' , (req, res)=>{
    var sql = 'select * from categories;' ;
    db.query(sql  , (err ,result)=>{
        res.send(result);
    })
})

app.post('/addcategories' , (req, res)=>{
    var { newcategories } = req.body;
    
    var sql = `insert into categories values(null , '${newcategories}');` ;
    db.query(sql , (err ,result) =>{
        console.log(result);
    })
}) // untuk add categories

app.post('/addcategories2' , (req, res)=>{
    var  newcategories  = req.query.kategori;
    
    var sql = `insert into categories values(null , '${newcategories}');` ;
    db.query(sql , (err ,result) =>{
        console.log(result);
    })
})

app.post('/updatecategories' , (req , res)=>{

    var { nama , id} = req.body;

    var sql = `update categories set nama = '${nama}' where id = ${id};`;
    db.query(sql , (err , result)=>{
        console.log(result)
    })
}) //untuk update categories

app.post('/updatecategories2' , (req , res)=>{

    var nama  = req.query.nama;
    var id = req.query.id;
    var sql = `update categories set nama = '${nama}' where id = ${id};`;
    db.query(sql , (err , result)=>{
        console.log(result)
    })
})

app.delete('/deletecategories' , (req , res)=>{

    var { id } = req.body;

    var sql = `delete movcat , categories from movcat 
    join movies on movcat.idmovie = movies.idmovies
    join categories on movcat.idcategory = categories.id
    where(categories.id = ${id});` ;
    db.query(sql , (err  ,result)=>{
        console.log("oeoeoeoeoeoeeo");
    })
})// untuk hapus categories

app.delete('/deletecategories2' , (req , res)=>{

    var  id  = req.query.id;

    var sql = `delete movcat , categories from movcat 
    join movies on movcat.idmovie = movies.idmovies
    join categories on movcat.idcategory = categories.id
    where(categories.id = ${id});` ;
    db.query(sql , (err  ,result)=>{
        console.log("oeoeoeoeoeoeeo");
    })
})

app.get('/getmoviescat' , (req , res)=>{

    var sql = `select movies.nama as Namamovie , categories.nama as Namakategori ,
    movies.idmovies as idmovies , categories.id as idkategori
     from movies
    join movcat on movcat.idmovie = movies.idmovies
    join categories on movcat.idcategory = categories.id
    ;`

    db.query(sql , (err , result) =>{
        res.send(result)
    })
})
 // untuk mendapat movie dan category di gabung
app.post('/addmoviescat' ,(req ,res)=>{
    var { film , kategori } = req.body;
    var sql = `insert into movcat values( (select idmovies from movies where nama = '${film}') , 
                (select id from categories where nama = '${kategori}'));` ;
    db.query(sql , (err , result)=>{
        console.log(result);
    })
})

app.post('/addmoviescat2' ,(req ,res)=>{
    // var { film , kategori } = req.body;
    var film = req.query.film;
    var kategori = req.query.kategori;
    var sql = `insert into movcat values( (select idmovies from movies where nama = '${film}') , 
                (select id from categories where nama = '${kategori}'));` ;
    db.query(sql , (err , result)=>{
        console.log(result);
    })
})

app.delete('/deletemoviescat' , (req,res)=>{

    var { idmovie , idcategory } = req.body;
    var sql = `delete movcat from movcat where idmovie = ${idmovie} and idcategory = ${idcategory};`;
    db.query(sql , (err, result)=>{
        if (err) throw err;
        console.log("berhasil dihapus");
    })
})

app.delete('/deletemoviescat2' , (req,res)=>{

    // var { idmovie , idcategory } = req.body;
    var idmovie  = req.query.idmovie;
    var idcategory = req.query.idcategory;
    var sql = `delete movcat from movcat where idmovie = ${idmovie} and idcategory = ${idcategory};`;
    db.query(sql , (err, result)=>{
        console.log(result)
        console.log("berhasil dihapus");
    })
})



app.listen(port, () => console.log('API Aktif di port ' + port));
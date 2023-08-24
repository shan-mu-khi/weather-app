const express=require('express');
const path=require('path');
const app=express();
const hbs=require('hbs');
const forecast=require('./utils/forecast')

let publicDirectory=path.join(__dirname,'../public');
let viewsDirectory=path.join(__dirname,'../views/templates')
let partialDirectory=path.join(__dirname,'../views/partials')


app.set('view engine','hbs');
app.set('views',viewsDirectory);
app.use(express.static(publicDirectory));
app.use(express.static(viewsDirectory));
hbs.registerPartials(partialDirectory);


app.get('',(req,res)=>{
    res.render('index',{
        title:"Home Page",
        name:"Shan"
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:"Shan"
    })
})

app.use('/about',(req,res)=>{
res.render('about',{
    title:'About',
    name:'Shan'
})
});

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Send address property to get back the temperature'
        })
    }

    forecast.getData(req.query.address,(error,result)=>{
        if(error){
            return res.send({
                error:error
            })
        }
        res.send({
            title:'Weather',
            name:'Shan',
            location:req.query.address,
            temperature:result.temperature,
            description:result.description,
            rainChance:result.rainChance
        })
    })
    // res.send({
    //     forecast:"23 F",
    //     location:req.query.address,
    //     name:"Shan"
    // });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'please enter search'
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    });
});

app.get('*',(req,res)=>{
    res.render('error',{
        title:"Error",
        name:"Shan"
    })
})


app.listen(3000,()=>{
    console.log('Server is up!');
})
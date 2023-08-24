console.log('client side js');


let submitBtn=document.querySelector('button');
let final_div=document.getElementsByClassName('result')[0];
final_div.style.display='none';
final_div.classList.add('finalDiv');
let p=document.createElement('p');
p.innerText='Loading...';
p.setAttribute('id','loading');

submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let locationElem=document.getElementById('location');
    let city=locationElem.value;
    if(final_div.hasChildNodes()){
        let child_nodes=final_div.childNodes;
        for(let i=0;i<child_nodes.length;i++) final_div.removeChild(child_nodes[i]);
    }
    final_div.style.display='flex';
    final_div.appendChild(p);
    if(city.length) this.forecastAPIcall(city);
    else{
        let loadingElem=document.getElementById('loading');
        final_div.removeChild(loadingElem);
        let elem=document.createElement('div');
        elem.innerText='Enter a city name!';
        elem.classList.add('finalDiv');
        final_div.appendChild(elem);
    }
})


function forecastAPIcall(city){
   
      fetch('http://localhost:3000/weather?address='+city).then((res)=>{
        res.json().then(result=>{
            if(final_div.hasChildNodes()){
                let child_nodes=final_div.childNodes;
                for(let i=0;i<child_nodes.length;i++) final_div.removeChild(child_nodes[i]);
            }  
            if(result.error){
                let error=document.createElement('div');
                error.innerText=result.error;
                error.classList.add('errorTxt');
                final_div.appendChild(error);
                
            }
            else{
                let forecast=document.createElement('div');
                let update=result.location.toUpperCase()+' has a temperature of '+result.temperature+' degree Celsius with a '+result.rainChance+'% chance of rain. It is '+result.description.toLowerCase()+'.';
                forecast.innerText=update;
                forecast.classList.add('validTxt');
                final_div.appendChild(forecast);
                
            }
        })
    })
}


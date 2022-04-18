const puppeteer = require('puppeteer');

const scrap_sensacine = async (movie) => {
    try{
    
    //lanzamos chrome
    const browser = await puppeteer.launch({headless: true,args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setViewport({width:1440, height:614});

    //abrimos site
    await page.goto('https://www.sensacine.com/peliculas/');

    //escribimos en el buscador el nombre que le introduzcamos como argumento
    await page.type('#header-search-input', movie)
   

    //selecciono la clase común a las cajas que me interesan (se ven en la propia pagina)
    await page.click('.header-search-submit');
    
      try {
        await page.waitForSelector('.mdl')
      }
      catch(error) {
        return console.log(`ERROR: ${error.stack}. No existe ese selector porque no está esa peli`);
        }
    

    const links = await page.evaluate(() => {
      const elements = document.querySelectorAll('.rating-holder a')

      let links = [];
      for(let element of elements){
          links.push(element.href);
      }
      return links;
  })


    //buscamos el enlace que contenga "criticas-espectadores"
    const match = links.find(element => element.includes('criticas-espectadores'));
    
   
    //hacemos click en ese enlace
    await page.goto(match);
    await page.waitForSelector('.dropdown-custom-holder');
   
    
   
  //sacamos el primer comentario de las reviews de usuarios (username + comentario)
 
  let innerTextOfReview = await page.$eval('.review-card-content', el => el.innerText) 
  let innerUserOfReview = await page.$eval('.meta-title', el => el.innerText)

  if(innerUserOfReview == "Un visitante"){
    innerUserOfReview = "Un visitante de Sensacine"
  }
  
  

await browser.close();

 const reviewsSensacine = {
  innerTextOfReview,
  innerUserOfReview
}

return reviewsSensacine; 

}catch (error) {
return console.log(`ERROR: ${error.stack}`);
}
};


/* scrap_sensacine("mulan");
 */
module.exports = scrap_sensacine;
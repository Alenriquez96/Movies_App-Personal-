const puppeteer = require('puppeteer');

const scrap_filmaffinity = async (title) => {
    try{
    
    //lanzamos chrome
    const browser = await puppeteer.launch({headless: true });
    const page = await browser.newPage();
    await page.setViewport({width:1440, height:614});

    //abrimos site
    await page.goto('https://www.filmaffinity.com');


    if(await page.$('#qc-cmp2-main > div')){
        await page.click('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay > div > button.css-v43ltw');
    }  

    //escribimos en el buscador el nombre que le introduzcamos como argumento
    await page.type('#top-search-input', title)
   

    //selecciono la clase común a las cajas que me interesan (se ven en la propia pagina)
    await page.click('#button-search');
    await page.waitForSelector('.z-search');

    const links = await page.evaluate(() => {
      const elements = document.querySelectorAll('.mc-title a')

      let links = [];
      for(let element of elements){
          links.push(element.href);
      }
      return links;
  })

    //hacemos click en ese enlace
    await page.goto(links[0]);
    await page.waitForSelector('#main-title');
  /*   if(await page.$('#top-ad')){
      await page.waitForTimeout(2000)
    } */
    
  
    //va a críticas
    await page.click('.ntabs li:nth-child(2)');
    await page.waitForTimeout(2000)
    await page.waitForSelector('.review-text1');

  //sacamos el primer comentario de las reviews de usuarios (username + comentario)
  let innerTextOfReview = await page.$eval('.fa-shadow.movie-review-wrapper.rw-item .review-text1', el => el.textContent) 
  let innerUserOfReview = await page.$eval('div.mr-user-nick > a > b', el => el.innerText) || 'nada'

  const reviewsFilmaffinity = {
    innerTextOfReview,
    innerUserOfReview
  }
  
    await browser.close();
    return reviewsFilmaffinity;

} catch (error) {
  return console.log(`There's no review in Filmaffinity because of: ${error.stack}`);
  
  }
}

/* scrap_filmaffinity("pulp fiction")  */
module.exports = scrap_filmaffinity;
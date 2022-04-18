const aBtnsFav = document.getElementsByClassName("btn_fav");

for (let i = 0; i < aBtnsFav.length; i++) {
    aBtnsFav[i].addEventListener('click', async function (e) {
        await fetch('/savemovie',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: aBtnsFav[i].value
                })
            })
            .then(function (response) {
                if (response.ok) {
                    console.log('Película añadida a favoritos');
                    return;
                }
                throw new Error('Request failed.');
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}
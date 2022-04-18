const aButtons = document.getElementsByClassName("btn_delete");

for (let i = 0; i < aButtons.length; i++) {
    aButtons[i].addEventListener('click', async function (e) {
        await fetch('/removemovie',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: aButtons[i].value
                })
            })
            .then(function (response) {
                if (response.ok) {
                    console.log('Película borrada');
                    return;
                }
                throw new Error('Request failed.');
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}



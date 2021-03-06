$(function () {

    const BASE_URL = 'https://www.metmuseum.org/api/collection/collectionlisting'
    let artData;

    // chache elements
    const $form = $('form');
    const $input = $('input[type="text"]');
    const $main = $('main');
    const images = ["met-interior.jpeg", "met-interior2.jpeg", "met-interior3.jpeg"];
    
     
    // event listeners
    $form.on('submit', handleGetArt)

    //functions


    function handleGetArt(event) {

        event.preventDefault();

        const artistName = $input.val();

        $input.val("");

        $.ajax(`${BASE_URL}?q=${artistName}&offset=0&pageSize=0&sortBy=Relevance&sortOrder=asc&perPage=20&`).then(function (data) {
            artData = data;
            render();

        }, function (error) {
            console.log(error);
        })
    }

    function render() {

        const htmlCards = artData.results.map(function (artInfo) {

            return `<article>
                        <p><img src="${artInfo.image}"</p>
                        <h2>Artist: ${artInfo.artist}</h2>
                        <p>${artInfo.teaserText}</p>    
                        <p>Title: ${artInfo.title}</p>
                        <p>Medium: ${artInfo.medium}</p>
                        <p>Culture: ${artInfo.culture}</p>
   
                    </article>`;

        });


        $main.html(htmlCards);
    }

})
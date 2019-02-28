window.addEventListener('DOMContentLoaded', () => {

    const loadContent = async (url, callback) => {
        await fetch(url)
        .then(response => response.json())
        .then(json => createElements(json.works));
        callback();
    }

    function createElements(arr) {
        const worksContent = document.querySelector('.works__content');
        arr.forEach( elem => {
            let worksElem = document.createElement('div');
            worksElem.classList.add('works__element');
            worksElem.innerHTML = `
                <h3 class="works__title">${elem.title}</h3>
                <div class="works__img">
                    <a href="${elem.url}" target="_blank" >
                        <img src="${elem.imgUrl}" alt="project">
                    </a>
                </div>
                <a class="works__link" href="${ elem.codeUrl }" target="_blank" >Код на GitHab</a>
                <p class="works__description">${ elem.discription }</p>
            `;

            worksContent.appendChild(worksElem);
        });
    }

    loadContent('js/bd.json', () => {

        //Обработка кнопки меню

        const topMenu = document.querySelector('.top__menu'),
            topNav = document.querySelector('.top__nav')
        ;

        let opacity = 0;

        topMenu.addEventListener('click', () => {
            if (!opacity) {
                topNav.style.opacity = '1';
                opacity = 1;

                document.addEventListener('click', (event) => {
                    if (!topMenu.contains(event.target)) {
                        topNav.style.opacity = '0';
                        opacity = 0;
                    };
                });

            } else {
                topNav.removeAttribute('style');
                opacity = 0;
            };
            
        });


        // Обработка header при скроллинге


        const header = document.querySelector('.header').clientHeight,
            top = document.querySelector('.top')
        ;

        window.addEventListener('scroll', () => {

            pageYOffset >= header ? top.style.position = 'fixed' : top.removeAttribute('style');

        });

    });

});
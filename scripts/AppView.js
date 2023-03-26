export function AppView(){
    let container = null;

    this.init = function(box){
        container = box;
    }
    this.renderPage = function(){
       //прелоадер
        const preloaderWrapperEl = new NewEl('div', 'preloader__wrapper' , container);
        const preloaderWrapper = preloaderWrapperEl.create();

        // Создаем хранилище карточек
        const cardWrapperEl = new NewEl('main', 'cards__wrapper' , container);
        const cardWrapper = cardWrapperEl.create();

        //создаем кнопку скролла вверх
        const buttonUpEl = new NewEl('button', 'btn__up' , container);
        const buttonUp= buttonUpEl.create();
        buttonUp.innerHTML =	'&#8657';

        // окно запроса  включения пагинации
        const paginationRequestEl = new NewEl('div', 'pagination-request__wrapper' , container);
        const paginationRequest= paginationRequestEl .create();
        paginationRequest.innerHTML =`
                <h4 class="pagination-request__text">
            Желаете прекратить автоматическую загрузку и перейти в постраничный режим?
            </h4>
            <button class="pagination-request__btn">Принять</button>`

        // Создаем строку пагинации
        const paginationWrapperEl = new NewEl('footer'  , 'pagination__wrapper' , container );
        const paginationWrapper = paginationWrapperEl .create();
       
        //кнопки перелистывания страницы
        const prevBtnEl = new NewEl('button'  , 'btn-prev' , paginationWrapper );
        const prevBtn = prevBtnEl.create();
        prevBtn.textContent ='prev';

        const nextBtnEl = new NewEl('button'  , 'btn-next' , paginationWrapper );
        const nextBtn = nextBtnEl.create();
        nextBtn.textContent ='next';


        //контейнер модального окна
        const modalWindowEl = new NewEl('div', 'modal__window' , container);
        const modalWindow = modalWindowEl.create();
    }

    //заполняем карточку данными
    this.renderData = function(DB){
            const cardWrapper = document.querySelector('.cards__wrapper');
                DB.map(item=>  {
                    let text = cardSmallTemplate(item);
                    cardWrapper.innerHTML += text;
                }) 
        
    }
    //очистка контейнера под новые карточки
    this.cleanCardWrapper = function(){
        const cardWrapper = document.querySelector('.cards__wrapper');
        cardWrapper.innerHTML=''
    }
    //закрытие прелоадера
    this.breakPreloader = function(){
        const preloader = document.querySelector('.preloader__wrapper');
        preloader.classList.add('hide')
    }
    //строка пагинации
    this.startPaginationMode = function(){
        const paginationRequest= document.querySelector('.pagination-request__wrapper');
        paginationRequest.classList.add('hide')
        const paginaionWrapper = document.querySelector('.pagination__wrapper');
        paginaionWrapper.classList.add('open')
    }
    //создание модального окна
    this.openModal = function(target){
        const modalWindow = document.querySelector('.modal__window');
        modalWindow.classList.add('open-modal')
        //добавляем класс для окна карточек при открытии модального она
        container.classList.add('modal-open');
        modalWindow.innerHTML = modalCardTemplate(target);
    }
    //закрытие модального окна
    this.closeModal = function(){
        const modalWindow = document.querySelector('.modal__window');
        modalWindow.classList.remove('open-modal')
    }
}













function modalCardTemplate(item){
    const modalCardTemplate =`
    <button class="modal__btn-close"></button>
    <div class="modal__wrapper">
            <div class="modal__img-wrapper">
                <img class="modal__card-img" src="${item.dataset.image}" alt="${item.dataset.name}">    
            </div>
            <div class="card__info">
                <div class="card__col">
                    <h6 class="card__inso-sublitle">Name:</h6>
                    <p class="card__inso-text">${item.dataset.name}</p>
                    <h6 class="card__inso-sublitle">Status:</h6>
                    <p class="card__inso-text">${item.dataset.status}</p>
                    <h6 class="card__inso-sublitle">Species</h6>
                    <p class="card__inso-text">${item.dataset.species}</p>
                </div>
                <div class="card__col">
                    <h6 class="card__inso-sublitle">Origin:</h6>
                    <p class="card__inso-text">${item.dataset.origin}</p>
                    <h6 class="card__inso-sublitle">Location</h6>
                    <p class="card__inso-text">${item.dataset.location}</p>
                    <h6 class="card__inso-sublitle">Gender</h6>
                    <p class="card__inso-text">${item.dataset.gender}</p>
                </div>
            </div>
</div>
         `
    return modalCardTemplate;
}


function cardSmallTemplate(item){
    let attr='';
    for( let key in item){
        attr += `data-${key}="${item[key]}" `;
    }
    for( let key in item){
        attr += `data-${item[key]}`;
        const smallCardTemplate =`<div class="small__card-wrapper" ${attr} >
            <div class="card__img-wrapper">
                <img class="small__card-img" src="${item.image}" alt="${item.name}">    
            </div>
            <h6 class="small__card-title">${item.name}</h6>
            </div>`;
        return smallCardTemplate;
}
}

class NewEl {
    constructor(tag, className , parent ){
this.tag=tag;
this.className = className;
this.parent = parent;
    }
    create(){
        const el = document.createElement(this.tag);
        el.classList.add(this.className);
        this.parent.append(el);
        
        return el;
    }
}


/* function cardSmallTemplate(item){
    let attr='' ;
    // создаем data-аттрибуты
console.log(typeof(item['name']))
    function rec(item){
        for(let key in item){
            if(typeof(item[key])== "string"){
                attr += `data-${key}="${item[key]}"  `
                console.log(attr)
            }
            else{  rec(item[key])}
    }
    }; 
    let dataAttr = rec(item)

    /*     for(let key in item){
            dataAttr += `data-${key}="${item[key]}"  `
    } *
    const smallCardTemplate =`<div class="small__card-wrapper" ${dataAttr}  >
        <div class="card__img-wrapper">
            <img class="small__card-img" src="${item.image}" alt="${item.name}">    
        </div>
        <h6 class="small__card-title">${item.name}</h6>
        </div>`;
    return smallCardTemplate;
} */
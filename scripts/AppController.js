export function AppController(){
    let container = null;
    let model = null;
    let num = 1;//счетчик загрузки страниц данных
    let scrollPage = true;//индикатор автоматической подгрузки данных по скролу

    //инициализация контроллера и отлавливание событий
    this.init = function(box, buiznesModel){
        container = box;
        model = buiznesModel;
        document.addEventListener('DOMContentLoaded', this.renderPage());
        document.addEventListener('click' , (e)=> this.clickEvent(e));
        document.addEventListener('scroll',(e)=> 
        //если индикатор скрола активен, то автоматическая подгрузка данных
        {if(scrollPage){this.scrollPage(e)}}
        );
        window.addEventListener('load', this.breakPreloader());
    }
    this.breakPreloader = function(){
        model.breakPreloader();
    }
    //запуск отрисовки каркаса страницы
    this.renderPage = function(){
        model.renderPage();
    }
     //запуск запроса данных
    this.getDataFromApi = function(num){
        model.getDataFromApi(num);
    }

    //обработка кликов на странице
    this.clickEvent = function(e){
        console.log(e.target)
        e.preventDefault();
        const target = e.target;
        
        //клик по кнопке прокрутки вверх
        if(target.classList.contains('btn__up')){ 
            this.scrollPageUp(e);
        }

        //клик по карточке
        if( target.closest('.small__card-wrapper')){
            model.clikOnCardEvent(target.closest('.small__card-wrapper'));
        }

        //клик по модалке для закрытия
        if(target.classList.contains('modal__btn-close')||target.classList.contains('modal__window')){
            model.closeModal()
        }
        if(target.classList.contains('pagination-request__btn')){
            this.startPaginationMode()
        }

        //кнопка пагинации "вперед"
        if(target.classList.contains('btn-prev'))this.prevPage(e);
        //кнопка пагинации "назад"
        if(target.classList.contains('btn-next'))this.nextPage(e);
    }

    //запуск постраничного рендеринга данных
    this.startPaginationMode = function(){
        scrollPage = false;//юлокировка автозагрузки данных
        model.startPaginationMode();
    }

    //переход на предыдущую страницу
    this.prevPage = function(e){
        (num>1)? num -=1 :num;
        //зачистка содержимого в контейнере с карточками
        this.cleanCardWrapper();
        model.getDataFromApi(num)
    }
    

    //переход на следующую страницу
    this.nextPage = function(e){
        num+=1;
        this.cleanCardWrapper();
        model.getDataFromApi(num)
    }

    //зачистка содержимого в контейнере с карточками
    this.cleanCardWrapper = function(){
        model.cleanCardWrapper();
    }

    //обработка прокрутки станицы
    this.scrollPage = function(e){
        
        const clientHeight = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const pageOffset = window.pageYOffset;
       
        if( clientHeight + pageOffset == pageHeight) {
            num = num +1;
            this.getDataFromApi(num)
        } 
    }

    //прокрутка страницы к началу по клику кнопки "вверх"
    this.scrollPageUp = function(e){
        let int;

        function scrollPage(){
            const pageHeight = Math.max(document.body.scrollTop ,document.documentElement.scrollTop);
            if(pageHeight>0){
                window.scrollBy(0, -100)
                int = setTimeout(scrollPage,30)
            }
            else clearTimeout(int)
        }
        scrollPage()
    }
}
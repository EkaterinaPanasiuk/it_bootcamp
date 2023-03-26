export function AppModel(){
    let view= null;

    this.init = function(buiznesView){
        view = buiznesView;
    }
    //отрисовка элементов ДОМ при открытии
    //запрос данных с сервера
    this.renderPage = function(){
        view.renderPage();
        this.getDataFromApi();
    }
    //закрытие прелоадера
    this.breakPreloader = function(){
        view.breakPreloader();
    }

    //запрос данных с сервера
    this.getDataFromApi= async function(num=1){
        let requestURL = `https://rickandmortyapi.com/api/character?page=${num}`;
        
        let DB = await fetch(requestURL)
            .then(data=>data.json())
            .then(data=> {this.upgrateData(data.results)
            } 
        )
    }
    //создание нового массива данных на основании необходимых ключей
    this.upgrateData = function(data){
        const mustArr = ['name' , 'status', 'species', 'origin' , 'location', 'gender','image'];
        const dataArr=[];

        //создаем новый массив с нужными данными
        Object.entries(data).forEach(item=>{
            let cardInfo={};
            for(let i=0 ; i< mustArr.length ; i++){
                (typeof(item[1][mustArr[i]])==='object')?
                cardInfo[mustArr[i]] = item[1][mustArr[i]].name || 'не известно' :
                cardInfo[mustArr[i]] = item[1][mustArr[i]] || 'не известно'
            }
            dataArr.push(cardInfo)
        })
        this.transferDataToModel(dataArr)
    }
    //передаем данные во view для отображения
    this.transferDataToModel = function(DB){
        view.renderData(DB);
    }
    //очистка данных в контейнере карточек
    this.cleanCardWrapper = function(){
        view.cleanCardWrapper();
    }
    //открытие модального окна по клику по карточке
    this.clikOnCardEvent = function(target){
        view.openModal(target)
    }
    //закрытие модального окн
    this.closeModal = function(){
        view.closeModal();
    }
    //переход к режиму пагинации
    this.startPaginationMode = function(){
        view.startPaginationMode();
    }
}


import { AppController } from "./AppController.js";
import { AppModel } from "./AppModel.js";
import { AppView } from "./AppView.js";

const app = document.getElementById('app');

const myApp =(function(){
AppView;
AppModel;
AppController;
return{
    init: function(container){

        const view = new AppView();
        const controller = new AppController();
        const model = new AppModel();

        view.init(container);
        model.init(view);
        controller.init(container , model)
    }
}
})();
myApp.init(app);
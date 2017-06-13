sap.ui.controller("sap.ui.demo.controller.Overview", {
    onInit: function() {},
    
    // getting router which is declared in component file
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
 
		// this function will trigger when button is clicked
     onPressSecond: function(oEvent){
        this.getRouter().navTo("products");
	   },
     onPressThird: function(oEvent){
        this.getRouter().navTo("sales");
	   },
    onBeforeRendering: function() {},
    onAfterRendering: function() {},
    onExit: function() { }            
});





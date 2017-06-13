sap.ui.controller("sap.ui.demo.controller.Products", {
    onInit: function() {},
    
    // getting router which is declared in component file
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
 
		// this function will trigger when button is clicked
	onPress: function(){
        this.getRouter().navTo("overview");
	    },
    onPressThird: function(oEvent){
        this.getRouter().navTo("sales");
	   },
    onBeforeRendering: function() {},
    onAfterRendering: function() {},
    onExit: function() { }           
});

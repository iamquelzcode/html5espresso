sap.ui.controller("sap.ui.demo.controller.Sales", {
    onInit: function() {},
    
    // getting router which is declared in component file
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
 
		// this function will trigger when button is clicked
	onPress: function(){
        this.getRouter().navTo("overview");
	    },
    onPressSecond: function(oEvent){
        this.getRouter().navTo("products");
	   },
    onBeforeRendering: function() {},
    onAfterRendering: function() {},
    onExit: function() { }           
});

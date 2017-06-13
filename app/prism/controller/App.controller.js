sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
        'sap/m/MessageToast'
	], function(jQuery, Controller, MessageToast) {
	"use strict";
 
	var Controller = Controller.extend("sap.ui.demo.controller.App", {
 
		onInit: function () {
 
		},
 
        onPressMsg: function(oEvent) {
			var msg = 'Loyalty Spend KPI Dashboard ROI - Project Prism App ROI Details. Confidential.';
			MessageToast.show(msg);
		}
	});
 
 
	return Controller;
 
});

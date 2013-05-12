sap.ui.jsview("espm-mobile-shopping.MainLogin", {

	getControllerName : function() {
		return "espm-mobile-shopping.MainLogin";
	},
	
	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent : function(oController) {

		appC.radioButton6 = new sap.m.RadioButton("radio6",{
			text: "{i18n>CLOUD_LABEL}",
			groupName: "GroupA",
			selected: true
		});
		appC.radioButton7= new sap.m.RadioButton("radio7",{
			text: "{i18n>ABAP_LABEL}",
			groupName: "GroupA",
		});

		this.page = new sap.m.Page({
			title: "{i18n>SETTINGS_TEXT}",
			icon: appV.bindingIcon.ui5,
			showNavButton : false,
			footer: new sap.m.Bar({
				contentMiddle : [ new sap.m.Button({
					text :"{i18n>PROCEED_BUTTON}",
					tap : [ oController.proceedButtonTap, oController ]
				})
				]
			}),  
			content: [		          
			          new sap.m.VBox({
			        	  items : [
			        	           appC.radioButton6,
			        	           appC.radioButton7    
			        	           ]
			          }),
			          ]
		});		
		return this.page;
	}

});
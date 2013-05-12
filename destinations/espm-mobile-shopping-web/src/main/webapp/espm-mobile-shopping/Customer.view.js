sap.ui.jsview("espm-mobile-shopping.Customer", {

	getControllerName : function() {
		return "espm-mobile-shopping.Customer";
	},

	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent : function(oController) {
		//create input for entering email id
		this.emailInp = new sap.m.Input({
			value: { 
				path : "email", 
				type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40, conatins: "@"}),
			},
			placeholder: "{i18n>CUST_EMAIL_PLACEHOLDER}",
			type: sap.m.InputType.Email,
			liveChange: [ oController.inputChangeTap, this ]
		});

		//create radio buttons
		this.radioButton1 = new sap.m.RadioButton("radio1",{
			text: "{i18n>CUST_RADIO_1}",
			groupName: "GroupA",
			selected: true
		});
		this.radioButton2= new sap.m.RadioButton("radio2",{
			text: "{i18n>CUST_RADIO_2}",
			groupName: "GroupA",
		});

		this.vBox = new sap.m.VBox({
			items: [ 
			        this.emailInp,
			        this.radioButton1,
			        this.radioButton2    			        
			        ]
		});

		//create page
		this.page = new sap.m.Page({
			title: "{i18n>CUST_TITLE}" ,
			icon: appV.bindingIcon.ui5,
			showNavButton : true,
			navButtonTap : [ oController.navButtonTap, oController ],
			footer: new sap.m.Bar({
				contentMiddle : [
				                 new sap.m.Button({
				                	 text : "{i18n>PROCEED_BUTTON}",
				                	 tap : [ oController.proceedTap, oController ]
				                 })]
			}),         
			content : [ this.vBox ] 
		});
		return this.page;  
	}
});
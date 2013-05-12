sap.ui.jsview("espm-mobile-shopping.CreditCardDetails", {

	getControllerName : function() {
		return "espm-mobile-shopping.CreditCardDetails";
	},

	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent : function(oController) {
		//create label
		this.cardLbl = new sap.m.Label({
			text: "{i18n>CC_CARD_TYPE}",
		});
		this.cardLbl.addStyleClass("customlabel");

		//create radio buttons and images.
		this.radioButton3 = new sap.m.RadioButton("radio3",{
			text: "",
			groupName: "GroupA",
			selected: true
		});
		this.image1 = new sap.m.Image({
			src: "images/icon-credit-card-blue.png",
			height: "25px",
		});
		this.radioButton4= new sap.m.RadioButton("radio4",{
			text: "",
			groupName: "GroupA",
		});
		this.image2 = new sap.m.Image({
			src: "images/icon-credit-card-gold.png",
			height: "25px",
		});
		this.radioButton5= new sap.m.RadioButton("radio5",{
			text: "",
			groupName: "GroupA",
		});
		this.image3 = new sap.m.Image({
			src: "images/icon-credit-card-green.png",
			height: "25px",
		});

		//placing the radio buttons and the images inside a horizontal box
		this.hBox1 = new sap.m.HBox({
			items: [ 
			        this.radioButton3,
			        this.image1,
			        this.radioButton4,
			        this.image2,
			        this.radioButton5,
			        this.image3			        
			        ]
		});

		this.vBox = new sap.m.VBox({
			items: [ 
			        this.cardLbl,
			        this.hBox1,
			        ]
		});

		//create the entries in the list
		this.sName = new sap.m.InputListItem({
			label: "{i18n>CC_NAME_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "name", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>CC_NAME_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			        	 liveChange: [ oController.inputChangeTap, this ]

			         })],
		});

		this.sNumber = new sap.m.InputListItem({
			label: "{i18n>CC_NUMBER_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "number", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 15}),
			        	 },
			        	 placeholder: "{i18n>CC_NUMBER_PLACEHOLDER}",
			        	 type: sap.m.InputType.Tel,
			        	 liveChange: [ oController.inputChangeTap, this ]
			         })],
		});

		this.sCode = new sap.m.InputListItem({
			label: "{i18n>CC_CODE_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "code", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 15}),
			        	 },
			        	 placeholder: "{i18n>CC_CODE_PLACEHOLDER}",
			        	 type: sap.m.InputType.Tel,
			        	 liveChange: [ oController.inputChangeTap, this ]
			         })],
		});	

		//create page
		this.page = new sap.m.Page({
			title: "{i18n>CC_TITLE}",
			icon: appV.bindingIcon.ui5,
			showNavButton : true,
			navButtonTap : [ oController.navButtonTap, oController ],
			footer: new sap.m.Bar({
				contentMiddle : [
				                 new sap.m.Button({
				                	 text : "{i18n>ORDER_BUTTON}",
				                	 type : sap.m.ButtonType.Accept,
				                	 tap : [ oController.orderTap, oController ]
				                 }) 
				                 ]
			}),         
			content : [
			           this.vBox,
			           new sap.m.List({
			        	   items: [
			        	           this.sName,
			        	           this.sNumber,
			        	           this.sCode			        	           
			        	           ]
			           })] 
		});
		return this.page;  
	}
});
sap.ui.jsview("espm-mobile-shopping.FirstLogin", {

	getControllerName : function() {
		return "espm-mobile-shopping.FirstLogin";
	},

	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent : function(oController) {

		this.scheckBox = new sap.m.CheckBox({
			selected: true,
			name: "checkBox",    	 
		});

		this.scheckBoxLabel = new sap.m.Label({
			text: "{i18n>CHECK_BOX_LABEL}"
		});
		this.scheckBoxLabel.addStyleClass("defaultLabel");

		this.sSmpUrl = new sap.m.InputListItem({
			label: "{i18n>SMP_URL_TEXT}",
			content:[
			         new sap.m.Input({
			        	 //enabled: false,
			        	 //editable: false,
			        	 value: { 
			        		 path : "smpUrl", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>SMP_URL_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,

			         })],
		});
		this.sSmpUrl.addStyleClass("inputListLabel");

		this.sAppName = new sap.m.InputListItem({
			label: "{i18n>SMP_APP_NAME}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "appName", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>SMP_APP_NAME_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			         })],
		});
		this.sAppName.addStyleClass("inputListLabel");

		this.sImgName = new sap.m.InputListItem({
			label: "{i18n>SMP_IMG_CONN}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "connName", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>SMP_IMG_CONN_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			         })],
		});
		this.sImgName.addStyleClass("inputListLabel");

		this.sUser = new sap.m.InputListItem({
			label: "{i18n>ABAP_USER}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "User", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>ABAP_USER_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			         })],
		});
		this.sUser.addStyleClass("inputListLabel");

		this.sPassword = new sap.m.InputListItem({
			label: "{i18n>ABAP_PASSWORD}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "Password", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>ABAP_PASSWORD_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			         })],
		});
		this.sPassword.addStyleClass("inputListLabel");

		this.page = new sap.m.Page({
			showNavButton : true,
			navButtonTap : [ oController.navButtonTap, oController ],
			icon : appV.bindingIcon.ui5,
			footer: new sap.m.Bar({
				contentMiddle : [ new sap.m.Button({
					text :"{i18n>PROCEED_BUTTON}",
					tap : [ oController.loginButtonTap, oController ]
				})
				]
			}),   
			content: [
			          this.loginList = new sap.m.List({
			        	  items: [
			        	          new sap.m.CustomListItem({
			        	        	  content: [
			        	        	            new sap.m.HBox({
			        	        	            	items: [
			        	        	            	        this.scheckBox,
			        	        	            	        this.scheckBoxLabel			       
			        	        	            	        ]			
			        	        	            })
			        	        	            ]
			        	          }),
			        	          this.sSmpUrl,
			        	          this.sAppName,
			        	          this.sImgName,
			        	          this.sUser,
			        	          this.sPassword
			        	          ]
			          }),
			          ]
		});
		return this.page;
	}
});
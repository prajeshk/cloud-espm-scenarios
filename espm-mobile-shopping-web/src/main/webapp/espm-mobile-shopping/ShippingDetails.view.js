sap.ui.jsview("espm-mobile-shopping.ShippingDetails", {

	getControllerName : function() {
		return "espm-mobile-shopping.ShippingDetails";
	},

	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent : function(oController) {

		this.sFirstName = new sap.m.InputListItem({
			label: "{i18n>SHIPPING_FNAME_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "fname", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>SHIPPING_FNAME_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			        	 liveChange: [ oController.inputChangeTap, this ]
			         })],
		});

		this.sLastName = new sap.m.InputListItem({
			label: "{i18n>SHIPPING_LNAME_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "lname", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>SHIPPING_LNAME_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			        	 liveChange: [ oController.inputChangeTap, this ]
			         })],
		});

		this.sDateOfBirth = new sap.m.InputListItem({
			label: "{i18n>SHIPPING_DOB_LABEL}",
			content:[
			         new sap.m.DateTimeInput({
			        	 value: {
			        		 path: "DateOfBirth",
			        		 type: new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>SHIPPING_DOB_PLACEHOLDER}",
			        	 change: [ oController.inputChangeTap, this ]
			         })],
		});

		this.sPhone = new sap.m.InputListItem({
			label: "{i18n>SHIPPING_PH_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "phone", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 15}),
			        	 },
			        	 placeholder: "{i18n>SHIPPING_PH_PLACEHOLDER}",
			        	 type: sap.m.InputType.Tel,
			        	 liveChange: [ oController.inputChangeTap, this ]
			         })],
		});

		this.sStreet = new sap.m.InputListItem({
			label: "{i18n>SHIPPING_STREET_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "street", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>SHIPPING_STREET_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			        	 liveChange: [ oController.inputChangeTap, this ]
			         })],
		});

		this.sCity = new sap.m.InputListItem({
			label: "{i18n>SHIPPING_CITY_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "city", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 0, maxLength: 40}),
			        	 },
			        	 placeholder: "{i18n>SHIPPING_CITY_PLACEHOLDER}",
			        	 type: sap.m.InputType.Text,
			        	 liveChange: [ oController.inputChangeTap, this ]
			         })],
		});

		this.sCountry = new sap.m.InputListItem({
			label: "{i18n>SHIPPING_COUNTRY_LABEL}",
			content:[new sap.m.Select({
				items: [
				        new sap.ui.core.Item("item1", {
				        	text: "India",
				        	customData: [
				        	             new sap.ui.core.CustomData({
				        	            	 key: "code",
				        	            	 value: "IN"
				        	             }),
				        	             ],
				        }),
				        new sap.ui.core.Item("item2", {
				        	text: "Germany",
				        	customData: [
				        	             new sap.ui.core.CustomData({
				        	            	 key: "code",
				        	            	 value: "DE"
				        	             }),
				        	             ],
				        })
				        ]
			})]
		});

		this.sZipCode = new sap.m.InputListItem({
			label: "{i18n>SHIPPING_CODE_LABEL}",
			content:[
			         new sap.m.Input({
			        	 value: { 
			        		 path : "postalCode", 
			        		 type : new sap.ui.model.type.String(null, {minLength: 1, maxLength: 10}), 
			        		 formatter : function(value){
			        			 return window.localStorage.getItem("BUSINESS_PARTNER_ZIP");
			        		 }
			        	 },
			        	 placeholder: "{i18n>SHIPPING_CODE_PLACEHOLDER}",
			        	 type: sap.m.InputType.Tel,
			        	 liveChange: [ oController.inputChangeTap, this ]
			         })],
		});

		//create page
		this.page = new sap.m.Page({
			title : "{i18n>SHIPPING_TITLE}",
			icon : appV.bindingIcon.ui5,
			showNavButton : true,
			navButtonTap : [ oController.navButtonTap, oController ],
			footer: new sap.m.Bar({
				contentMiddle : [
				                 new sap.m.Button({
				                	 text : "{i18n>PROCEED_BUTTON}",
				                	 tap : [ oController.proceedTap, oController ]
				                 }) 
				                 ]
			}),         
			content: [
			          new sap.m.List({
			        	  headerText : "{i18n>LIST_HEADER_TEXT_CONTACT}",
			        	  items: [
			        	          this.sFirstName,
			        	          this.sLastName,
			        	          this.sDateOfBirth,
			        	          this.sPhone		        	          
			        	          ]
			          }),
			          new sap.m.List({
			        	  headerText : "{i18n>LIST_HEADER_TEXT_ADDRESS}",
			        	  items:[
			        	         this.sStreet,
			        	         this.sCity,
			        	         this.sCountry,
			        	         this.sZipCode			        	         
			        	         ]
			          }),
			          ] 
		});
		return this.page;
	}
});
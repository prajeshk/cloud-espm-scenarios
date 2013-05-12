sap.ui.controller("espm-mobile-shopping.FirstLogin", {


	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {

	},

	onBeforeShow : function(evt) {
		var view = this.getView();
		//for Hana Cloud and using default settings
		if(view.scheckBox.getSelected() == true && appC.radioButton6.getSelected()==true){
			view.page.setTitle(appC.i18n.getProperty("HANA_TITLE"));
			appC.useABAP = false;
			view.sSmpUrl.getContent()[0].setEnabled(false);
			appC.smpURL =view.sSmpUrl.getContent()[0].setValue("https://smpmaas-espmhana.netweaver.ondemand.com").getValue();
			view.sAppName.getContent()[0].setEnabled(false);
			appC.smpAppName = view.sAppName.getContent()[0].setValue("espm_shopping_cloud").getValue();
			view.sImgName.getContent()[0].setEnabled(false);
			appC.smpImgName = view.sImgName.getContent()[0].setValue("espm_shopping_cloud_img").getValue();
			view.sUser.setVisible(false);
			view.sPassword.setVisible(false);
		}
		//for ABAP Gateway and using default settings 
		else if(view.scheckBox.getSelected() == true && appC.radioButton7.getSelected()==true){
			view.page.setTitle(appC.i18n.getProperty("ABAP_TITLE"));
			appC.useABAP = true;
			view.sSmpUrl.getContent()[0].setEnabled(false);
			appC.smpURL =view.sSmpUrl.getContent()[0].setValue("https://smpmaas-smpcloud.netweaver.ondemand.com").getValue();
			view.sAppName.getContent()[0].setEnabled(false);
			appC.smpAppName = view.sAppName.getContent()[0].setValue("MobileRetailingTest").getValue();
			view.sImgName.getContent()[0].setEnabled(false);
			appC.smpImgName = view.sImgName.getContent()[0].setValue("MobileRetailingNewImage").getValue();
			view.sUser.setVisible(true);
			appC.user = view.sUser.getContent()[0].setValue("anzeiger").getValue();
			view.sUser.getContent()[0].setEnabled(false);
			view.sPassword.setVisible(true);
			appC.password = view.sPassword.getContent()[0].setValue("display").getValue();
			view.sPassword.getContent()[0].setEnabled(false);
		}
		//for Hana Cloud and without using default settings
		else if(view.scheckBox.getSelected() == false && appC.radioButton6.getSelected()==true){
			view.page.setTitle(appC.i18n.getProperty("HANA_TITLE"));
			appC.useABAP = false;
			view.sSmpUrl.getContent()[0].setEnabled(true);
			appC.smpURL = view.sSmpUrl.getContent()[0].getValue();
			view.sAppName.getContent()[0].setEnabled(true);
			appC.smpAppName = view.sAppName.getContent()[0].getValue();
			view.sImgName.getContent()[0].setEnabled(true);
			appC.smpImgName = view.sImgName.getContent()[0].getValue();
			view.sUser.setVisible(false);
			view.sPassword.setVisible(false);		
		}
		//for ABAP Gateway and without using default settings 
		else if(view.scheckBox.getSelected() == false && appC.radioButton7.getSelected()==true){
			view.page.setTitle(appC.i18n.getProperty("ABAP_TITLE"));
			appC.useABAP = true;
			view.sSmpUrl.getContent()[0].setEnabled(true);
			appC.smpURL = view.sSmpUrl.getContent()[0].getValue();
			view.sAppName.getContent()[0].setEnabled(true);
			appC.smpAppName = view.sAppName.getContent()[0].getValue();
			view.sImgName.getContent()[0].setEnabled(true);
			appC.smpImgName = view.sImgName.getContent()[0].getValue();
			view.sUser.setVisible(true);
			appC.user = view.sUser.getContent()[0].getValue();
			view.sUser.getContent()[0].setEnabled(true);
			view.sPassword.setVisible(true);
			appC.password = view.sPassword.getContent()[0].getValue();
			view.sPassword.getContent()[0].setEnabled(true);
		}
	},

	loginButtonTap : function(evt) { 	
		var param = { context : evt.oSource.getBindingContext() };
		appC.navTo("Category", true, undefined, param);
	},

	navButtonTap : function(evt) { 
		appC.navBack();
	},


	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
//	onBeforeRendering: function() {

//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
	onAfterRendering: function() {




	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
//	onExit: function() {

//	}

});
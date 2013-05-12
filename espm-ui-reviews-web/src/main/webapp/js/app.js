/**
 * app.js
 * 
 * main application script - include required modules - instantiate localization model - init main shell view -
 * instantiate main product model
 */

jQuery.sap.registerModulePath('app', 'js');

jQuery.sap.require("app.config");
jQuery.sap.require("app.utility");

// Internationalization: Create global i18n resource bundle for texts in application UI
sap.app.i18n = new sap.ui.model.resource.ResourceModel({
	bundleUrl : "i18n/i18n.properties",
	locale : sap.ui.getCore().getConfiguration().getLanguage()
});
sap.ui.getCore().setModel(sap.app.i18n, "i18n");

// create global i18n resource bundle for country names
sap.app.countryBundle = jQuery.sap.resources({
	url : "i18n/countries.properties",
	locale : sap.ui.getCore().getConfiguration().getLanguage()
});

// instantiate initial view with a shell
sap.ui.localResources(sap.app.config.viewNamespace);
var oMainView = sap.ui.view({
	id : "main-shell",
	viewName : "espm-ui-reviews-web.main",
	type : sap.ui.core.mvc.ViewType.JS
});

// get OData Model from server, using JSON format
sap.app.odatamodel = new sap.ui.model.odata.ODataModel("proxy/" + sap.app.utility.getBackendDestination(), true);

// ensure that CSRF token is not taken from cache
sap.app.odatamodel.refreshSecurityToken();

// set model to core
sap.ui.getCore().setModel(sap.app.odatamodel);

// get categories from OData model and transfer it in readCategoriesSuccess into a json model to add an the additional
// category entry 'All Categories' which is not available in a OData model
sap.app.odatamodel.read("/ProductCategories", null, null, false, sap.app.readOdata.readCategoriesSuccess,
		sap.app.readOdata.readError);

// get extension business data (product reviews related data)
sap.app.extensionodatamodel = new sap.ui.model.odata.ODataModel("proxy/"
		+ sap.app.utility.getExtensionBackendDestination());

// set model to core as extensionodatamodel
sap.ui.getCore().setModel(sap.app.extensionodatamodel, "extensionodatamodel");

oMainView.placeAt("content");
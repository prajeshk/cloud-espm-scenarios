/** config.js
 *
 *  holds all configurable properties
 */

jQuery.sap.declare("sap.app.config");

sap.app.config = {
	// If 'true' OData service connected to ABAP Backend is used. Otherwise HANA Cloud is used.
	useAbapBackend: false,

	// If 'true' welcome dialog is displayed
	displayWelcomeDialog : true,

	abapImagesBaseUrl : "",
	cloudImagesBaseUrl : "/espm-model-web/images/",

	// backend details used in settings and for odata service Url links. Keep this data in sync destinations 
	// see destinations/cloudbackend
	cloudOdataServiceUrl : "https://webcloudmodelespmhana.hana.ondemand.com/espm-model-web/jpa.svc",
	// see destinations/abapbackend
	abapOdataServiceUrlWithLogin : "http://ESPM_TEST:Espm1234@54.225.119.138:50000/sap/opu/odata/IWBEP/EPM_DEVELOPER_SCENARIO_SRV/",

	// for settings dialog
	displayAbapOdataServiceUrl : "http://54.225.119.138:50000/sap/opu/odata/IWBEP/EPM_DEVELOPER_SCENARIO_SRV/",
	displayAbapUser : "ESPM_TEST",
	displayAbapPassword : "Espm1234",

	// local JSON model provides customer, items and order for write access
	orderModelUrl: "data/order.json",

	// local JSON model provides countries for address data
	countriesModelUrl : "data/countries.json",

	productPlaceholderImg: "images/placeholder.product.150x150.png",
	// Symbol for Euro
	currencySymbol: "\u20AC",
	// Placeholder with Euro Symbol
	currencyFormat: "%1 \u20AC",
	currencyName: "Euro",
	// location (namespace) for views within an application
	viewNamespace: "espm-ui-shopping-web",
	// maximum number of rows to be displayed before a paging is available
	productsNumRows: 100,
	categoriesNumRows: 50,

	messageDuration: 8000

};

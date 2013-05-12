jQuery.sap.declare("sap.app.config");

sap.app.config = {
	// location where views of the web application are located
	viewNamespace : "espm-ui-reviews-web",

	// If 'true' OData service connected to ABAP Backend is used. Otherwise HANA Cloud is used.
	useAbapBackend : true,

	// If 'true' data source information is displayed in 'Select a Product' area (Abap or HANA Cloud) and 
	// 'Customer reviews of selected product' area
	displayDataSourceInfo : true,

	// backend details used in settings and for odata service Url links. Keep this data in sync destinations 
	// see destinations/cloudextensionbackend
	cloudExtentionOdataServiceUrl : "https://webcloudmodelextespmhana.hana.ondemand.com/espm-model-extension-web/espm.svc",
	// see destinations/cloudbackend
	cloudOdataServiceUrl : "https://webcloudmodelespmhana.hana.ondemand.com/espm-model-web/jpa.svc",

	// see destinations/abapbackend
	abapOdataServiceUrlWithLogin : "http://ESPM_TEST:Espm1234@54.225.119.138:50000/sap/opu/odata/IWBEP/EPM_DEVELOPER_SCENARIO_SRV/",

	// for settings dialog
	displayAbapOdataServiceUrl : "http://54.225.119.138:50000/sap/opu/odata/IWBEP/EPM_DEVELOPER_SCENARIO_SRV/",
	displayAbapUser : "ESPM_TEST",
	displayAbapPassword : "Espm1234",

	abapImagesBaseUrl : "",
	cloudImagesBaseUrl : "/espm-model-web/images/",

	productPlaceholderImg : "images/placeholder.product.150x150.png",
};

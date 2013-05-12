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
	abapOdataServiceUrlWithLogin : "http://EPM_TEST:Epm12345@ldcigiq.wdf.sap.corp:50015/sap/opu/odata/IWBEP/EPM_DEVELOPER_SCENARIO_SRV/",

	// for settings dialog
	displayAbapOdataServiceUrl : "http://ldcigiq.wdf.sap.corp:50015/sap/opu/odata/IWBEP/EPM_DEVELOPER_SCENARIO_SRV/",
	displayAbapUser : "EPM_TEST",
	displayAbapPassword : "Epm12345",

};

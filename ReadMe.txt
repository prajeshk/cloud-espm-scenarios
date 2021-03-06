Table of Contents
=================
1.  Import and Build ESPM Projects
1.1   How to import 'espm' projects into Eclipse IDE
1.2   How to build 'espm' projects
2.  ESPM Ui Web and Mobile Projects
2.1   How to run ESPM Ui Web applications on local server
2.2   How to run ESPM Ui Web applications on HANA Cloud
2.3   How to run ESPM Ui Mobile applications on local server
2.4   How to run ESPM Ui Mobile applications on SAP HANA Cloud
2.5   Ui Integration tests
3.  ESPM Model Extension Projects
3.1   How to run espm-model-extension-web OData integration test
3.2   How to run 'espm-model-extension-web' on SAP HANA Cloud local runtime
3.3   How to run 'espm-model-extension-web' on SAP HANA Cloud


1. Import and Build ESPM Projects
=================================

1.1 How to import 'espm' projects into Eclipse IDE
--------------------------------------------------
1.1.1 Prerequisite
   * Make sure that you have installed a Chrome Web Browser.
     Only this Browser will render the SAPUI5 mobile web application in a reasonable way
   * For running the automated Ui Integration tests (see section 2.3) make sure that you have installed a Firefox Web Browser.
   * Make sure that you have installed a development environment as described in chapter 1. of
     http://www.sdn.sap.com/irj/scn/index?rid=/library/uuid/8016f858-369d-3010-1f9c-9402c4ecad3f
   * Clone https://github.com/SAP/cloud-espm-scenarios and check out master branch

1.1.2 Import as Maven project
   * Configure espm/pom.xml
     - Only in case you work in a network with a proxy:
       Make sure that properties 'proxy.host' and 'proxy.port' are set correctly. Default is 'proxy' and '8080' 
     - Make sure that properties 'sap.cloud.sdk.version' and(!) 'sap.cloud.sdk.path' corresponds to the version and
       location of the sdk you downloaded before 
     - Make sure that property 'eclipse.path' corresponds to the location where installed your eclipse
     - Make sure that properties 'sap.cloud.ui5.version' is set to the value of the SAPUI5 runtime you downloaded with
       the Hana Cloud Tools in the Prerequisites as follows
       To find this value navigate to <eclipse.path>/plugins and find the SAPUI5 core plugin com.sap.ui5.core_<VERSION>.jar. 
       The <VERSION> is the value you have to use
     - Make sure that property 'persistence.osgi.hdb.platform.version' is set to the correct value as follows 
       To find this value navigate to <sap.cloud.sdk.path>/repository/plugins and find the plugin com.sap.core.persistence.osgi.hdb.platform_<VERSiON>.jar. 
       The <VERSION> is the value you have to use
   * Import the espm/pom.xml root pom as "Existing Maven projects" into your Eclipse workspace
     imported projects:
      |- espm
      |- espm-mobile-shopping-web.
      |- espm-model-extension-jpa
      |- espm-model-extension-web
      |- espm-ui-reviews-web
      |- espm-ui-shopping-web

1.2 How to build 'espm' projects
--------------------------------
1. Select espm/pom.xml and choose "Run as..." > Maven build...
2. In the opened 'Edit Configuration' dialog enter 'clean install' in the Goals field.
3. Choose run to start the Maven build


2. ESPM Ui Web and Mobile Projects
==================================

2.1 How to run ESPM Ui Web applications on local server
-------------------------------------------------------
2.1.1 Backend configurations
(this is optional, because the defaults should always work) 

1a Public ABAP backend system (Cloud hosted 'SAP NetWeaver Application Server ABAP 7.4 SP2')
   OData service URL, user and password:
   * See espm/destinations/abapbackend
   Images base URL, user and password:
   * See espm/destinations/abapbackendimages

1b HANA Cloud backend is configured for application 'webcloudmodel' and account 'espmhana':
   OData service:
   * See espm/destinations/cloudbackend
   Images base URL, user and password:
   * See espm/destinations/cloudbackendImages

1c HANA Cloud extension backend is configured for application 'webcloudmodelext' and account 'espmhana':
   OData service:
   * See espm/destinations/cloudextensionbackend

2.1.2 Create and Configure SAP HANA Cloud local runtime
   * On Servers view: New > Server; select SAP > SAP HANA Cloud local runtime; 
   * Choose Next > If necessary you can specify an 'HTTP port'. By default it is 8080 (if no other server is already using this port)
   * Choose Finish
   * Double-click on newly created server node to open server editor; click 'Open launch configuration'
   * If you are working behind a company firewall you might need to set a network proxy to access the internet.
     If you don't have a network proxy skip the 'Set Network Proxy' steps.
     Set Network Proxy steps:
     - Add the following string as vm Arguments on Arguments tab
       -Dhttp.proxyHost=proxy -Dhttp.proxyPort=8080 -Dhttps.proxyHost=proxy -Dhttps.proxyPort=8080 -Dhttp.nonProxyHosts=*.sap.corp  
     - Confirm configuration dialog with OK
   * (Back) in the server editor: Switch to 'Connectivity' tab
   * Import existing destinations:
     (after each destination import save it and confirm opened dialog to deploy the imported destination to the server)
     i)   espm/destinations/abapbackend
     ii)  espm/destinations/abapbackendimages
     iii) espm/destinations/cloudbackend
     iv)  espm/destinations/cloudbackendimages
     in case of espm-ui-reviews-web import also
     v)   espm/destinations/cloudextensionbackend

2.1.3 Run web application on SAP HANA Cloud local runtime
   * Select project node espm-ui-shopping-web
   * From context menu choose Run As > Run on Server.
   * Choose 'Choose existing server option' and select the before created local server
   * Choose Finish to start up the local server.
   * Browser opens and displays the initial page of the web application (either 'espm-ui-shopping-web' or 'espm-ui-reviews-web')

2.2 How to run ESPM Ui Web applications on HANA Cloud
-----------------------------------------------------

2.2.1 Backend configurations 
(this is optional, because the defaults should always work)

The backend configuration works the same as described above for the local server runtime.

2.2.2 Create and Configure new SAP HANA Cloud server
   * Configure your SAP HANA Cloud Server Eclipse preferences: 'Server' > 'SAP HANA Cloud'
   * On Servers view: New > Server; select option 'Manually define a new server'
   * Select SAP > 'SAP HANA Cloud' and choose Next
   * Specify the parameters for the SAP HANA Cloud Application to be run on the new server 
     (e.g. application: 'webshopping' and account: '<YOUR ACCOUNT NAME>')
   * Choose Finish to create a new server (without any application yet)
   * Double-click on newly created server node to open server editor
   * Switch to connectivity tab
   * Import existing destinations:
     (after each destination import save it and confirm opened dialog to deploy the imported destination to the server)
     i)   espm/destinations/abapbackend
     ii)  espm/destinations/abapbackendimages
     iii) espm/destinations/cloudbackend
     iv)  espm/destinations/cloudbackendimages
     in case of espm-ui-reviews-web import also
     v)   espm/destinations/cloudextensionbackend

2.2.3 Deploy on SAP HANA Cloud
   * Select project node (espm-ui-shopping-web or espm-ui-reviews-web )
   * From context menu choose Run As > Run on Server.
   * Choose 'Choose existing server option' and select the before created local server
   * Choose Finish to start up the local server.
   * Browser opens and displays the initial page of the web application (either 'espm-ui-shopping-web' or 'espm-ui-reviews-web')

   Example: ESPM web application launch Urls (running on SAP HANA Factory landscape)
   webshopping app: https://webshoppingespmhana.hana.ondemand.com/espm-ui-shopping-web/
   webreviews app: https://webreviewsespmhana.hana.ondemand.com/espm-ui-reviews-web/

2.3 How to run ESPM Ui Mobile applications on local server
----------------------------------------------------------------------

2.3.1. Create and Configure new SAP HANA Cloud local runtime
   * On Servers view: New > Server; select SAP > SAP HANA Cloud local runtime; choose Finish
   * Double-click on newly created server node to open server editor; click 'Open launch configuration'
   * Add the following string as vm Arguments on Arguments tab
     -Dhttp.proxyHost=proxy -Dhttp.proxyPort=8080 -Dhttps.proxyHost=proxy -Dhttps.proxyPort=8080 -Dhttp.nonProxyHosts=*.sap.corp  
   * Confirm configuration dialog with OK

2.3.2 Run web application on SAP HANA Cloud local runtime
   * Select 'espm-mobile-shopping-web' project node
   * From context menu choose Run As > Run on Server.
   * Choose 'Choose existing server option' and select the before created local server
   * Choose Finish to start up the local server.
   * Browser (use only Chrome Web Browser as mentioned in the above Prerequisite) opens and displays the initial page
     of espm mobile application
   * Add ?sap-ui-xx-fakeOS=ios (or =android or =blackberry) to simulate the corresponding device appearance
     Example Url: http://localhost:8080/espm-mobile-shopping-web/?sap-ui-xx-fakeOS=ios

2.4 How to run ESPM Ui Mobile applications on SAP HANA Cloud
------------------------------------------------------------------------
analogous to 2.2

2.5 Ui Integration tests
------------------------
2.5.1 Automated Selenium Ui Test
   0.  The Selenium UI test for Web Shopping Application is defined in EspmShoppingWebUiIT.java and for Web Reviews Application
       in CustomerReviewsIT.java
   1.  Run Selenium UI test as part of Maven build (Automated Test)
       Maven Run Configuration:
         - Goals: value depends on network proxy 
             i)  Network with proxy: 'verify -Dlocal.integration.tests' 
             ii) Network without proxy: 'verify -Dlocal.integration.tests -D local.integration.tests -Dlocal.server.proxy.settings= -Dbrowser.proxy.settings=' 
         - Parameters:
           * [optional] integration.test.server.url: http://localhost:9080 (this is the default value)
           * [optional] integration.test.application.relpath: /espm-ui-shopping-web or /espm-ui-reviews-web (this is the default value) 
   2. Run Selenium UI test manually from Eclipse (this allows also to debug the Ui integratin tests, just use 'Debug As')
        - 1. Create a local test server with port 9080(!) as described in '2.1.2 Create and Configure SAP HANA Cloud local runtime' 
        - 2. Run 'espm-ui-shopping-web' or 'espm-ui-reviews-web' as described 2.1.3 Run web application on SAP HANA Cloud local runtime. 
        - 3. Create and Run new JUnit Run configuration
             - First select 'JUnit 4' as Testrunner (default is JUnit 3 which does not work) 
             - Project: espm-ui-shopping-web or espm-ui-reviews-web
             - Testclass: com.sap.espm.shopping.web.EspmShoppingWebUiIT or com.sap.espm.ui.reviews.web.CustomerReviewsIT (in case of espm-ui-reviews-web)
             - [optional] -Dintegration.test.server.url=http://localhost:9080 (this is the default value)
             - [optional] -Dintegration.test.application.relpath=/espm-ui-shopping-web or /espm-ui-reviews-web (this is the default value)
             - Run configured JUnit test

3.  ESPM Model Extension Projects
=================================
3.1 How to run espm-model-extension-web OData integration test
--------------------------------------------------------------
   Odata Integration Tests are disabled by default. To execute odata integration test during the build activate the profile local-integration-tests. 
   This can done by running maven build (see section 1.2) with additional configuration
   - Parameters:
      * local.integration.tests: true

3.2 How to run 'espm-model-extension-web' on SAP HANA Cloud local runtime
-------------------------------------------------------------------------
   * Select project node 'espm-model-extension-web'
   * From context menu choose Run As > Run on Server.
   * On Servers view: Choose 'Manually define a new server' option and select SAP > SAP HANA Cloud local runtime as server type
   * Choose Finish to start up the local server.
   * Browser opens and launches the base URL of the OData service of the espm-model-extension-web application
     http://localhost:8080/espm-model-extension-web/espm.svc (if the default port 8080 was free when creating the local server)
     OData Service example URL to retrieve the list of CustomerReview stored initially in the database of espm-model-extension:
     Confirm that http://localhost:8080/espm-model-extension-web/espm.svc/CustomerReviews results in a list of Customer Reviews

3.3 How to run 'espm-model-extension-web' on SAP HANA Cloud
-----------------------------------------------------------

3.3.1 Create a new SAP HANA Cloud server
   * Configure your SAP HANA Cloud Server Eclipse preferences: 'Server' > 'SAP HANA Cloud'
   * On Servers view: New > Server; select option 'Manually define a new server'
   * Select SAP > 'SAP HANA Cloud' and choose Next
   * Specify the parameters for the SAP HANA Cloud Application to be run on the new server 
     (e.g. application: 'webextensionmodel' and account: '<YOUR ACCOUNT NAME>')
   * Choose Finish to create a new server (without any application yet)

3.3.2 Deploy on SAP HANA Cloud
   * Select project node 'espm-model-extension-web'
   * From context menu choose Run As > Run on Server.
   * Choose 'Choose existing server option' and select the before created local server
   * Choose Finish to start up the local server.
   * Browser opens and displays the initial page of the 'espm-model-extension-web' application

   Example launch URLs: 
   * ESPM model web application URL which launches the OData extension service (running on SAP HANA Factory landscape)
   webcloudmodelext app: https://webcloudmodelextespmhana.hana.ondemand.com/espm-model-extension-web/espm.svc
   * Launch model extension service to display the available customer reviews:
   https://webcloudmodelextespmhana.hana.ondemand.com/espm-model-extension-web/espm.svc/CustomerReviews

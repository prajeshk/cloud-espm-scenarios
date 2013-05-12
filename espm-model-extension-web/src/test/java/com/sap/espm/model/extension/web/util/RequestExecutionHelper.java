package com.sap.espm.model.extension.web.util;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

/**
 * 
 * Test hepler class
 * 
 */
public class RequestExecutionHelper {

	private RequestExecutionHelper() {

	}

	private static final String ESPM_SERVICE_BASE_URI = "/espm-model-extension-web/espm.svc/";
	private static final String INTEGRATION_TEST_SERVER_URL = "integration.test.server.url";
	private static final String SERVICE_ROOT_URI = System
			.getProperty(INTEGRATION_TEST_SERVER_URL) + ESPM_SERVICE_BASE_URI;

	/**
	 * Run a http et request
	 * 
	 * @param serviceEndPoint
	 * @return http response
	 * @throws IOException
	 */
	public static HttpResponse executeGetRequest(String serviceEndPoint)
			throws IOException {
		URL url = new URL(SERVICE_ROOT_URI + serviceEndPoint);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		try {
			return new HttpResponse(connection);
		} finally {
			connection.disconnect();
		}
	}

	/**
	 * Run a http post request
	 * 
	 * @param entityName
	 * @param body
	 * @return http response
	 * @throws MalformedURLException
	 * @throws IOException
	 * @throws ProtocolException
	 */
	public static HttpResponse executePostRequest(String entityName, String body)
			throws MalformedURLException, IOException, ProtocolException {
		URL url = new URL(SERVICE_ROOT_URI + entityName);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		try {
			connection.setRequestMethod("POST");
			connection.setDoInput(true);
			connection.setDoOutput(true);
			connection.setUseCaches(false);
			connection.setRequestProperty("Content-Type",
					"application/atom+xml");
			DataOutputStream outStream = new DataOutputStream(
					connection.getOutputStream());
			try {
				outStream.writeBytes(body);
				outStream.close();
				return new HttpResponse(connection);
			} finally {
				outStream.close();
			}
		} finally {
			connection.disconnect();
		}
	}

}

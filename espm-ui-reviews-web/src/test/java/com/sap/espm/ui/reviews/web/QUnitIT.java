package com.sap.espm.ui.reviews.web;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.net.MalformedURLException;

import org.junit.Test;

import com.sap.espm.ui.reviews.web.pageobjects.QUnitPage;

public class QUnitIT extends UiTestBase {

	@Test
	public void testReadExtensionOData() throws Exception {
		runTest(new File("src/test/js/readExtensionOData.html"));
	}

	private void runTest(final File testFile) throws MalformedURLException {
		runTest(testFile.toURI().toURL().toExternalForm());
	}

	private void runTest(final String testPath) {
		driver.get(testPath);
		final QUnitPage page = QUnitPage.create(driver);
		assertTrue("Total number of tests shall be greater than 0",
				page.getTotal() > 0);
		assertThat(
				"Number of passed tests shall be equal to total number of tests",
				page.getPassed(), is(page.getTotal()));
	}
}
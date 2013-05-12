package com.sap.espm.model.extension.web;

import javax.persistence.EntityManagerFactory;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.sap.espm.model.extension.data.DataLoader;

/**
 * The StartupServlet loads initial data.
 */
public class StartupServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static EntityManagerFactory emf;

	/**
	 * Retrieves the JPA entity manager factory and loads initial data into the
	 * ESPM model tables.
	 */
	@Override
	public void init() throws ServletException {
		try {
			emf = JpaEntityManagerFactory.getEntityManagerFactory();
			DataLoader loader = new DataLoader(emf);
			loader.loadData();
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

	/**
	 * Closes the JPA entity manager factory.
	 */
	@Override
	public void destroy() {
		emf.close();
	}
}

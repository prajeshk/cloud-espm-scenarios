package com.sap.espm.model.extension.web;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.sql.DataSource;

import org.eclipse.persistence.config.PersistenceUnitProperties;

/**
 * Handles the singleton EntityManagerFactory instance.
 */
public class JpaEntityManagerFactory {

	public static final String DATA_SOURCE_NAME = "java:comp/env/jdbc/DefaultDB";
	public static final String PERSISTENCE_UNIT_NAME = "com.sap.espm.model.extension";
	public static final String HANADB_PLATFORM = "com.sap.persistence.platform.database.HDBPlatform";
	public static final String HANADB_PRODUCT_NAME = "HDB";

	private static EntityManagerFactory entityManagerFactory = null;

	/**
	 * Returns the singleton EntityManagerFactory instance for accessing the
	 * default database.
	 * 
	 * @return the singleton EntityManagerFactory instance
	 * @throws NamingException
	 *             if a naming exception occurs during initialization
	 * @throws SQLException
	 *             if a database occurs during initialization
	 */
	public static synchronized EntityManagerFactory getEntityManagerFactory()
			throws NamingException, SQLException {
		if (entityManagerFactory == null) {
			InitialContext ctx = new InitialContext();
			DataSource ds = (DataSource) ctx.lookup(DATA_SOURCE_NAME);
			Map<String, Object> properties = new HashMap<String, Object>();
			properties.put(PersistenceUnitProperties.NON_JTA_DATASOURCE, ds);
			adaptHanaDB(properties, ds);
			entityManagerFactory = Persistence.createEntityManagerFactory(
					PERSISTENCE_UNIT_NAME, properties);
		}
		return entityManagerFactory;
	}

	/**
	 * Includes HANA persistence unit properties if database is HANA.
	 * 
	 * @param properties
	 *            HANA DB properties
	 * @param dataSource
	 *            Database
	 * @throws SQLException
	 * @throws NamingException
	 */
	private static void adaptHanaDB(Map<String, Object> properties,
			DataSource dataSource) throws SQLException {
		Connection connection = dataSource.getConnection();
		try {
			if (isHanaDB(connection)) {
				properties.put(PersistenceUnitProperties.TARGET_DATABASE,
						HANADB_PLATFORM);
			}
		} finally {
			connection.close();
		}
	}

	/**
	 * Check if cloud database is HANA
	 * 
	 * @param connection
	 *            Database connection
	 * @return true if cloud database is HANA
	 * @throws SQLException
	 */
	private static boolean isHanaDB(Connection connection) throws SQLException {
		return (connection.getMetaData().getDatabaseProductName()
				.equals(HANADB_PRODUCT_NAME)) ? true : false;
	}
}

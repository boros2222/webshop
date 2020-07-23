package eu.borostack.config;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Startup
@Singleton
public class AppConfig {

    private static final Log LOG = LogFactory.getLog(AppConfig.class);

    private static byte[] jwtKey = null;

    @PostConstruct
    private void loadProperties() {
        final String fileName = System.getProperty("jboss.server.config.dir") + "/btwsbe.properties";
        try {
            final InputStream input = new FileInputStream(fileName);
            final Properties properties = new Properties();
            properties.load(input);
            properties.forEach((key, value) -> System.setProperty((String) key, (String) value));
            LOG.info("CONFIG LOADED SUCCESSFULLY!");
        } catch (final IOException exception) {
            exception.printStackTrace();
            LOG.error("LOADING CONFIG FAILED!");
        }
    }

    public static byte[] getJwtKey() {
        if (jwtKey == null) {
            jwtKey = System.getProperty("jwtkey").getBytes();
        }
        return jwtKey;
    }
}

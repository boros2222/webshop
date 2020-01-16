package eu.borostack.config;

import com.google.common.primitives.Bytes;

import javax.enterprise.context.ApplicationScoped;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class AppConfig {

    private static byte[] jwtKey = null;

    public static byte[] getJwtKey() {
        if (jwtKey == null) {
            String propertyValue = System.getProperty("jwtkey");
            List<String> keyAsStringList = Arrays.asList(propertyValue.split(","));
            List<Byte> keyAsByteList = keyAsStringList.stream().map(Byte::parseByte).collect(Collectors.toList());
            jwtKey = Bytes.toArray(keyAsByteList);
        }

        return jwtKey;
    }

    public static String getFrontendUrl() {
        return System.getProperty("frontendurl");
    }
}

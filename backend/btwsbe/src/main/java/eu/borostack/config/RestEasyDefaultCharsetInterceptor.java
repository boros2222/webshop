package eu.borostack.config;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.ext.Provider;
import javax.ws.rs.ext.ReaderInterceptor;
import javax.ws.rs.ext.ReaderInterceptorContext;
import java.io.IOException;

@Provider
public class RestEasyDefaultCharsetInterceptor implements ReaderInterceptor {

    // Using string value instead of constant to limit references to RestEasy (this should be possible to set through web.xml imo)
    // private static final String RESTEASY_DEFAULT_CHARSET_PROPERTY = org.jboss.resteasy.plugins.providers.multipart.InputPart.DEFAULT_CHARSET_PROPERTY;
    private static final String RESTEASY_DEFAULT_CHARSET_PROPERTY = "resteasy.provider.multipart.inputpart.defaultCharset";

    @Override
    public Object aroundReadFrom(ReaderInterceptorContext context) throws IOException, WebApplicationException {
        context.setProperty(RESTEASY_DEFAULT_CHARSET_PROPERTY, "UTF-8");
        return context.proceed();
    }
}

package eu.borostack.config;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class CORSFilter implements ContainerResponseFilter {

    @Override
    public void filter(final ContainerRequestContext requestContext, final ContainerResponseContext responseContext) throws IOException {

        responseContext.getHeaders().putSingle("Access-Control-Allow-Origin", /*AppConfig.getFrontendUrl()*/ "*");
        responseContext.getHeaders().putSingle("Access-Control-Allow-Credentials", true);
        responseContext.getHeaders().putSingle("Access-Control-Allow-Headers", "*");
        responseContext.getHeaders().putSingle("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        String reqHeader = requestContext.getHeaderString("Access-Control-Request-Headers");
        if (reqHeader != null && !reqHeader.equals("")) {
            responseContext.getHeaders().putSingle("Access-Control-Allow-Headers", reqHeader);
        }
    }
}
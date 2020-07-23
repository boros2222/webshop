package eu.borostack.rest;

import javax.ejb.Stateless;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("api")
@Stateless
public class RestConfig extends Application {
}

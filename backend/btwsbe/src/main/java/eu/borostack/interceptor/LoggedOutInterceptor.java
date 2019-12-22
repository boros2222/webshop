package eu.borostack.interceptor;

import eu.borostack.annotation.LoggedOut;
import eu.borostack.service.AuthenticationService;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.core.NewCookie;

@LoggedOut
@Interceptor
public class LoggedOutInterceptor {

    @Inject
    private AuthenticationService authenticationService;

    @LoggedOut
    @AroundInvoke
    public Object noAuthorization(InvocationContext context) throws Exception {
        final NewCookie newAuthCookie = authenticationService.authorize(null, null);

        if (newAuthCookie == null) {
            return context.proceed();
        } else {
            return ResponseFactory.createMessageResponse("Ez a funkció nem használható bejelentkezve!", true, 400);
        }
    }
}

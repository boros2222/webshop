package eu.borostack.interceptor;

import eu.borostack.annotation.WithoutAuth;
import eu.borostack.entity.ResponseJson;
import eu.borostack.service.AuthenticationService;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

@WithoutAuth
@Interceptor
public class WithoutAuthInterceptor {

    @Inject
    private AuthenticationService authenticationService;

    @WithoutAuth
    @AroundInvoke
    public Object noAuthorization(InvocationContext context) throws Exception {
        final NewCookie newAuthCookie = authenticationService.authorize();

        if (newAuthCookie == null) {
            return context.proceed();
        } else {
            return Response.ok(new ResponseJson("Ez a funkció nem használható bejelentkezve!", true))
                    .status(400)
                    .build();
        }
    }
}

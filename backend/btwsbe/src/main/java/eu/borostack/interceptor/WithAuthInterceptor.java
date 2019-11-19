package eu.borostack.interceptor;

import eu.borostack.annotation.WithAuth;
import eu.borostack.entity.ResponseJson;
import eu.borostack.service.AuthenticationService;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

@WithAuth
@Interceptor
public class WithAuthInterceptor {

    @Inject
    private AuthenticationService authenticationService;

    @WithAuth
    @AroundInvoke
    public Object authorization(InvocationContext context) throws Exception {
        final NewCookie newAuthCookie = authenticationService.authorize();

        if (newAuthCookie != null) {
            Response response = (Response) context.proceed();
            return Response.fromResponse(response)
                    .cookie(newAuthCookie)
                    .build();
        } else {
            return Response.ok(new ResponseJson("Nincs jogosultság a megtekintéshez!", true))
                    .status(401)
                    .build();
        }
    }
}

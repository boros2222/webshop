package eu.borostack.interceptor;

import eu.borostack.annotation.CheckUserId;
import eu.borostack.annotation.LoggedIn;
import eu.borostack.entity.Role;
import eu.borostack.service.AuthenticationService;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.List;

@LoggedIn
@Interceptor
public class LoggedInInterceptor {

    @Inject
    private AuthenticationService authenticationService;

    @LoggedIn
    @AroundInvoke
    public Object authorization(InvocationContext context) throws Exception {
        final LoggedIn authAnnotation = context.getMethod().getAnnotation(LoggedIn.class);
        List<Role> roles = Arrays.asList(authAnnotation.roles());
        Long userAccountId = getUserAccountId(context);
        final NewCookie newAuthCookie = authenticationService.authorize(roles, userAccountId);

        if (newAuthCookie != null) {
            return ResponseFactory.createResponse((Response) context.proceed(), newAuthCookie);
        } else {
            return ResponseFactory.createMessageResponse("Nincs jogosultság a megtekintéshez!", true, 401);
        }
    }

    private Long getUserAccountId(InvocationContext context) {
        Annotation[][] parameterAnnotations = context.getMethod().getParameterAnnotations();
        Object[] parameters = context.getParameters();
        int i = 0;
        for (Annotation[] annotations : parameterAnnotations) {
            Object parameter = parameters[i++];
            for (Annotation annotation : annotations) {
                if (annotation instanceof CheckUserId && parameter instanceof Long) {
                    return (Long) parameter;
                }
            }
        }
        return null;
    }
}

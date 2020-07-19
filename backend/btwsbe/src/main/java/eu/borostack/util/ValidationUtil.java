package eu.borostack.util;

import javax.enterprise.context.ApplicationScoped;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

@ApplicationScoped
public class ValidationUtil {

    public static <T> Set<ConstraintViolation<T>> validate(T entity) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        return validator.validate(entity);
    }
}

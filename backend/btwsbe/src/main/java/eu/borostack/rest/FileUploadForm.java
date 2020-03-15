package eu.borostack.rest;

import lombok.Getter;
import lombok.Setter;
import org.jboss.resteasy.annotations.jaxrs.FormParam;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import java.io.InputStream;

@Getter
@Setter
public class FileUploadForm {

    @FormParam("fileData")
    @PartType("application/octet-stream")
    private InputStream fileData;
}

package eu.borostack.rest;

import com.fasterxml.uuid.Generators;
import com.github.sardine.Sardine;
import com.github.sardine.SardineFactory;
import eu.borostack.annotation.LoggedIn;
import eu.borostack.entity.Role;
import eu.borostack.util.ResponseFactory;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;

@Path("file")
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
@Produces(MediaType.APPLICATION_JSON)
public class FileUploadRest {

    @POST
    @Path("upload")
    @LoggedIn(roles = { Role.ADMIN })
    public Response uploadFile(final InputStream stream) {
        if (stream == null) {
            return ResponseFactory.createMessageResponse("Nincs fájl!", true, 400);
        }
        final String fileName = Generators.timeBasedGenerator().generate().toString();
        final String url = System.getProperty("davurl") + fileName;
        try {
            Sardine sardine = SardineFactory.begin(System.getProperty("davuser"), System.getProperty("davpassword"));
            sardine.put(url, stream);
            return ResponseFactory.createMessageResponse(url, false);
        } catch (IOException exception) {
            exception.printStackTrace();
            return ResponseFactory.createMessageResponse("Fájl feltöltése sikertelen!", true, 500);
        }
    }
}

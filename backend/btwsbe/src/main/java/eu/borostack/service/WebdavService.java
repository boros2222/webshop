package eu.borostack.service;

import com.fasterxml.uuid.Generators;
import com.github.sardine.Sardine;
import com.github.sardine.SardineFactory;
import eu.borostack.exception.RestProcessException;
import eu.borostack.util.ResponseFactory;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.io.IOException;
import java.io.InputStream;

@ApplicationScoped
public class WebdavService {

    private Sardine sardine;

    @PostConstruct
    private void init() {
        sardine = SardineFactory.begin(System.getProperty("davuser"), System.getProperty("davpassword"));
    }

    public String uploadFile(final InputStream inputStream) throws RestProcessException {
        if (inputStream == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nincs fájl!", true, 400));
        }
        final String fileName = Generators.timeBasedGenerator().generate().toString();
        final String url = System.getProperty("davurl") + fileName;
        try {
            sardine.put(url, inputStream);
            return url;
        } catch (final IOException exception) {
            exception.printStackTrace();
            throw new RestProcessException(ResponseFactory.createMessageResponse("Fájl feltöltése sikertelen!", true, 500));
        }
    }

    public void deleteFile(final String url) {
        try {
            sardine.delete(url);
        } catch (IOException exception) {
            exception.printStackTrace();
        }
    }
}

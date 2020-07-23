package eu.borostack.service;

import com.fasterxml.uuid.Generators;
import com.github.sardine.Sardine;
import com.github.sardine.impl.SardineImpl;
import eu.borostack.exception.RestProcessException;
import eu.borostack.util.ResponseFactory;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.NoConnectionReuseStrategy;
import org.apache.http.impl.client.HttpClientBuilder;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import java.io.IOException;
import java.io.InputStream;
import java.net.ProxySelector;

@Stateless
public class WebdavService {

    private Sardine sardine;

    @PostConstruct
    private void init() {
        sardine = new SardineImpl(System.getProperty("webdav.user"), System.getProperty("webdav.password")) {
            @Override
            protected HttpClientBuilder configure(ProxySelector selector, CredentialsProvider credentials) {
                return super.configure(selector, credentials)
                        .setConnectionReuseStrategy(NoConnectionReuseStrategy.INSTANCE);
            }
        };
    }

    public String uploadFile(final InputStream inputStream) throws RestProcessException {
        if (inputStream == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nincs fájl!", true, 400));
        }
        final String fileName = Generators.timeBasedGenerator().generate().toString();
        final String url = System.getProperty("webdav.url") + fileName;
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

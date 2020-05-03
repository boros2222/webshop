package eu.borostack.dto;

import eu.borostack.exception.RestProcessException;
import eu.borostack.util.ResponseFactory;
import lombok.Getter;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Getter
public class ProductDto {

    private Long id;

    private String name;

    private String shortDescription;

    private String description;

    private Long price;

    private Long categoryId;

    private List<InputStream> pictures = new ArrayList<>();

    private List<String> existingPictures = new ArrayList<>();

    private ProductDto() {
    }

    public ProductDto(MultipartFormDataInput multipartData) throws RestProcessException {
        try {
            id = multipartData.getFormDataPart("id", Long.class, null);
            name = multipartData.getFormDataPart("name", String.class, null);
            shortDescription = multipartData.getFormDataPart("shortDescription", String.class, null);
            description = multipartData.getFormDataPart("description", String.class, null);
            price = multipartData.getFormDataPart("price", Long.class, null);
            categoryId = multipartData.getFormDataPart("category", Long.class, null);

            final List<InputPart> files = multipartData.getFormDataMap().get("files");
            if (files != null) {
                for (InputPart inputPart : files) {
                    pictures.add(inputPart.getBody(InputStream.class, null));
                }
            }

            final List<InputPart> existingFiles = multipartData.getFormDataMap().get("existingFiles");
            if (existingFiles != null) {
                for (InputPart inputPart : existingFiles) {
                    existingPictures.add(inputPart.getBody(String.class, null));
                }
            }

            if (name == null || shortDescription == null || description == null ||
                    price == null || categoryId == null || (pictures.isEmpty() && existingPictures.isEmpty())) {
                throw new RestProcessException(ResponseFactory.createMessageResponse("Az űrlap nincs teljesen kitöltve!", true, 400));
            }
        } catch (final IOException exception) {
            exception.printStackTrace();
            throw new RestProcessException(ResponseFactory.createMessageResponse("Hiba történt az űrlap feldolgozásakor!", true, 500));
        }
    }
}

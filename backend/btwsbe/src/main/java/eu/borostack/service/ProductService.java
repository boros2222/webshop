package eu.borostack.service;

import eu.borostack.dao.CategoryDao;
import eu.borostack.dao.PictureDao;
import eu.borostack.dao.ProductDao;
import eu.borostack.dto.ProductDto;
import eu.borostack.entity.Category;
import eu.borostack.entity.Picture;
import eu.borostack.entity.Product;
import eu.borostack.entity.SortOrder;
import eu.borostack.exception.RestProcessException;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
public class ProductService {

    @Inject
    private ProductDao productDao;

    @Inject
    private PictureDao pictureDao;

    @Inject
    private CategoryDao categoryDao;

    @Inject
    private WebdavService webdavService;

    public void addNewProduct(final ProductDto productDto) throws RestProcessException {
        final Product product = new Product();
        mapProduct(productDto, product);
        productDao.save(product);
        addNewPicturesToProduct(product, productDto.getPictures());
    }

    public void editProduct(final ProductDto productDto) throws RestProcessException {
        if (productDto.getId() == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nincs megadva termék!", true, 400));
        }
        final Product product = productDao.findById(productDto.getId());
        if (product == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("A termék nem található!", true, 400));
        }
        mapProduct(productDto, product);
        removeUnneededPictures(product.getPictures(), productDto.getExistingPictures());
        productDao.save(product);
        addNewPicturesToProduct(product, productDto.getPictures());
    }

    private void mapProduct(final ProductDto productDto, final Product product) throws RestProcessException {
        final Category category = categoryDao.findById(productDto.getCategoryId());
        if (category == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nem létezik a kategória!", true, 400));
        }
        product.setCategory(category);
        product.setName(productDto.getName());
        product.setShortDescription(productDto.getShortDescription());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
    }

    private void addNewPicturesToProduct(final Product product, final List<InputStream> inputStreamList) throws RestProcessException {
        for (final InputStream inputStream : inputStreamList) {
            final String path = webdavService.uploadFile(inputStream);
            final Picture picture = new Picture();
            picture.setPath(path);
            picture.setProduct(product);
            pictureDao.save(picture);
        }
    }

    private void removeUnneededPictures(final List<Picture> existingPictures, final List<String> neededPicturePathList) {
        List<Picture> unneededPictures = existingPictures.stream()
                .filter(picture -> !neededPicturePathList.contains(picture.getPath()))
                .collect(Collectors.toList());
        existingPictures.removeAll(unneededPictures);
        unneededPictures.forEach(picture -> webdavService.deleteFile(picture.getPath()));
    }

    public void deleteProduct(final Long productId) throws RestProcessException {
        if (productId == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nincs megadva termék!", true, 400));
        }
        final Product product = productDao.findById(productId);
        if (product == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("A termék nem található!", true, 400));
        }
        product.setDeleted(true);
        productDao.save(product);
    }

    public List<Product> findAllWithOffsetAndLimit(final Long offset, final Long limit, final SortOrder sortOrder) {
        return productDao.findAllWithOffsetAndLimit(offset, limit, sortOrder);
    }

    public List<Product> findAllBySearchWithOffsetAndLimit(final String searchTerm, final Long offset,
                                                           final Long limit, final SortOrder sortOrder) {
        return productDao.findAllBySearchWithOffsetAndLimit(searchTerm, offset, limit, sortOrder);
    }

    public List<Product> findAllByCategoryIdWithOffsetAndLimit(final Long categoryId, final Long offset,
                                                               final Long limit, final SortOrder sortOrder) {
        return productDao.findAllByCategoryIdWithOffsetAndLimit(categoryId, offset, limit, sortOrder);
    }

    public Product create(Product product) {
        return productDao.create(product);
    }

    public Product update(Product product) {
        return productDao.update(product);
    }

    public Product findById(Long id) {
        return productDao.findById(id);
    }

    public List<Product> findAll() {
        return productDao.findAll();
    }
}

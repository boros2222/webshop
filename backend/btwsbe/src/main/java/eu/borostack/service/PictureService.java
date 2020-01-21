package eu.borostack.service;

import eu.borostack.dao.PictureDao;
import eu.borostack.entity.Picture;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class PictureService {

    @Inject
    private PictureDao pictureDao;

    public Picture save(Picture picture) {
        return pictureDao.save(picture);
    }

    public Picture create(Picture picture) {
        return pictureDao.create(picture);
    }

    public Picture update(Picture picture) {
        return pictureDao.update(picture);
    }

    public Picture findById(Long id) {
        return pictureDao.findById(id);
    }

    public List<Picture> findAll() {
        return pictureDao.findAll();
    }
}

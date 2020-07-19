package eu.borostack.dao;

import eu.borostack.entity.Picture;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Transactional
@ApplicationScoped
public class PictureDao extends GenericDao<Long, Picture> {

    public PictureDao() {
        super(Picture.class);
    }
}
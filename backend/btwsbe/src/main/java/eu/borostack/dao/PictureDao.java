package eu.borostack.dao;

import eu.borostack.entity.Picture;

import javax.transaction.Transactional;

@Transactional
public class PictureDao extends GenericDao<Long, Picture> {

    public PictureDao() {
        super(Picture.class);
    }
}
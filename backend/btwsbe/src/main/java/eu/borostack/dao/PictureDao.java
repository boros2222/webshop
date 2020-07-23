package eu.borostack.dao;

import eu.borostack.entity.Picture;

import javax.ejb.Stateless;
import javax.transaction.Transactional;

@Stateless
@Transactional
public class PictureDao extends GenericDao<Long, Picture> {

    public PictureDao() {
        super(Picture.class);
    }
}
-- termékkategóriák
insert into category (id, name)
values (nextval('s_category'), 'Telefonok'),
       (nextval('s_category'), 'TV-k és monitorok'),
       (nextval('s_category'), 'Audio'),
       (nextval('s_category'), 'Számítástechnika'),
       (nextval('s_category'), 'Videózás és optika'),
       (nextval('s_category'), 'Háztartási gépek'),
       (nextval('s_category'), 'Barkács- és kertfelszerelés'),
       (nextval('s_category'), 'Szépségápolás'),
       (nextval('s_category'), 'Sport és szabadidő'),
       (nextval('s_category'), 'Otthon és bútorok'),
       (nextval('s_category'), 'Könyvek');

-- termékek (Telefonok)
DO $$
<<termekfeltoltes>>
DECLARE
    cat_id integer := (select id from category where name = 'Telefonok');
BEGIN
    insert into product (id, name, description, price, category_id)
    values (nextval('s_product'),
            'Zamzong Galaksy S28',
            '- 8 inches kijelző\n- 16 GB RAM\n- Androed 17 operációs rendszer',
            269990,
            cat_id),
           (nextval('s_product'),
            'Howei P88',
            '- 7.6 inches kijelző\n- 8 GB RAM\n- Androed 16 operációs rendszer',
            239990,
            cat_id),
           (nextval('s_product'),
            'Nokie 11',
            '- 6.1 inches kijelző\n- 4 GB RAM\n- Androed 14 operációs rendszer',
            156990,
            cat_id);
END termekfeltoltes $$;

-- termékek (TV-k és monitorok)
DO $$
    <<termekfeltoltes>>
        DECLARE
        cat_id integer := (select id from category where name = 'TV-k és monitorok');
    BEGIN
        insert into product (id, name, description, price, category_id)
        values (nextval('s_product'),
                'Zamzong LED TV',
                '- 67 inches kijelző\n- OLED technológia\n- okostelevízió',
                219990,
                cat_id),
               (nextval('s_product'),
                'ELDZSI K27M monitor',
                '- 27 inches kijelző\n- IPS panel\n- vékony kávák',
                135990,
                cat_id);
END termekfeltoltes $$;

-- termékek (Audio)
DO $$
    <<termekfeltoltes>>
        DECLARE
        cat_id integer := (select id from category where name = 'Audio');
    BEGIN
        insert into product (id, name, description, price, category_id)
        values (nextval('s_product'),
                'Edifior C68 hangfal',
                '- hangszórók átmérője: 8cm\n- frekvenciasáv: 20Hz-200kHz\n',
                67490,
                cat_id);
END termekfeltoltes $$;

-- termékek (Számítástechnika)
DO $$
    <<termekfeltoltes>>
        DECLARE
        cat_id integer := (select id from category where name = 'Számítástechnika');
    BEGIN
        insert into product (id, name, description, price, category_id)
        values (nextval('s_product'),
                'MecBook Pro',
                '- i11-3210K processzor\n- MecOS operációs rendszer\n- 8GB RAM',
                329990,
                cat_id);
END termekfeltoltes $$;
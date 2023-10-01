-- Generated by Oracle SQL Developer Data Modeler 23.1.0.087.0806
--   at:        2023-08-21 10:47:26 CEST
--   site:      Oracle Database 21c
--   type:      Oracle Database 21c



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE


CREATE TABLE auteur (
    aid    CHAR(240) NOT NULL,
    prenom VARCHAR2(240) NOT NULL,
    nom    VARCHAR2(240) NOT NULL
);

ALTER TABLE auteur ADD CONSTRAINT auteur_pk PRIMARY KEY ( aid );

CREATE TABLE emprunt (
    eid             CHAR(240) NOT NULL,
    dateemprunt     DATE NOT NULL,
    dateretourprevu DATE NOT NULL,
    dateretourreel  DATE,
    utilisateur_uid CHAR(240) NOT NULL,
    statut_sid      CHAR(240) NOT NULL
);

ALTER TABLE emprunt ADD CONSTRAINT emprunt_pk PRIMARY KEY ( eid );

CREATE TABLE emprunt_livre (
    livre_lid   CHAR(240) NOT NULL,
    emprunt_eid CHAR(240) NOT NULL
);

CREATE TABLE livre (
    lid       CHAR(240) NOT NULL,
    titre     VARCHAR2(240) NOT NULL,
    pages     NUMBER,
    lienimage VARCHAR2(4000),
    annee     DATE
);

ALTER TABLE livre ADD CONSTRAINT livre_pk PRIMARY KEY ( lid );

CREATE TABLE livre_auteur (
    livre_lid  CHAR(240) NOT NULL,
    auteur_aid CHAR(240) NOT NULL
);

CREATE TABLE statut (
    sid         CHAR(240) NOT NULL,
    appellation VARCHAR2(240) NOT NULL,
    description VARCHAR2(240)
);

COMMENT ON COLUMN statut.appellation IS
    'RENDU
EMPRUNT EN COURS
DELAI DEPASSE
';

ALTER TABLE statut ADD CONSTRAINT statut_pk PRIMARY KEY ( sid );


INSERT INTO statut (sid, appellation, description)
VALUES 
    ('1', 'Rendu', 'Le ou les livres ont été rendus'),
    ('2', 'Emprunt en cours', 'Le ou les livres sont encore empruntés dans un délai normal'),
    ('3', 'Délai dépassé', 'Le ou les livres n ont pas encore été déposés et le délai d emprunt est dépassé'),
    ('4', 'Rendu en retard', 'Le ou les livres ont été rendus en retard'),
    ('5', 'Prolongé', 'L emprunt est prolongé de 30 jours' );



CREATE TABLE utilisateur (
    "UID"        CHAR(240) NOT NULL,
    adresse      VARCHAR2(240),
    codepostal   VARCHAR2(240),
    ville        VARCHAR2(240),
    email        VARCHAR2(240) NOT NULL,
    anniversaire DATE,
    telephone    VARCHAR2(240) NOT NULL,
    prenom       VARCHAR2(240) NOT NULL,
    nom          VARCHAR2(240) NOT NULL
);

ALTER TABLE utilisateur ADD CONSTRAINT utilisateur_pk PRIMARY KEY ( "UID" );

ALTER TABLE emprunt_livre
    ADD CONSTRAINT emprunt_livre_emprunt_fk FOREIGN KEY ( emprunt_eid )
        REFERENCES emprunt ( eid );

ALTER TABLE emprunt_livre
    ADD CONSTRAINT emprunt_livre_livre_fk FOREIGN KEY ( livre_lid )
        REFERENCES livre ( lid );

ALTER TABLE emprunt
    ADD CONSTRAINT emprunt_statut_fk FOREIGN KEY ( statut_sid )
        REFERENCES statut ( sid );

ALTER TABLE emprunt
    ADD CONSTRAINT emprunt_utilisateur_fk FOREIGN KEY ( utilisateur_uid )
        REFERENCES utilisateur ( "UID" );

ALTER TABLE livre_auteur
    ADD CONSTRAINT livre_auteur_auteur_fk FOREIGN KEY ( auteur_aid )
        REFERENCES auteur ( aid );

ALTER TABLE livre_auteur
    ADD CONSTRAINT livre_auteur_livre_fk FOREIGN KEY ( livre_lid )
        REFERENCES livre ( lid );

CREATE SEQUENCE auteurs_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999999999
    CACHE 50;

CREATE SEQUENCE utilisateurs_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999999999
    CACHE 50;

CREATE SEQUENCE emprunts_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999999999
    CACHE 50;

CREATE SEQUENCE utilisateur_id_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

CREATE SEQUENCE livres_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999999999
    CACHE 50;

CREATE SEQUENCE livre_id_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

    CREATE SEQUENCE emprunt_id_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

CREATE SEQUENCE auteur_id_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

create or replace TRIGGER emprunt_insert_trigger
BEFORE INSERT OR DELETE ON emprunt
FOR EACH ROW
BEGIN
    SELECT emprunt_id_seq.NEXTVAL INTO :new.eid FROM dual;
END;

-- Oracle SQL Developer Data Modeler Summary Report: 
-- 
-- CREATE TABLE                             7
-- CREATE INDEX                             0
-- ALTER TABLE                             11
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0

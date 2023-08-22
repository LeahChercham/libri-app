CREATE USER c##libriadmin identified BY "libri123admin" DEFAULT tablespace users quota UNLIMITED ON users;
GRANT RESOURCE, CONNECT, CREATE TABLE, CREATE SESSION TO c##libriadmin; 


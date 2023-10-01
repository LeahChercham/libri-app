PROCEDURE get_emprunt_details(p_emprunt_list OUT emprunt_list) IS
BEGIN
   FOR emprunt_rec IN (
      SELECT e.eid,
             e.dateemprunt,
             e.dateretourprevu,
             e.dateretourreel,
             u.utid,
             u.prenom,
             u.nom,
             s.sid,
             s.appellation
        FROM emprunt E
             JOIN utilisateur U ON E.utilisateur_utid = U.utid
             JOIN statut S ON E.statut_sid = S.sid
    ) LOOP
      emprunt_rec.books := get_books_for_emprunt(emprunt_rec.eid); -- Call the separate procedure

      p_emprunt_list.EXTEND;
      p_emprunt_list(p_emprunt_list.LAST) := emprunt_rec;
   END LOOP;
   
END get_emprunt_details;
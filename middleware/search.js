import { connection } from "../database/connection.js";

export const searchDocAndVideo = (req, res) => {
    const searchText = req.query.query;
    const sql = "SELECT file_name AS name,id_file AS id,id_type AS type FROM file WHERE file.file_name LIKE ? UNION SELECT video.video_name,video.id_video,video.id_type FROM video WHERE video.video_name LIKE ?";
    const query = `%${searchText}%`
  
    connection.query(sql, [query,query], (err, results) => {
      if (err) {
        console.error('Erreur lors de la requête SQL :', err);
        res.status(500).json({ error: 'Erreur lors de la recherche.' });
        return;
      }
      res.json(results);
    });
  }
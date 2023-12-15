import{ connection } from './../database/connection.js';

export const storeVideosToDatabase = (videosData) =>{

        // console.log (videosData);
        //suppression de la derniere 
        let dernierVideo = videosData.pop();
        console.log(dernierVideo,"sup")
        videosData.forEach(videoData =>{
            const {videoId, title,thumbnail} = videoData;

            const selectQuery = "SELECT * FROM video WHERE id_video = ?";

            connection.query(selectQuery,[videoId],(error, results,fields) =>{
                if (error) throw error;

                if (results.length === 0) {
                    const insertQuery = "INSERT INTO video(id_video,video_name,thumbnail,id_type) VALUES (?,?,?,?)";
                    const values = [videoId,title,thumbnail,2];
                    connection.query(insertQuery,values,(error , result) => {
                        if(error) throw error;
                        console.log("video inserted");
                    });
                }else{
                    console.log("video already exist");
                }
            });

        });
}
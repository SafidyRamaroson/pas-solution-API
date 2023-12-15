import { connection } from '../database/connection.js';
import { storeVideosToDatabase } from '../middleware/storeVideoToDatabase.js';

export const getVideoFromYoutubeAndStoreToDB = async(req,res,next) =>{
    const apiKey = process.env.API_KEY;
    const channelId = process.env.CHANNEL_ID;
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=12`
              );
              const data = await response.json();
      
              if (response.ok) {
                const videosData = data.items.map(item => ({
                  title: item.snippet.title,
                  thumbnail: item.snippet.thumbnails.medium.url,
                  videoId: item.id.videoId,
                }));
                storeVideosToDatabase(videosData);
              }
              next();
        } catch (error) {
            console.error(error);
        }
       
}

export const retrieveVideoFromDatabase = (req,res) =>{
    const selectAllQuery = "SELECT id_video,video_name,thumbnail FROM video";
  
    connection.query(selectAllQuery,(error,results,fields) =>{
       if (error) throw error;
  
       const videoFromDB = results.map(video => (
          {
            title:video.video_name,
            videoId:video.id_video,
            thumbnail:video.thumbnail
          }
      ))
       res.json({videoFromDB})
    });
  }
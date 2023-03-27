const axios = require('axios')
require('dotenv').config()
const MAL_KEY = process.env.MAL_KEY

const GetSeasonalAnime = async (req, res) => {
  try {
    let seasonalAnime = await axios.get(
      `https://api.myanimelist.net/v2/anime/season/2023/spring?limit=8`,
      {
        headers: {
          'X-MAL-CLIENT-ID': `${MAL_KEY}`
        }
      }
    )
    return res.status(200).json(seasonalAnime.data)
  } catch (error) {
    throw error
  }
}
const GetAnimeDetails = async (req, res) => {
  const { animeId } = req.params
  try {
    let animeDetails = await axios.get(
      `https://api.myanimelist.net/v2/anime/${animeId}?fields=id,title,main_picture,alternative_titles,start_date,synopsis,media_type,status,genres,num_episodes,broadcast,source,pictures,background,studios`,
      {
        headers: {
          'X-MAL-CLIENT-ID': `${MAL_KEY}`
        }
      }
    )
    console.log(animeDetails)
    return res.status(200).json(animeDetails.data)
  } catch (error) {
    throw error
  }
}
const SearchAnime = async (req, res) => {
  const { searchQuery } = req.params
  searchQuery = encodeURIComponent(searchQuery)
  try {
    let animeDetails = await axios.get(
      `https://api.myanimelist.net/v2/anime?q=${searchQuery}&limit=4`,
      {
        headers: {
          'X-MAL-CLIENT-ID': `${MAL_KEY}`
        }
      }
    )
    console.log(animeDetails)
    return res.status(200).json(animeDetails.data)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetSeasonalAnime,
  GetAnimeDetails,
  SearchAnime
}

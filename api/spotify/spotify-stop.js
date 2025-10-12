
import { pausePlayback } from '../lib/spotify';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await pausePlayback();

    if (response.status === 204) {
      return res.status(200).json({ 
        success: true, 
        message: 'Playback stopped' 
      });
    }

    if (response.status === 404) {
      return res.status(404).json({ 
        error: 'No active device',
        message: 'No active playback found'
      });
    }

    if (response.status === 403) {
      return res.status(403).json({ 
        error: 'Premium required',
        message: 'Playback control requires Spotify Premium'
      });
    }

    const errorData = await response.json();
    return res.status(response.status).json({ 
      error: 'Spotify API error',
      details: errorData
    });

  } catch (error) {
    console.error('Spotify Stop Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}


import { startPlayback } from '../lib/spotify';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { trackUri } = req.body;

    if (!trackUri) {
      return res.status(400).json({ 
        error: 'Missing trackUri',
        message: 'Please provide a trackUri in the request body'
      });
    }

    // Validate trackUri format
    if (!trackUri.startsWith('spotify:track:')) {
      return res.status(400).json({ 
        error: 'Invalid trackUri format',
        message: 'trackUri must be in format: spotify:track:xxxxx'
      });
    }

    const response = await startPlayback(trackUri);

    if (response.status === 204) {
      return res.status(200).json({ 
        success: true, 
        message: 'Playback started',
        trackUri 
      });
    }

    if (response.status === 404) {
      return res.status(404).json({ 
        error: 'No active device',
        message: 'Please open Spotify on a device first'
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
    console.error('Spotify Play Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://localhost:8888/feed', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
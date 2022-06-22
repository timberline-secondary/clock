export default function handler(req, res) {
    res.status(200).json({id: '000', joke: 'Dad jokes unavailable.', status: 500})
}
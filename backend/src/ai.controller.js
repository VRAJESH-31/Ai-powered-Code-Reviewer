const aiService = require('./ai.service');

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;
        if (!code) {
            return res.status(400).json({ error: 'code is required' });
        }
        const aiResponse = await aiService(code);

        let summary = '';
        let suggestions = [];
        if (typeof aiResponse === 'string') {
            const summaryMatch = aiResponse.match(/Summary:(.*?)(Suggestions:|$)/is);
            if (summaryMatch) {
                summary = summaryMatch[1].trim();
            }
            const suggestionsMatch = aiResponse.match(/Suggestions:(.*)/is);
            if (suggestionsMatch) {
                suggestions = suggestionsMatch[1]
                    .split(/\n|\r/)
                    .map(s => s.trim())
                    .filter(Boolean);
            }
        }

        res.json({ summary, suggestions });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({message: "Something went wrong while returning the response"});
    }
};

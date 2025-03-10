import BlogStatus from "@/models/blogPage/BlogStatus";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { blogId, blogstatus } = req.query; // Extract blogId and blogstatus from query params

        // Check if blogId is provided
        if (!blogId) {
            return res.status(400).json({ error: 'blogId is required' });
        }

        // Check if blogstatus is provided and is either 'draft' or 'active'
        if (!blogstatus || !['draft', 'active'].includes(blogstatus)) {
            return res.status(400).json({ error: 'Invalid blogstatus. It must be either "draft" or "active".' });
        }

        try {
            // Check if BlogStatus already exists for the provided blogId
            const existingStatus = await BlogStatus.findOne({
                where: { blogId }
            });

            if (existingStatus) {
                // If BlogStatus exists, update it with the new status
                existingStatus.status = blogstatus;
                await existingStatus.save();  // Save the updated status

                return res.status(200).json(existingStatus); // Return the updated status
            } else {
                // If BlogStatus does not exist, create a new entry
                const blogStatus = await BlogStatus.create({
                    blogId,       // blogId is taken from the query
                    status: blogstatus,  // blogstatus from query (either 'draft' or 'active')
                });

                return res.status(201).json(blogStatus); // Respond with the created record
            }

        } catch (error) {
            console.error('Error processing BlogStatus:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'GET') {
        const { blogId } = req.query; // Extract blogId from query params

        // Check if blogId is provided
        if (!blogId) {
            return res.status(400).json({ error: 'blogId is required' });
        }

        try {
            // Fetch the BlogStatus for the provided blogId
            const blogStatus = await BlogStatus.findOne({
                where: { blogId }
            });

            // If BlogStatus exists, return it, otherwise return a 404
            if (blogStatus) {
                return res.status(200).json(blogStatus);
            } else {
                return res.status(404).json({ error: 'BlogStatus not found for the provided blogId' });
            }

        } catch (error) {
            console.error('Error fetching BlogStatus:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        // Handle other HTTP methods (PUT, DELETE, etc.)
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}

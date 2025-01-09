import multer from 'multer';
import nc from 'next-connect';

const storage = multer.diskStorage({
  destination: '/uploads/blogs',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const handler = nc();

handler.use(upload.single('image'));

handler.post((req, res) => {
  const { file } = req;
  const { alt } = req.body;

  if (!file) {
    return res.status(400).json({ error: 'Image upload failed' });
  }

  const imageUrl = `/uploads/blogs/${file.filename}`;
  const altText = alt || 'Image';

  return res.status(200).json({ imageUrl, altText });
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

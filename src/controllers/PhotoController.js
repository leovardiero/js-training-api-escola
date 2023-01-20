import multer from 'multer';
import multerConfig from '../config/multer';
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('file');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        console.log(student_id);
        const photo = await Photo.create({
          original_name: originalname,
          filename,
          student_id,
        });
        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: ['The student does not exists'],
        });
      }
    });
  }
}

export default new PhotoController();

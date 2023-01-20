import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  // Index - Show all "Alunos"
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'data_nascimento'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'original_name', 'filename'],
      },
    });
    res.json(students);
  }

  // Create - Create a new "Aluno"
  async create(req, res) {
    try {
      const student = await Student.create(req.body);

      return res.status(200).json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Show - Show only one aluno
  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.satus(400).json({
          errors: ['The ID is missing'],
        });
      }

      const student = await Student.findByPk(
        req.params.id,
        {
          attributes: ['id', 'name', 'last_name', 'email', 'date_of_birth'],
          order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
          include: {
            model: Photo,
            attributes: ['url', 'original_name', 'filename'],
          },
        },
      );

      if (!student) {
        return res.satus(400).json({
          errors: ['It was not possible find the student'],
        });
      }

      return res.status(200).json(student);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  // Update - Update info from one Aluno
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.satus(400).json({
          errors: ['The ID is missing'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.satus(400).json({
          errors: ['It was not possible find the student'],
        });
      }

      const newStudent = await student.update(req.body);

      return res.status(200).json(newStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.msg),
      });
    }
  }

  // Delete an "Aluno"
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.satus(400).json({
          errors: ['The ID is missing'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.satus(400).json({
          errors: ['It was not possible find the student'],
        });
      }

      await student.destroy();

      return res.status(200).json({
        msg: ['Student deleted'],
      });
    } catch (e) {
      return res.status(400).json(null);
    }
  }
}

export default new StudentController();

"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  // Index - Show all "Alunos"
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'data_nascimento'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'original_name', 'filename'],
      },
    });
    res.json(alunos);
  }

  // Create - Create a new "Aluno"
  async create(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);

      return res.status(200).json(aluno);
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
          errors: ['Missing ID'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(
        req.params.id,
        {
          attributes: ['id', 'nome', 'sobrenome', 'email', 'data_nascimento'],
          order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
          include: {
            model: _Photo2.default,
            attributes: ['url', 'original_name', 'filename'],
          },
        },
      );

      if (!aluno) {
        return res.satus(400).json({
          errors: ['Aluno not find'],
        });
      }

      return res.status(200).json(aluno);
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
          errors: ['Missing ID'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.satus(400).json({
          errors: ['Aluno not find'],
        });
      }

      const newAluno = await aluno.update(req.body);

      return res.status(200).json(newAluno);
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
          errors: ['Missing ID'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.satus(400).json({
          errors: ['Aluno not find'],
        });
      }

      await aluno.destroy();

      return res.status(200).json({
        msg: ['Aluno deleted'],
      });
    } catch (e) {
      return res.status(400).json(null);
    }
  }
}

exports. default = new AlunoController();

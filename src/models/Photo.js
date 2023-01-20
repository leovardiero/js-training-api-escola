import Sequelize, { Model } from 'sequelize';
import app from '../config/app';

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        original_name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'The original name cannot be empty',
            },
          },
        },

        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'The filename cannot be empty',
            },
          },
        },

        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${app.url}/images/${this.getDataValue('filename')}`;
          },
        },

      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}

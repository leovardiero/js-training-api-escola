import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Name must contain between 3 and 255 characters',
            },
          },
        },

        last_name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Last name must contain between 3 and 255 characters',
            },
          },
        },

        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'E-mail must be unique',
          },
          validate: {
            isEmail: {
              msg: 'E-mail must be a valid email',
            },
          },
        },

        date_of_birth: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [1, 8],
              msg: 'Invalid Date',
            },
          },
        },
      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
}

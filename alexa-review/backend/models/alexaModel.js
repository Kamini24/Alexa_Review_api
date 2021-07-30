module.exports = (sequelize, Sequelize) => {
  const alexa = sequelize.define("alexas", {
    review: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    review_source: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    product_name: {
      type: Sequelize.STRING
    },
    reviewed_date: {
      type: Sequelize.STRING
    }
  },
    {
      tableName: 'alexas',
      // schema: 'public',
      createdAt: false,
      updatedAt: false,
      underscored: true

    }
  );
  alexa.removeAttribute('id');
  return alexa;
};
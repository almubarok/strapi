"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myarticle(ctx) {
    let entities;
    const user = ctx.state.user;

    if (ctx.query._q) {
      entities = await strapi.services.article.search({
        ...ctx.query,
        user: user.id,
      });
    } else {
      entities = await strapi.services.article.find({
        ...ctx.query,
        user: user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.article })
    );
  },
};

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
  async create(ctx) {
    let entity;
    const user = ctx.state.user.id;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.article.create(
        { ...data, user },
        { files }
      );
    } else {
      entity = await strapi.services.article.create({
        ...ctx.request.body,
        user,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};

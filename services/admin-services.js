const { Restaurant, Category } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const adminServices = {
  getRestaurants: (req, cb) => {
    const DEFAULT_LIMIT = 9
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    Restaurant.findAndCountAll({
      raw: true,
      nest: true,
      offset,
      limit,
      include: [Category]
    })
      .then(restaurants => cb(null, {
        restaurants: restaurants.rows,
        pagination: getPagination(limit, page, restaurants.count)
      }))
      .catch(err => cb(err))
  }
}
module.exports = adminServices

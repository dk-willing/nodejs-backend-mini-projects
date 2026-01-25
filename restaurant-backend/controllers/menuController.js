const Menu = require('./../model/Menu');

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAllMenu = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Menu.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const menus = await features.query;

  res.status(200).json({
    status: 'success',
    results: menus.length,
    data: {
      menus,
    },
  });
});

exports.getMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  });
});

exports.createNewMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { menu },
  });
});

exports.updateMenu = catchAsync(async (req, res) => {
  const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      menu: updatedMenu,
    },
  });
});

exports.deleteMenu = catchAsync(async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);

  res.status(204).json({
    data: null,
  });
});

exports.aliasRoute = (req, res, next) => {
  const modifiedRoute = {
    ...req.query,
    sort: '-ratingsAverage,-ratingsQuantity',
    limit: 5,
  };

  Object.defineProperty(req, 'query', {
    value: modifiedRoute,
    writable: true,
  });

  next();
};

exports.getMenuStats = catchAsync(async (req, res) => {
  const stats = await Menu.aggregate([
    {
      $match: {
        ratingsAverage: { $gt: 1 },
      },
    },
    {
      $group: {
        _id: '$category',
        numInCategory: { $sum: 1 },
        meals: {
          $push: '$name',
        },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgPrice: -1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

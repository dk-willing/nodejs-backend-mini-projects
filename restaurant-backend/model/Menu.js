const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A menu should have a name"],
      trim: true,
      unique: [true, "A menu name should be unique from already saved menus"],
      maxlength: [50, "A menu cannot be more than 50 characters"],
      minlength: [12, "A menu name cannot be less than 12 characters"],
    },
    category: {
      type: String,
      required: [true, "A menu should have a category"],
    },
    preparationTime: {
      type: Number,
      required: [true, "A meal should have an estimated preparation time"],
    },
    servingSize: {
      type: String,
      required: [true, "A menu should have a stated serving size"],
    },
    spiciness: {
      type: String,
      enum: {
        values: ["mild", "medium", "hot", "extra hot"],
        message: "Spiciness can either be mild, medium, hot or extra-hot",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4,
      min: [1, "The minimum average ratings of a meal item should be 1.0"],
      max: [5, "The maximum average ratings of a meal item should be 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A menu item must have a price"],
    },
    summary: {
      type: String,
      required: [true, "A menu item should have a summary"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A menu item should have a cover image"],
    },
    images: [String],
    ingredients: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

menuSchema.virtual("preparationInHours").get(function () {
  return this.preparationTime / 60;
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;

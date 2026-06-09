const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    readingTime: {
      type: String,
      required: true,
    },
    image_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically (Date type)
  }
);

module.exports = mongoose.model('Blog', blogSchema);
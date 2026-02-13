const mongoose = require("mongoose");


const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
};


const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    releaseDate: Date,
    duration: String,
    genre: [String],
    language: [String],

    category: {
      type: String,
      enum: ["now", "upcoming"],
    },

    isReleased: {
      type: Boolean,
      default: false,
    },

    castNames: [String],
    description: String,

    poster: {
      filename: String,
      url: String,
      _id: false,
    },

    theaters: [],
  },
  { timestamps: true }
);


movieSchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
});


module.exports = mongoose.model("movies", movieSchema);

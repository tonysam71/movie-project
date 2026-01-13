const showSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre"
    },
    showTime: String,          // "10:30 AM"
    showDate: Date,            // 2026-01-10
    price: Number,
    availableSeats: Number,
}, { timestamps: true });

module.exports = mongoose.model("Show", showSchema);


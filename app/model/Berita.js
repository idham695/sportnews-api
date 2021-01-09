import { Schema, model } from "mongoose";

const BeritaSchema = new Schema({
    judul: {
        type: String,
    },
    slug: {
        type: String,
    },
    deskripsi: {
        type: String,
    },
    gambar: {
        type: String,
    }, 
    created_at: {
    type: Date,
    default: Date.now(),
    },
    updated_at: {
    type: Date,
    default: Date.now(),
    },
});


const Berita = model("berita", BeritaSchema);

export default Berita;

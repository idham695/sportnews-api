import { Schema, model } from "mongoose";

const BeritaSchema = new Schema({
    judul: {
        type: String,
    },
    deskripsi: {
        type: String,
    },
});



const Berita = model("berita", BeritaSchema);

export default Berita;

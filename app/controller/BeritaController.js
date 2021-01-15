import Berita from "../model/Berita.js";

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


exports.create = async (req, res) => {
    const newBerita = new Berita({
        judul : req.body.judul,
        slug : slugify(req.body.judul),
        deskripsi: req.body.deskripsi,
    }); 

    try {
        const searchJudul = await Berita.findOne({
            judul: req.body.judul,
        });
        if (searchJudul) throw Error("Judul berita sudah ada");
        const berita = await newBerita.save();
        if (!berita) throw Error("gagal input berita");
        res.status(200).json({
            "error": false,
            "message": "Berita anda telah dibuat",
            "berita": {
                judul : berita.judul,
                slug : berita.slug,
                deskripsi : berita.deskripsi,
                created_at : berita.created_at,
                updated_at : berita.updated_at,
            }
        })
    } catch (error) {
        res.status(400).json({
            "error": true,
            msg: error.message
        });
    }
}

exports.findAll = async (req, res) => {
    try {
        const berita = await Berita.find();
        if (!berita) throw Error("berita belum dimasukan");
        res.status(200).json({
            "error": false,
            berita
        });
    } catch (error) {
        res.status(400).json({
            "error": TRUE,
            msg: error.message
        });
    }
}

exports.findOne = async (req, res) => {
    try {
        const berita = await Berita.findOne({
            slug: req.params.slug
        });
        if (!berita) throw Error("berita tidak ada");
        res.status(200).json({
            "error": false,
            berita
        });
    } catch (error) {
        res.status(400).json({
            "error": true,
             msg: error.message
        });
    }
}

exports.update = async (req, res) => {
    const updateBerita = {
        judul: req.body.judul,
        slug: slugify(req.body.judul),
        deskripsi: req.body.deskripsi,
    };
    try {
        const searchJudul = await Berita.findOne({
            judul: req.body.judul,
        });
        if (searchJudul) throw Error("Judul berita sudah ada");
        const berita = await Berita.updateOne(
            { slug: req.params.slug },
            { $set: updateBerita }
        );
        if (!berita) throw Error("gagal update berita");
        res.status(200).json({
            "error": false,
            "message": "Berita anda telah diupdate",
            "berita": {
                judul: berita.judul,
                slug: berita.slug,
                deskripsi: berita.deskripsi,
                created_at: berita.created_at,
                updated_at: berita.updated_at,
            }
        });
    } catch (error) {
        res.status(400).json({ "error": true,
            msg: error.message });
    }

};
exports.delete = async (req, res) => {
    try {
        const berita = await Berita.findOne({ slug: req.params.slug });
        if (!berita) throw Error("Data berita tidak ada");

        const removed = await berita.remove();
        if (!removed) throw Error("Hapus data berita gagal");

        res.status(200).json({
            "error": false,
            "message": "Berita berhasil di hapus"
        });
    } catch (error) {
        res.status(400).json({
            "error": true,
            msg: error.message
        });
    }
};

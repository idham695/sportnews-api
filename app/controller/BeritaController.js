import Berita from "../model/Berita.js";

exports.create = async (req, res) => {
    const newBerita = new Berita({
        judul : req.body.judul,
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
                deskripsi : berita.deskripsi,
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
            "message": "List Berita",
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
        const berita = await Berita.findById({
            _id: req.params.id
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
        deskripsi: req.body.deskripsi,
    };
    try {
        const searchJudul = await Berita.findOne({
            judul: req.body.judul,
        });
        if (searchJudul) throw Error("Judul berita sudah ada");
        const berita = await Berita.findByIdAndUpdate({ _id: req.params.id }, updateBerita, {
            useFindAndModify: false,
        });
        if (!berita) throw Error("gagal update berita");
        res.status(200).json({
            "error": false,
            "message": "Berita anda telah diupdate",
            "berita": {
                judul: berita.judul,
                deskripsi: berita.deskripsi,
            }
        });
    } catch (error) {
        res.status(400).json({ "error": true,
            msg: error.message });
    }

};
exports.delete = async (req, res) => {
    try {
        const berita = await Berita.findById({ _id: req.params.id });
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

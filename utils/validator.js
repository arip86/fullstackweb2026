function validateStudent(data){
    if(!data.name){
        return "Nama Harus diisi";
    }
    if(!data.birth_date){
        return "Tanggal Lahir Wajib diisi"
    }
    if(!data.gender){
        return "Gender wajib diisi";
    }
    if(data.classes_id && isNaN(data.classes_id)){
        return "classes_id Harus Angka";
    }
    return null;
}
function validateId(id){
    if (!id || isNaN(id)){
        return "Id Tidak Valid";
    }
    return null;
}

function validateFile(file){
    if(!file) return null;
    const allowTypes = ["image/jpeg", "image/png"];
    //validasi type ekstension
    if(!allowTypes.includes(file.mimetype)){
        return "Format File harus jpeg atua PNG";
    }
//validasi size file
    if(file.size > 2 * 1024 * 1024){
        return "ukuran file maksimal 2MB";
    }
    return null;
}
module.exports = {validateFile, validateStudent, validateId};
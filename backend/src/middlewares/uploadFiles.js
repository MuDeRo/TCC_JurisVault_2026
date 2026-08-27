import createMulter from "../config/arquivoMulter.js";

const uploadFiles = createMulter({
    folder: 'arquivos',
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
    fileSize: 150 * 1024 * 1024  // 150 MB

}).single('arquivos')  //um arquivo por vez e na hora de enviar deve ter o nome image

export default uploadFiles;
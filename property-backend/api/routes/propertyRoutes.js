const propertyBuilder = require('../controllers/propertyController')
var multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

var upload = multer({ storage: storage })

module.exports = (app) => {
  app
    .route('/properties')
    .get(propertyBuilder.list_all_properties)
    .post(propertyBuilder.create_a_property)

  app
    .route('/properties/:propertyId')
    .get(propertyBuilder.read_a_property)
    .put(propertyBuilder.update_a_property)
    .delete(propertyBuilder.delete_a_property)

  //single image upload
  app.post('/uploadfile', upload.single('dataFile'), (req, res, next) => {
    const file = req.file
    const filePath =
      req.protocol + '://' + req.hostname + ':4000/img/' + file.filename
    if (!file) {
      return res.status(400).send({ message: 'Please upload a file.' })
    }
    return res.send({ message: 'File uploaded successfully.', filePath })
  })

  //multiple image upload
  app.post(
    '/uploadmultifile',
    upload.array('dataFiles', 5),
    (req, res, next) => {
      const files = req.files
      let filesArray = []

      for (let index = 0; index < files.length; index++) {
        const element = files[index]
        const filePath =
          req.protocol + '://' + req.hostname + ':4000/img/' + element.filename
        filesArray.push(filePath)
      }

      if (!files || (files && files.length === 0)) {
        return res.status(400).send({ message: 'Please upload a file.' })
      }
      return res.send({
        message: 'File uploaded successfully.',
        filesArray,
      })
    }
  )

  app.route('/').get((req, res) => {
    res.end('Property CRUD APP')
  })
}

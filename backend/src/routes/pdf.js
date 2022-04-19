const { getPdfFromUrl } = require('../controllers/pdf')
const express = require('express')

const routerPdf = express.Router()


routerPdf.route('/getPdf')
    .post(getPdfFromUrl)

module.exports = routerPdf
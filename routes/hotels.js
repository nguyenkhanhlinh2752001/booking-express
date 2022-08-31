import express from 'express' 

import Hotel from '../models/Hotel.js'
import {getAll, getOne, create, update , remove} from '../controllers/hotel.js'

const router = express.Router()

router.get( '/', getAll)

router.get( '/:id', getOne)

router.post( '/', create)

router.put('/:id', update)

router.delete('/:id', remove)

export default router



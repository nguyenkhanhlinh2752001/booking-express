import express from 'express'

const router = express.Router()

router.get( '/', ( req, res ) => {
    res.send('auth')
})


export default router

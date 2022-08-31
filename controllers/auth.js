import User from "../models/User.js" 
import bcrypt from 'bcrypt'
import { createError } from '../utils/error.js'

export const register = async ( req, res ) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User( {
            username: req.body.username,
            email: req.body.email,
            password: hash
        } )     
        await newUser.save()
        res.status( 201 ).json( {
            status: 'success',
            data: newUser
        })
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message })
    }
}


export const login = async ( req, res, next) => {
    try {
        const user = await User.findOne( { username: req.body.username } )
        if ( !user ) return next( createError( 404, "User not found" ) )
        
        const isCorrectPassword = await bcrypt.compare( req.body.password, user.password )
        if ( !isCorrectPassword ) return next( createError( 404, "Wrong password or username" ) )

        const { password, isAdmin, ...otherDetails } = user._doc
           
        res.status(200).json({ status: 'success', data: {...otherDetails} })
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message })
    }
}

import Hotel from '../models/Hotel.js'

export const getAll = async ( req, res ) => {
    try {
        const hotels = await Hotel.find()
        res.status( 200 ).json( {
            status: 'success',
            totalResults: hotels.length,
            data: hotels 
        })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

export const getOne = async ( req, res ) => {
    try {
        const hotel=await Hotel.findById(req.params.id)
        res.status( 200 ).json( {
            status: 'success', 
            data: hotel
        })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
} 

export const create= async ( req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status( 201 ).json( {
            status: 'success',
            data: savedHotel
        })
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message })
    }
} 

export const update =  async ( req, res ) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status( 200 ).json( {
            status: 'success',
            data: updatedHotel
        })
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message })
    }
}

export const remove = async ( req, res , next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status( 204 ).json( {
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message })
    }
}

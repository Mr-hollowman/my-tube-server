import { createError } from "../error.js"
import User from "../models/User.js"

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser)
        }
        catch (err) {
            next(err)
        }
    }
    else {
        next(createError(403, "you can update only your account"))
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user deleted successfully")
        }
        catch (err) {
            next(err)
        }
    }
    else {
        next(createError(403, "you can update only your account"))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const subscribe = (req, res, next) => {
}

export const unSubscribe = (req, res, next) => {
}

export const like = (req, res, next) => {
}

export const dislike = (req, res, next) => {
}
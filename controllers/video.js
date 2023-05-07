import { createError } from "../error"
import Video from "../models/Video"

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body })
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found!"))
        if (req.user.id === video.id) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
        }
        else {
            return next(createError(403, "you can update only your video!"))
        }
        res.status(200).json(updateVideo)
    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async (req, res, next) => {

}

export const getVideo = async (req, res, next) => {

}
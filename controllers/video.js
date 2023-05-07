import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

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
    try {
        const video = Video.findById(req.params.id)
        if (!video) return next(createError(404, "video not found!"))
        if (req.user.id === video.id) {
            await Video.findByIdAndDelete(req.params.id)
        }
        else {
            return next(createError(403, "you can delete only your video!"))
        }
        res.status(200).json("video deleted successfully")
    } catch (error) {
        next(error)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

export const addView = async (req, res, next) => {
    try {
        await Video.findById(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased")
    } catch (error) {
        next(error)
    }
}

export const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const trendVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

export const getByTags = async (req, res, next) => {
    const tag = req.query.tags.split(',')
    console.log(tag, "tag")
    try {
        const videos = await Video.find({ tags: { $in: tag } }).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const search = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

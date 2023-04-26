import 'core-js/stable'
import 'regenerator-runtime/runtime'
import MoodModel, { validateMoodModel } from '../model/mood'

export const addMood = async (req, res) => {
  try {
    await validateMoodModel(req.body.data)

    let mood = new MoodModel({
      source: {
        userId: req?.body?.data?.source.userId,
      },
      timestamp: req?.body?.data?.timestamp,
      mood: req?.body?.data?.mood,
    })

    mood = await mood.save()

    return res.json({
      success: true,
      data: mood,
      message: 'Dziękujemy za wskazanie swojego nastroju',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error,
    })
  }
}

export const getUserMoods = async (req, res) => {
  try {
    const userMoods = await MoodModel.aggregate([
      { $match: { 'source.userId': req.params.id } },
    ]).exec()

    if (!userMoods.length) {
      return res.status(404).json({
        success: false,
        data: [],
        message: 'Użytkownik o podanym id nie ma przypisanych żadnych nastroi',
      })
    }
    return res.json({
      success: true,
      data: userMoods,
      message: 'Użytkownik znaleziony',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error,
    })
  }
}

export const isMoodExists = async (req, res) => {
  try {
    const now = new Date(req.query.date).getTime()
    const startOfDate = new Date(now - (now % 86400000)).toISOString()
    const endOfDate = new Date(
      now - (now % 86400000) + (86400000 - 1)
    ).toISOString()

    const mood = await MoodModel.find({
      $and: [
        { 'source.userId': req.params.id },
        { timestamp: { $gte: startOfDate, $lte: endOfDate } },
      ],
    })

    if (!mood.length) {
      return res.status(200).json({
        success: true,
        data: { exists: false },
        message: 'Użytkownik nie wskazał nastroju.',
      })
    }

    return res.status(200).json({
      success: true,
      data: { exists: true },
      message: 'Nastrój został wskazany.',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error,
    })
  }
}
